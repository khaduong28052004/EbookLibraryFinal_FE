import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
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
  const [isVnpay, setIsVnpay] = useState(false);
  const [saleServiceFee, SetSaleServiceFee] = useState(0);
  const { setItem, startRequest, endRequest } = useRequest();

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
              totalPrice += (cartItem?.product?.price - ((cartItem?.product?.price * cartItem?.product?.sale) / 100)) * cartItem.quantity;
            }
          });

          if (seller.voucher.id > 0) {
            if (totalPrice * ((seller?.voucher?.sale) / 100) >= seller?.voucher?.totalPriceOrder) {
              totalPrice -= (seller?.voucher.totalPriceOrder);
            } else {
              totalPrice -= (totalPrice * (((seller?.voucher?.sale) / 100)));
            }
          }
          setService_fee(service => service + seller?.service_fee);
          try {
            var maxSale = 0;
            voucherAdmins?.forEach(voucher => {
              if (totalPrice > voucher?.minOrder && voucher.sale > maxSale) {
                // alert("voucher " + voucher?.minOrder)
                maxSale = voucher.sale;
                voucherAdmin = voucher;
              }
            });
          } catch (error) {

          }
          if (voucherAdmin?.id > 0) {
            //  alert("voucheradmin "+voucherAdmin?.sale)
            if (((seller?.service_fee * voucherAdmin?.sale) / 100) > voucherAdmin?.totalPriceOrder && voucherAdmin?.sale != 100) {
              // setService_fee(fee => fee - (voucher?.totalPriceOrder));
              // alert("sale admin" + saleAdmin);
              saleAdmin = (voucherAdmin?.totalPriceOrder);
              totalSale += (voucherAdmin?.totalPriceOrder);
            } else {
              // setService_fee(fee => fee - (seller?.service_fee * voucher?.sale));
              saleAdmin = seller?.service_fee * voucherAdmin?.sale / 100;
              totalSale += ((seller?.service_fee * voucherAdmin?.sale) / 100);
            }
            if (saleAdmin > seller?.service_fee) {
              // setService_fee(service => service - 0);
              SetSaleServiceFee(seller?.service_fee);
            } else {
              // setService_fee(service => service - saleAdmin);
              SetSaleServiceFee(saleAdmin);
            }
          }
          return {
            ...seller,
            voucherAdmin: voucherAdmin,
            total: totalPrice + seller?.service_fee - saleAdmin,
            // total: totalPrice + seller?.service_fee - saleAdmin,
            sale: saleAdmin + data?.sale
          };
        })
      }
      setData(updateDate);
      setUser(getItem("data"));
    } else {
      navigate('/login');
      window.location.reload();
    }
  }, [voucherAdmins, localtion]);
  // ========================================VNPAY==========================================================================
  const vnp_TmnCode = "Z3USXN5J";
  const vnp_HashSecret = "0KEFC6UYKU33SAJH2KOJFU63DHSSHVJR";
  const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  var vnp_ReturnUrl = "http://localhost:5173/checkout/success";

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
      vnp_Amount: (data?.total + service_fee - data?.sale) * 100,
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
    // sessionStorage.setItem("item", JSON.stringify(data));
    // const dataNew = JSON.stringify(data);
    const idUser = sessionStorage.getItem("id_account");
    const token = sessionStorage.getItem("token");

    if (isVnpay) {
      setItem("data", data);
      createPaymentUrl();
    } else {
      startRequest();
      axios.post("http://localhost:8080/api/v1/user/pay/" + idUser + "?paymentMethod_id=1", data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(response => {
        endRequest();
        window.location.href = "/profile#order";
        sessionStorage.removeItem("appData");
        setData("");
      }).catch();
    }
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


              <div className="flex-1">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  Thông tin đơn hàng
                </h1>

                <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                  <div className="sub-total mb-6">

                    <div className=" flex justify-between mb-5">
                      <p className="text-[20px] font-normal text-qblack uppercase">
                        SẢN PHẨM
                      </p>
                      <p className="text-[20px] font-medium text-qblack uppercase">
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
                                <div className='flex space-x-1'>
                                  {cartItem?.product?.imageProducts?.map(image => (
                                    <img src={image?.name} className="w-[60px]" alt="" />
                                  ))}
                                </div>
                                <div className="flex justify-between items-center">

                                  <div>
                                    <h4 className="text-[20px] font-semibold text-qblack mb-2.5">
                                      {cartItem.product?.name || 'Unnamed Product'}
                                      <sup className="text-[15px] text-qgray ml-2 mt-2">
                                        x{cartItem.quantity || 1}
                                      </sup>
                                    </h4>
                                    <div className="text-[15px] font-medium text-qgray">
                                      <span className='text-black-2'>Thể loại</span> : {cartItem.product.category.name}
                                    </div>
                                    {seller?.saleSeller > 0 ? (
                                      <>
                                        <p className="text-[15px] text-qgray font-medium">
                                          <span className='text-black-2'>  {seller?.voucher?.name} </span> : <span className='text-red-500'>-{Intl.NumberFormat().format(seller?.saleSeller)}<sup>đ</sup></span>
                                        </p>
                                      </>) : (<></>)}
                                  </div>
                                  <div>
                                    <span className="text-[15px] font-semibold text-qblack font-medium">
                                      {cartItem?.product?.flashSaleDetail?.id > 0 ?
                                        Intl.NumberFormat().format(
                                          cartItem?.product?.price - ((cartItem?.product?.price * cartItem?.product?.sale) / 100) - ((cartItem?.product?.price - ((cartItem?.product?.price * cartItem?.product?.sale) / 100)) * (cartItem?.product?.flashSaleDetail?.sale / 100))

                                        ) || 'N/A' :
                                        Intl.NumberFormat().format((cartItem.product.price - ((cartItem.product.price * cartItem.product.sale) / 100)) * cartItem.quantity) || 'N/A'
                                      }<sup>đ</sup>
                                    </span>
                                  </div>
                                </div>
                                <hr />
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
                      <p className="text-[20px] font-medium text-qblack uppercase">
                        Tổng tiền
                      </p>
                      <p className="text-[20px] font-medium  uppercase">
                        {Intl.NumberFormat().format(data?.total - data?.sale || 0)} VND
                      </p>
                    </div>
                  </div>

                  <div className="w-full mt-[30px]">
                    <div className="sub-total mb-6">
                      <div className=" flex justify-between mb-1">
                        <div>
                          <span className="text-[15px] text-qgraytwo mb-3 block">
                            Phí vận chuyển
                          </span>
                        </div>
                        <p className="text-[15px] font-medium text-qblack">
                          {Intl.NumberFormat().format(service_fee)} VND
                        </p>
                      </div>
                      {saleServiceFee > 0 ? (<div className=" flex justify-between mb-1">
                        <div>
                          <span className="text-[15px] text-qgraytwo mb-3 block">
                            TOEL voucher
                          </span>
                        </div>
                        <p className="text-[15px] font-medium text-qblack">
                          -{Intl.NumberFormat().format(saleServiceFee)} VND
                        </p>
                      </div>) : (<></>)}
                      <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                    </div>
                  </div>

                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-5">
                      <p className="text-2xl font-medium text-qblack">Tổng thanh toán</p>
                      <p className="text-2xl font-medium text-qred">{Intl.NumberFormat().format((data?.total + service_fee - data?.sale - saleServiceFee) || 0)} VND</p>
                    </div>
                  </div>
                  <div className="shipping mt-[30px]">
                    <ul className="flex flex-col space-y-1">

                      <li>
                        <div className="flex space-x-2.5 items-center mb-5">
                          <div className="input-radio">
                            <input onChange={() => setIsVnpay(false)}
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
                      <li className=" mb-5">
                        <div className="flex space-x-2.5 items-center mb-4">
                          <div className="input-radio">
                            <input onChange={() => setIsVnpay(true)}
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
                            Thanh toán VNPAY
                          </label>
                        </div>
                        <p className="text-qgraytwo text-[15px] ml-6">
                          Thanh toán trực tiếp vào tài khoản ngân hàng của chúng tôi. Vui lòng sử dụng Mã đơn hàng của bạn làm tham chiếu thanh toán.
                        </p>
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
