import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import datas from "../../../data/products.json";
import AuthService from "../../../service/authService";
import BreadcrumbCom from "../../BreadcrumbCom";
import Layout from "../../Partials/Layout";
import IcoAdress from "./icons/IcoAdress";
import IcoCart from "./icons/IcoCart";
import IcoDashboard from "./icons/IcoDashboard";
import IcoLogout from "./icons/IcoLogout";
import IcoPassword from "./icons/IcoPassword";
import IcoPeople from "./icons/IcoPeople";
import AddressesTab from "./tabs/AddressesTab";
import Dashboard from "./tabs/Dashboard";
import OrderTab from "./tabs/OrderTab";
import PasswordTab from "./tabs/PasswordTab";
import Payment from "./tabs/Payment";
import ProfileTab from "./tabs/ProfileTab";
import ReviewTab from "./tabs/ReviewTab";
import SupportTab from "./tabs/SupportTab";
import WishlistTab from "./tabs/WishlistTab";
import { toast } from "react-toastify";

export default function Profile() {
  const [switchDashboard, setSwitchDashboard] = useState(false);
  const location = useLocation();
  const getHashContent = location.hash.split("#");
  const [active, setActive] = useState("dashboard");
  const [isToken, setIsToken] = useState(false);


  const navigate = useNavigate();
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
      console.log("token het han")
      return false;
    } else {
      console.log("Token còn hạn.");
      // try {
      //   const response = await AuthService.tokenrenewal(token);
      //   AuthService.setItem(response.data);
      // } catch (error) {
      //   console.log("gia hạn lỗi");
      //   console.error(error);
      // }
      return true;

    }
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token == null) {
      toast.warn("Vui lòng đăng nhập!");
      setTimeout(() => {
        navigate('/login')
      }, 400);
    } else {
      retoken(token);
    }
    setActive(
      getHashContent && getHashContent.length > 1
        ? getHashContent[1]
        : "dashboard"
    );
  }, [getHashContent]);

  const handlogoout = () => {
    AuthService.logout();
  }
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="profile-page-wrapper w-full">
        <div className="container-x mx-auto">
          <div className="w-full my-10">
            <BreadcrumbCom
              paths={[
                { name: "Trang chủ", path: "/" },
                { name: "hồ sơ", path: "/profile" },
              ]}
            />
            <div className="w-full bg-white px-10 py-9">
              <div className="title-area w-full flex justify-between items-center">
                <h1 className="text-[22px] font-bold text-qblack">
                  Tài khoản
                </h1>
                {/* <div className="switch-dashboard flex space-x-3 items-center">
                  <p className="text-qgray text-base">giao diện</p>
                  <button
                    onClick={() => setSwitchDashboard(!switchDashboard)}
                    type="button"
                    className="w-[73px] h-[31px] border border-[#D9D9D9] rounded-full relative "
                  >
                    <div
                      className={`w-[23px] h-[23px] bg-qblack rounded-full absolute top-[3px] transition-all duration-300 ease-in-out ${switchDashboard ? "left-[44px]" : "left-[4px]"
                        }`}
                    ></div>
                  </button>
                </div> */}
              </div>
              <div className="profile-wrapper w-full mt-8 flex space-x-10">
                <div className="w-[236px] min-h-[600px] border-r border-[rgba(0, 0, 0, 0.1)]">
                  <div className="flex flex-col space-y-10">
                    <div className="item group">
                      <Link to="/profile#dashboard">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoDashboard />
                          </span>
                          <span className=" font-normal text-base">
                            Trang chủ
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link to="/profile#profile">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoPeople />
                          </span>
                          <span className=" font-normal text-base">
                            Thông tin
                          </span>
                        </div>
                      </Link>
                    </div>

                    {/* <div className="item group">
                      <Link to="/profile#payment">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoPayment />
                          </span>
                          <span className=" font-normal text-base">
                            Phương thức thanh toán
                          </span>
                        </div>
                      </Link>
                    </div> */}
                    <div className="item group">
                      <Link to="/profile#order">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoCart />
                          </span>
                          <span className=" font-normal text-base">Đơn hàng</span>
                        </div>
                      </Link>
                    </div>
                    {/* <div className="item group">
                      <Link to="/profile#wishlist">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoLove />
                          </span>
                          <span className=" font-normal text-base">
                            Yêu thích
                          </span>
                        </div>
                      </Link>
                    </div> */}
                    <div className="item group">
                      <Link to="/profile#address">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoAdress />
                          </span>
                          <span className=" font-normal text-base">
                            Địa chỉ
                          </span>
                        </div>
                      </Link>
                    </div>
                    {/* <div className="item group">
                      <Link to="/profile#review">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoReviewHand />
                          </span>
                          <span className=" font-normal text-base">
                            Reviews
                          </span>
                        </div>
                      </Link>
                    </div> */}
                    <div className="item group">
                      <Link to="/profile#password">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoPassword />
                          </span>
                          <span className=" font-normal text-base">
                            Đổi mật khẩu
                          </span>
                        </div>
                      </Link>
                    </div>
                    {/* <div className="item group">
                      <Link to="/profile#support">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack">
                          <span>
                            <IcoSupport />
                          </span>
                          <span className=" font-normal text-base">
                            Hỗ trợ Ticket
                          </span>
                        </div>
                      </Link>
                    </div> */}
                    {
                      isToken ? (<div className="item group">
                        <Link to="/login">
                          <div className="flex space-x-3 items-center text-qgray hover:text-qblack" onClick={handlogoout}>
                            <span>
                              <IcoLogout />
                            </span>
                            <span className=" font-normal text-base">
                              Đăng xuất
                            </span>
                          </div>
                        </Link>
                      </div>) : (<div className="item group">
                        <Link to="/login">
                          <div className="flex space-x-3 items-center text-qgray hover:text-qblack" onClick={handlogoout}>
                            <span>
                              <IcoLogout />
                            </span>
                            <span className=" font-normal text-base">
                              Đăng nhập
                            </span>
                          </div>
                        </Link>
                      </div>)
                    }

                  </div>
                </div>
                <div className="flex-1">
                  <div className="item-body dashboard-wrapper w-full">
                    {active === "dashboard" ? (
                      <Dashboard />
                    ) : active === "profile" ? (
                      <>
                        <ProfileTab />
                      </>
                    ) : active === "payment" ? (
                      <>
                        <Payment />
                      </>
                    ) : active === "order" ? (
                      <>
                        <OrderTab />
                      </>
                    ) : active === "wishlist" ? (
                      <>
                        <WishlistTab />
                      </>
                    ) : active === "address" ? (
                      <>
                        <AddressesTab />
                      </>
                    ) : active === "password" ? (
                      <>
                        <PasswordTab />
                      </>
                    ) : active === "support" ? (
                      <>
                        <SupportTab />
                      </>
                    ) : active === "review" ? (
                      <>
                        <ReviewTab products={datas.products} />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div >
        </div >
      </div >
    </Layout >
  );
}
