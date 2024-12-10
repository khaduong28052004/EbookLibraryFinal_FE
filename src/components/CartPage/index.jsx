import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../common/Loader";
import AuthService from "../../service/authService";
import BreadcrumbCom from "../BreadcrumbCom";
import EmptyCardError from "../EmptyCardError";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import { useRequest } from "../Request/RequestProvicer";
import Service_Fee, { service } from "../service/Service_Fee";
import ProductsTable from "./ProductsTable";


export default function CardPage({ cart = true }) {
  const navigate = useNavigate(); // Đưa useNavigate ra ngoài useEffect
  const [data, setData] = useState();
  const [dataSubmit, setDataSubmit] = useState([]);
  const [user, setUser] = useState();
  const [serviceFee, setServiceFee] = useState(0);
  const [totalSale, setTotalSale] = useState(0);
  const [total, setTotal] = useState(0);
  const { startRequest, endRequest, setItem } = useRequest();
  const localtion = useLocation();
  const [feeSeller, setFeeSeller] = useState({});
  const [loading, setLoading] = useState(false);


  // token
  function isTokenExpired(token) {
    const [, payloadBase64] = token.split('.');
    const payload = JSON.parse(atob(payloadBase64));

    const expirationTime = payload.exp * 1000; // Chuyển đổi giây thành milliseconds
    const currentTimestamp = Date.now();

    return expirationTime < currentTimestamp;
  }
  //giai han
  const retoken = async (token) => {
    if (isTokenExpired(token)) {
      sessionStorage.removeItem("token");
      toast.warn("Vui lòng đăng nhập");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);

      console.log("token het han")
    } else {
      console.log("Token còn hạn.");
      try {
        const response = await AuthService.tokenrenewal(token);
        AuthService.setItem(response.data);
      } catch (error) {
        console.log("gia hạn lỗi");
        console.error(error);
      }

    }
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setLoading(true);
    retoken(token);
    if (token) {
      const id_account = sessionStorage.getItem("id_account");
      axios.get('http://localhost:8080/api/v1/user/cart/' + id_account, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(response => {
        setData(response.data.result);
        setUser(response.data.result.user);
        setLoading(false);
      }).catch(error => console.error("fetch cart error " + error));
    } else {
      toast.warn("Vui lòng đăng nhập");
      navigate("/login", { replace: true });
      window.location.reload();
    }
  }, [localtion]);



  const getServiceFee = async (serviceId, idSeller, weight, quantity, addressFrom, addressTo) => {
    try {
      const { service_fee } = await Service_Fee(serviceId, weight, quantity, addressFrom, addressTo);
      setServiceFee(serviceFee + service_fee);
      setFeeSeller(seller => ({
        ...seller,
        [idSeller]: service_fee
      }))
    } catch (error) {
      console.error("Error in fetching service fee:", error);
    }
  };

  const setService = async (idSeller, weight, quantity, fromAddress, toAddress) => {
    try {
      const { service_id } = await service(fromAddress, toAddress);
      getServiceFee(service_id, idSeller, weight, quantity, fromAddress, toAddress);
    } catch (error) {
      console.error("Error in fetching serviceId:", error);
    }
  }


  const handleSaveProduct = (value) => {
    var fromAddress = {};
    var toAddress = {};
    var sale = 0;
    var total = 0;
    for (let address of user?.addresses) {
      if (address?.status) {
        toAddress = address;
      }
    }
    setServiceFee(0);
    value?.forEach(seller => {
      for (let address of seller?.addresses) {
        if (address?.status) {
          fromAddress = address;
        }
      }
      var totalSeller = 0;
      seller?.cart.map(cartItem => {
        if (cartItem?.product?.flashSaleDetail) {
          if (cartItem?.quantity <= cartItem?.product?.flashSaleDetail?.quantity) {
            total += (
              cartItem?.product?.price - ((cartItem?.product?.price * cartItem?.product?.sale) / 100) - ((cartItem?.product?.price - ((cartItem?.product?.price * cartItem?.product?.sale) / 100)) * (cartItem?.product?.flashSaleDetail?.sale / 100))
            ) * cartItem.quantity
            totalSeller += (
              cartItem?.product?.price - ((cartItem?.product?.price * cartItem?.product?.sale) / 100) - ((cartItem?.product?.price - ((cartItem?.product?.price * cartItem?.product?.sale) / 100)) * (cartItem?.product?.flashSaleDetail?.sale / 100))
            ) * cartItem.quantity
          }

        } else {
          total += (cartItem.product.price - ((cartItem.product.price * cartItem.product.sale) / 100)) * cartItem.quantity;
          totalSeller += (cartItem.product.price - ((cartItem.product.price * cartItem.product.sale) / 100)) * cartItem.quantity;
        }
        setService(seller?.id, cartItem?.product?.weight, cartItem?.quantity, fromAddress, toAddress);
      });

    });

    setTotal(total);
    setDataSubmit(value);
  }
  useEffect(() => {
    if (dataSubmit?.length > 0) {
      setDataSubmit((prevData) =>
        prevData.map((item) => ({
          ...item,
          service_fee: feeSeller[item?.id] || 0
        }))
      );
    }
  }, [feeSeller]);
  const handSubmitPay = () => {
    if (dataSubmit.length > 0) {
      const data = {
        datas: dataSubmit,
        user: user,
        total: total,
        sale: totalSale,
        // service_fee: serviceFee
      }
      setItem("data", data);
      sessionStorage.setItem("pay", JSON.stringify(data));
      navigate("/checkout");
    } else {
      toast.warn("Chưa chọn sản phẩm")
    }
  }

  const removeCart = (id_cart) => {
    startRequest();
    axios.get(`http://localhost:8080/api/v1/user/cart/remove/` + id_cart).then(response => {
      if (response.data.code == 1000) {
        toast.success("Xóa thành công");
        const id_account = sessionStorage.getItem("id_account");
        axios.get('http://localhost:8080/api/v1/user/cart/' + id_account).then(response => {
          setData(response.data.result);
          setUser(response.data.result.user);
          endRequest();
        }).catch(error => console.error("fetch cart error " + error));
      }
    }).catch(error => console.error("delete cart error " + error));

  }
  const handleQuantityCartIndex = (quantity, idCart) => {
    startRequest();
    axios.get("http://localhost:8080/api/v1/user/cart/update/" + idCart + "?quantity=" + quantity).then(response => {
      if (response.data.result) {
        const id_account = sessionStorage.getItem("id_account");
        axios.get('http://localhost:8080/api/v1/user/cart/' + id_account).then(response => {
          setData(response.data.result);
          setUser(response.data.result.user);
          endRequest();
        }).catch(error => console.error("fetch cart error " + error));
      }
    }).catch(error => console.error("update cart error " + error + "id =" + idCart + "quantity " + quantity));
  }
  return (
    <>
      {loading ? (<Loader />) : (
        <Layout childrenClasses={cart ? "pt-0 pb-0" : ""}>
          {cart === false ? (
            <div className="cart-page-wrapper w-full">
              <div className="container-x mx-auto">
                <BreadcrumbCom
                  paths={[
                    { name: "Trang chủ", path: "/" },
                    { name: "giỏ hàng", path: "/cart" },
                  ]}
                />
                <EmptyCardError />
              </div>
            </div>
          ) : (
            <div className="cart-page-wrapper w-full bg-white pb-[60px]">
              <div className="w-full">
                <PageTitle
                  title="Giỏ hàng của bạn"
                  breadcrumb={[
                    { name: "Trang chủ", path: "/" },
                    { name: "giỏ hàng", path: "/cart" },
                  ]}
                />
              </div>
              <div className="w-full mt-[23px]">
                <div className="container-x mx-auto">
                  <ProductsTable className="mb-[30px]" datas={data?.datas} handleSaveProduct={handleSaveProduct} removeCart={removeCart} handleQuantityCartIndex={handleQuantityCartIndex} />
                  <div className="w-full mt-[30px] flex sm:justify-end">
                    <div className="sm:w-[520px] w-full border border-[#EDEDED] px-[30px] py-[26px]">
                      <div className="sub-total mb-6">
                        <div className=" flex justify-between mb-6">
                          <p className="text-[15px] font-medium text-qblack">
                            Tổng thu
                          </p>
                          <p className="text-[15px] font-medium text-qred">{Intl.NumberFormat().format(total)} VND</p>
                        </div>
                        <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                      </div>
                      <div className="total mb-6">
                        <div className=" flex justify-between">
                          <p className="text-[18px] font-medium text-qblack">
                            Tổng tiền
                          </p>
                          <p className="text-[18px] font-medium text-qred">{Intl.NumberFormat().format(total - totalSale)} VND</p>
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
      )}
    </>

  );
}
