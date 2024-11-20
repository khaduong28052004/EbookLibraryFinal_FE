import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import { useRequest } from "../Request/RequestProvicer";
export default function CheakoutPage() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState();
  const localtion = useLocation();
  const { getItem } = useRequest();
  const navigate = useNavigate();
  const [service_fee, setService_fee] = useState(0);
  const [voucherAdmins, setVoucherAdmins] = useState();


  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/user/pay/voucheradmin").then(response => {
      setVoucherAdmins(response.data.result.datas);
    }).catch(error => console.log("fetch voucher admin error " + error));
  }, [localtion])
  useEffect(() => {
    setService_fee(0);
    const session = sessionStorage.getItem("token");
    if (session) {
      var data = getItem("data");
      const updateDate = {
        ...data,
        datas: data?.datas?.map(seller => {
          var totalPrice = 0;
          var voucherAdmin = null;
          var saleAdmin = 0;
          var totalSale = 0;
          seller?.cart.forEach(cartItem => {
            if (cartItem?.product?.flashSaleDetail?.id > 0) {
              var priceSaleSeller = ((cartItem?.product?.price * cartItem?.product?.sale) / 100);
              var priceProduct = cartItem?.product?.price;
              var priceFinishSale = (priceProduct - priceSaleSeller);
              if (cartItem?.quantity <= cartItem?.product?.flashSaleDetail?.quantity) {
                totalPrice = (priceFinishSale - ((priceFinishSale * cartItem?.product?.flashSaleDetail?.sale) / 100)) * cartItem.quantity;
              } else {
                totalPrice += ((cartItem?.product?.price - ((cartItem?.product?.price * cartItem?.product?.sale) / 100) - ((cartItem?.product?.price - ((cartItem?.product?.price * cartItem?.product?.sale) / 100)) * (cartItem?.product?.flashSaleDetail?.sale / 100))) * cartItem?.product?.flashSaleDetail.quantity)
                  +
                  ((cartItem?.product?.price - ((cartItem?.product?.price * cartItem?.product?.sale) / 100) - ((cartItem?.product?.price - ((cartItem?.product?.price * cartItem?.product?.sale) / 100)) * (cartItem?.product?.flashSaleDetail?.sale / 100))) * (cartItem?.quantity - cartItem?.product?.flashSaleDetail.quantity))
              }
            }
            else {
              totalPrice += (cartItem.product.price - ((cartItem.product.price * cartItem.product.sale) / 100)) * cartItem.quantity;
            }
          });

          if (totalPrice * ((seller?.voucher?.sale) / 100) >= seller?.voucher?.totalPriceOrder) {
            totalPrice -= (seller?.voucher.totalPriceOrder);
          } else {
            totalPrice -= (totalPrice * (((seller?.voucher?.sale) / 100)));
          }
          setService_fee(service => service + seller?.service_fee);
          voucherAdmins?.forEach(voucher => {
            if (totalPrice > voucher?.minOrder) {
              if ((seller?.service_fee * voucher?.sale) > voucher?.totalPriceOrder) {
                // setService_fee(fee => fee - (voucher?.totalPriceOrder));
                saleAdmin = (voucher?.totalPriceOrder);
                totalSale += (voucher?.totalPriceOrder);
              } else {
                // setService_fee(fee => fee - (seller?.service_fee * voucher?.sale));
                saleAdmin = seller?.service_fee * voucher?.sale;
                totalSale += seller?.service_fee * voucher?.sale;
              }
              voucherAdmin = voucher;
            }
          });
          setService_fee(service => service - saleAdmin);
          return {
            ...seller,
            voucherAdmin: voucherAdmin,
            total: totalPrice + seller?.service_fee - saleAdmin,
            sale: saleAdmin
          };
        })
      }
      setData(updateDate);
      setUser(getItem("data"));
    } else {
      navigate('/login');
      window.location.reload();
    }
  }, [voucherAdmins]);
  // ========================================VNPAY==========================================================================
  const vnp_TmnCode = "Z3USXN5J";
  const vnp_HashSecret = "0KEFC6UYKU33SAJH2KOJFU63DHSSHVJR";
  const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  var vnp_ReturnUrl = "http://localhost:3000/pay";

  const createPaymentUrl = async () => {
    const params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: generateTransactionRef(),
      vnp_OrderInfo: "Payment for order 123456789",
      vnp_OrderType: "other",
      vnp_Amount: 100000 * 100,
      vnp_ReturnUrl,
      vnp_IpAddr: "127.0.0.1",
      vnp_CreateDate: new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14)
    };

    const sortedParams = sortObject(params);

    const querystring = new URLSearchParams(sortedParams).toString();
    const secureHash = CryptoJS.HmacSHA512(querystring, vnp_HashSecret).toString(CryptoJS.enc.Hex).toUpperCase();

    const paymentUrl = `${vnp_Url}?${querystring}&vnp_SecureHashType=HmacSHA512&vnp_SecureHash=${secureHash}`;

    window.location.href = paymentUrl;
  };

  const generateTransactionRef = () => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${year}${month}${day}${hour}${minute}${second}${randomStr}`;
  };

  const sortObject = (obj) => {
    const sorted = {};
    Object.keys(obj).sort().forEach(key => {
      sorted[key] = obj[key];
    });
    return sorted;
  };
  // =========================================END===========================================================================
  const pay = () => {
    sessionStorage.setItem("item", JSON.stringify(data));
    // const dataNew = JSON.stringify(data);
    const idUser = sessionStorage.getItem("id_account");
    const token = sessionStorage.getItem("token");
    // axios.post('http://localhost:8080/api/v1/user/pay/' + idUser, data, {
    //   auth: {
    //     username: "khauser",
    //     password: "123"
    //   },
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(response => {
    //     console.log('Payment success:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error.response ? error.response.data : error.message);
    //   });
    axios.post("http://localhost:8080/api/v1/user/pay/" + idUser + "?paymentMethod_id=1", data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then(response => {
      console.log('Payment success:', response.data);
    }).catch();
    navigate("/");
  }
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
        <div className="w-full mb-5">
          <PageTitle
            title="Thanh Toán"
            breadcrumb={[
              { name: "Trang chủ", path: "/" },
              { name: "Thanh toán", path: "/checkout" },
            ]}
          />
        </div>
        {/* {console.log("service fee " + service_fee)} */}
        <div className="checkout-main-content w-full">
          <div className="container-x mx-auto">
            {/* <div className="w-full sm:mb-10 mb-5">
              <div className="sm:flex sm:space-x-[18px] s">
                <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                  <a href="#">
                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                      <span className="text-[15px] font-medium">
                        Log into your Account
                      </span>
                    </div>
                  </a>
                </div>
                <div className="flex-1 h-[70px]">
                  <a href="#">
                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                      <span className="text-[15px] font-medium">
                        Enter Coupon Code
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div> */}
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-1/2 w-full">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  Thông tin mua hàng
                </h1>
                <div className="form-area">
                  <form>
                    <div className="sm:flex sm:space-x-5 items-center mb-6">
                      <div className="sm:w-1/2  mb-5 sm:mb-0">
                        <InputCom
                          label="Họ và tên*"
                          placeholder="Nguyễn Văn A"
                          inputClasses="w-full h-[50px]"
                          value={user?.user.fullname}

                        />
                      </div>
                      <div className="flex-1">
                        <InputCom
                          label="Số điện thoại*"
                          placeholder="0899*******"
                          inputClasses="w-full h-[50px]"
                          value={user?.user.phone}
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="w-full">
                        <InputCom
                          label="Địa chỉ email*"
                          placeholder="toel2024@gmail.com"
                          inputClasses="w-full h-[50px]"
                          value={user?.user.email}
                        />
                      </div>
                    </div>
                    {/* <div className="mb-6">
                      <h1 className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                        Country*
                      </h1>
                      <div className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center mb-2">
                        <span className="text-[13px] text-qgraytwo">
                          Select Country
                        </span>
                        <span>
                          <svg
                            width="11"
                            height="7"
                            viewBox="0 0 11 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z"
                              fill="#222222"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div> */}
                    <div className=" mb-6">
                      <div className="w-full">
                        <InputCom
                          label="Địa chỉ nhận hàng*"
                          placeholder="your address here"
                          inputClasses="w-full h-[50px]"

                        />
                      </div>
                    </div>
                    {/* <div className=" mb-6">
                      <div className="w-full">
                        <InputCom
                          label="Tên đường*"
                          placeholder="your address here"
                          inputClasses="w-full h-[50px]"
                        />
                      </div>
                    </div> */}

                    <div className="flex space-x-2 items-center mb-10">
                      <div>
                        <input type="checkbox" name="" id="create" />
                      </div>
                      <label
                        htmlFor="create"
                        className="text-qblack text-[15px] select-none"
                      >
                        Đặt làm mặc định?
                      </label>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  Thông tin đơn hàng
                </h1>

                <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                  <div className="sub-total mb-6">
                    <div className=" flex justify-between mb-5">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        SẢN PHẨM
                      </p>
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        TỔNG
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  </div>
                  <div className="product-list w-full mb-[30px]">
                    <ul className="flex flex-col space-y-5">
                      {console.log("datas " + data?.datas)}
                      {
                        data?.datas?.map(seller => (
                          seller.cart && Array.isArray(seller.cart) && seller.cart.length > 0 ? (
                            seller.cart.map((cartItem, index) => (
                              <li key={index}>
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h4 className="text-[15px] text-qblack mb-2.5">
                                      {cartItem.product?.name || 'Unnamed Product'}
                                      <sup className="text-[13px] text-qgray ml-2 mt-2">
                                        x{cartItem.quantity || 1}
                                      </sup>
                                    </h4>
                                    <p className="text-[13px] text-qgray">
                                      Thể loại : {cartItem.product.category.name}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-[15px] text-qblack font-medium">
                                      {Intl.NumberFormat().format((cartItem.product.price - ((cartItem.product.price * cartItem.product.sale) / 100)) * cartItem.quantity) || 'N/A'}<sup>đ</sup>
                                    </span>
                                  </div>
                                </div>
                              </li>
                            ))
                          ) : (
                            <li>Không có sản phẩm</li>  // Nếu không có sản phẩm trong giỏ hàng
                          )
                        ))
                      }

                    </ul>
                  </div>
                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>

                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-5">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        Tổng tiền
                      </p>
                      <p className="text-[15px] font-medium text-qblack uppercase">
                        {Intl.NumberFormat().format(data?.total - data?.sale)}<sup className='lowercase'>đ</sup>
                      </p>
                    </div>
                  </div>

                  <div className="w-full mt-[30px]">
                    <div className="sub-total mb-6">
                      {service_fee > 0 ? (<div className=" flex justify-between mb-1">
                        <div>
                          <span className="text-xs text-qgraytwo mb-3 block">
                            Phí vận chuyển
                          </span>

                        </div>
                        <p className="text-[15px] font-medium text-qblack">
                          {Intl.NumberFormat().format(service_fee)}<sup>đ</sup>
                        </p>
                      </div>) : (<p className="text-base font-medium text-qblack">
                        Miễn phí vận chuyển
                      </p>)}

                      <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                    </div>
                  </div>

                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-5">
                      <p className="text-2xl font-medium text-qblack">Thành tiền</p>
                      <p className="text-2xl font-medium text-qred">{Intl.NumberFormat().format(data?.total + service_fee - data?.sale)}<sup>đ</sup></p>
                    </div>
                  </div>
                  <div className="shipping mt-[30px]">
                    <ul className="flex flex-col space-y-1">
                      <li className=" mb-5">
                        <div className="flex space-x-2.5 items-center mb-4">
                          <div className="input-radio">
                            <input
                              type="radio"
                              name="price"
                              className="accent-pink-500"
                              id="transfer"
                            />
                          </div>
                          <label
                            htmlFor="transfer"
                            className="text-[18px] text-normal text-qblack"
                          >
                            Thanh toán khi nhận hàng
                          </label>
                        </div>
                        <p className="text-qgraytwo text-[15px] ml-6">
                          Thanh toán trực tiếp vào tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng của bạn làm tham chiếu thanh toán.
                        </p>
                      </li>
                      <li>
                        <div className="flex space-x-2.5 items-center mb-5">
                          <div className="input-radio">
                            <input
                              type="radio"
                              name="price"
                              className="accent-pink-500"
                              id="delivery"
                            />
                          </div>
                          <label
                            htmlFor="delivery"
                            className="text-[18px] text-normal text-qblack"
                          >
                            Thanh toán khi nhận hàng
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex space-x-2.5 items-center mb-5">
                          <div className="input-radio">
                            <input
                              type="radio"
                              name="price"
                              className="accent-pink-500"
                              id="bank"
                            />
                          </div>
                          <label
                            htmlFor="bank"
                            className="text-[18px] text-normal text-qblack"
                          >
                            Thanh toán Paypal
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <a onClick={() => pay()}>
                    <div className="w-full h-[50px] black-btn flex justify-center items-center">
                      <span className="text-sm font-semibold">
                        Thanh toán
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
