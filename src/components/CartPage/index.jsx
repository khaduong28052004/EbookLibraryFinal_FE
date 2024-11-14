import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BreadcrumbCom from "../BreadcrumbCom";
import EmptyCardError from "../EmptyCardError";
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import Service_Fee from "../service/Service_Fee";
import ProductsTable from "./ProductsTable";

export default function CardPage({ cart = true }) {
  const navigate = useNavigate(); // Đưa useNavigate ra ngoài useEffect
  const [data, setData] = useState();
  const [dataSubmit, setDataSubmit] = useState();
  const [user, setUser] = useState();
  const [serviceFee, setServiceFee] = useState(0);
  const [totalSale, setTotalSale] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const id_account = sessionStorage.getItem("id_account");
      axios.get('http://localhost:8080/api/v1/user/cart/' + id_account).then(response => {
        setData(response.data.result);
        setUser(response.data.result.user);
      }).catch(error => console.error("fetch cart error " + error));
    } else {
      toast.warn("Vui lòng đăng nhập");
      navigate("/login", { replace: true });
      window.location.reload();
    }
  }, []);

  const getServiceFee = async (weight, quantity, addressFrom, addressTo) => {
    try {
      const { service_fee } = await Service_Fee(weight, quantity, addressFrom, addressTo);
      setServiceFee(service => service + service_fee);


    } catch (error) {
      console.error("Error in fetching service fee:", error);
    }
  };

  const handleSaveProduct = (value) => {

    var fromAddress = {};
    var toAddress = {};
    var sale = 0;
    var total = 0;
    for (let address of user?.addresses) {
      if (address?.status) {
        toAddress = address;
        // console.log("toaddress    " + toAddress);
      }
    }

    setDataSubmit(value);
    setServiceFee(0);
    value?.forEach(seller => {
      for (let address of seller?.addresses) {
        if (address?.status) {
          fromAddress = address;
        }
      }

      seller?.cart.map(cartItem => {
        total += (cartItem.product.price - ((cartItem.product.price * cartItem.product.sale) / 100)) * cartItem.quantity;
        sale += ((cartItem.product.price * cartItem.product.sale) / 100) * cartItem.quantity;
        getServiceFee(200, cartItem.quantity, fromAddress, fromAddress);
      });
      if (seller.vouchers.id > 0) {
        if (((seller?.vouchers?.sale * total) / 100) > seller?.vouchers?.totalPriceOrder) {
          total -= seller.vouchers.totalPriceOrder;
        } else {
          total -= ((total * seller.vouchers.sale) / 100);
        }
      }
    });
    setTotalSale(sale);
    setTotal(total);
  }
  const handSubmitPay = () => {
    if (dataSubmit) {
      const data = {
        datas: dataSubmit,
        user: user,
        total: total,
        sale: totalSale,
        service_fee: serviceFee
      }
      sessionStorage.setItem("pay", JSON.stringify(data));
      navigate("/checkout");
    } else {
      toast.warn("Chưa chọn sản phẩm")
    }
  }
  return (
    
    <Layout childrenClasses={cart ? "pt-0 pb-0" : ""}>
      {console.log("render " + serviceFee)}
      {cart === false ? (
        <div className="cart-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: "home", path: "/" },
                { name: "cart", path: "/cart" },
              ]}
            />
            <EmptyCardError />
          </div>
        </div>
      ) : (
        <div className="cart-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full">
            <PageTitle
              title="Your Cart"
              breadcrumb={[
                { name: "home", path: "/" },
                { name: "cart", path: "/cart" },
              ]}
            />
          </div>
          <div className="w-full mt-[23px]">
            <div className="container-x mx-auto">
              <ProductsTable className="mb-[30px]" datas={data?.datas} handleSaveProduct={handleSaveProduct} />
              <div className="w-full sm:flex justify-between">
                <div className="discount-code sm:w-[270px] w-full mb-5 sm:mb-0 h-[50px] flex">
                  <div className="flex-1 h-full">
                    <InputCom type="text" placeholder="Discount Code" />
                  </div>
                  <button type="button" className="w-[90px] h-[50px] black-btn">
                    <span className="text-sm font-semibold">Apply</span>
                  </button>
                </div>
                <div className="flex space-x-2.5 items-center">
                  <a href="#">
                    <div className="w-[220px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                      <span className="text-sm font-semibold">
                        Continue Shopping
                      </span>
                    </div>
                  </a>
                  <a href="#">
                    <div className="w-[140px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                      <span className="text-sm font-semibold">Update Cart</span>
                    </div>
                  </a>
                </div>
              </div>
              <div className="w-full mt-[30px] flex sm:justify-end">
                <div className="sm:w-[370px] w-full border border-[#EDEDED] px-[30px] py-[26px]">
                  <div className="sub-total mb-6">
                    <div className=" flex justify-between mb-6">
                      <p className="text-[15px] font-medium text-qblack">
                        Tổng thu
                      </p>
                      <p className="text-[15px] font-medium text-qred">{Intl.NumberFormat().format(total)}<sup>đ</sup></p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  </div>
                  <div className="shipping mb-6">
                    <span className="text-[15px] font-medium text-qblack mb-[18px] block">
                      Giảm giá
                    </span>
                    <ul className="flex flex-col space-y-1">
                      {dataSubmit?.map(seller => (<li>
                        {seller?.voucher ? (<div className="flex justify-between items-center">
                          <div className="flex space-x-2.5 items-center">
                            <div className="input-radio">
                            </div>
                            <span className="text-[13px] text-normal text-qgraytwo">
                              {seller.shopName}
                            </span>
                          </div>
                          <span className="text-[13px] text-normal text-qgraytwo">
                            -{seller.vouchers.sale}%, tối đa -{seller?.vouchers.totalPriceOrder}<sup>đ</sup>
                          </span>
                        </div>) : (<div>Không có voucher</div>)}
                      </li>))}
                      <li>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2.5 items-center">
                            <div className="input-radio">
                            </div>
                            <span className="text-[13px] text-normal text-qgraytwo">
                              Phí vận chuyển
                            </span>
                          </div>
                          <span className="text-[13px] text-normal text-qgraytwo">
                            {serviceFee}<sup>đ</sup>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  {/* <div className="shipping-calculation w-full mb-3">
                    <div className="title mb-[17px]">
                      <h1 className="text-[15px] font-medium">
                        Calculate Shipping
                      </h1>
                    </div>
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
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="w-full h-[50px]">
                      <InputCom
                        inputClasses="w-full h-full"
                        type="text"
                        placeholder="Postcode / ZIP"
                      />
                    </div>
                  </div> */}
                  {/* <button type="button" className="w-full mb-10">
                    <div className="w-full h-[50px] bg-[#F6F6F6] flex justify-center items-center">
                      <span className="text-sm font-semibold">Update Cart</span>
                    </div>
                  </button> */}

                  {/* {console.log("voucher index " + dataSubmit[0]?.vouchers?.length)} */}
                  <div className="total mb-6">
                    <div className=" flex justify-between">
                      <p className="text-[18px] font-medium text-qblack">
                        Thành tiền
                      </p>
                      <p className="text-[18px] font-medium text-qred">{Intl.NumberFormat().format(total + serviceFee)}<sup>đ</sup></p>
                    </div>
                  </div>
                  <a onClick={handSubmitPay}>
                    <div className="w-full h-[50px] black-btn flex justify-center items-center">
                      <span className="text-sm font-semibold">
                        Mua hàng
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>

  );
}
