import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import About from "./components/About/index.jsx";
import AllProductPage from "./components/AllProductPage/index.jsx";
import Login from "./components/Auth/Login/index";
import Profile from "./components/Auth/Profile/index.jsx";
import Signup from "./components/Auth/Signup/index.jsx";
import BecomeSaller from "./components/BecomeSaller/index.jsx";
import Blog from "./components/Blogs/Blog.jsx/index.jsx";
import Blogs from "./components/Blogs/index.jsx";
// import CardPage from "./components/CartPage/index.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./components/Auth/Login/ForgotPassword.jsx";
import UpdatePassword from "./components/Auth/Login/UpdatePassword.jsx";
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import Signupv2 from "./components/Auth/Signup/indexV2.jsx";
import LinkFrom from "./components/Auth/Signup/LinkFrom.jsx";
import CheakoutPage from "./components/CheakoutPage/index.jsx";
import Contact from "./components/Contact/index.jsx";
import Faq from "./components/Faq/index.jsx";
import FlashSale from "./components/FlashSale/index.jsx";
import FourZeroFour from "./components/FourZeroFour/index.jsx";
import Loader from "./components/Helpers/Loaders/LoaderStyleOne.jsx";
import Home from "./components/Home/index.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy/index.jsx";
import ProductsCompaire from "./components/ProductsCompaire/index";
import { RequestProvider } from "./components/Request/RequestProvicer.jsx";
import SallerPage from "./components/SallerPage/index.jsx";
import Sallers from "./components/Sellers/index.jsx";
import TermsCondition from "./components/TermsCondition/index";
import TrackingOrder from "./components/TrackingOrder/index.jsx";
import Wishlist from "./components/Wishlist/index.jsx";

import ChatBot from "./pages/Seller/ChatBot.jsx";

import HomeShop from "./components/Shop/index.jsx";


// const Home = lazy(() => import('./components/Home/index.jsx'));
const CardPage = lazy(() => import('./components/CartPage/index.jsx'));
const SingleProductPage = lazy(() => import('./components/SingleProductPage/index.jsx'))
const CheakoutSuccess = lazy(() => import("./components/CheakoutPage/success.jsx"))
// import HuongDanBanHang from "./components/HuongDanBanHang";
import ChinhSachNguoiBan from "./components/ChinhSachNguoiBan";
import QuyCheHoatDong from "./components/QuyCheHoatDong";
import HuongDanBanHang from "./components/HuongDanBanHang";
// import ChatBot from "./pages/Seller/ChatBot2.jsx";
import RegistrationForm from './components/Auth/Signup/RegistrationForm.jsx';

// import PageTitle from './components/PageTitle'; //thêm page vô nha 

export default function Routers() {
  const location = useLocation();
  // function isTokenExpired(token) {
  //   const [, payloadBase64] = token.split('.');
  //   const payload = JSON.parse(atob(payloadBase64));
  //   const expirationTime = payload.exp * 1000; // Chuyển đổi giây thành milliseconds
  //   const currentTimestamp = Date.now();
  //   return expirationTime < currentTimestamp;
  // }



  useEffect(() => {
    const token = sessionStorage.getItem("token");

    // setTimeout(() => {
    //   const response = AuthService.tokenrenewal(token)// tạo lại token
    //   if (response) {
    //        AuthService.setItem(response);
    //   }
    // }, 20000);

    // if (token) {
    //   if (isTokenExpired(token)) {
    //     sessionStorage.removeItem("token");
    //     console.log("token het han")
    //   } else {
    //     console.log("Token còn hạn.");
    //   }
    // }

  }, []);


  return (
    <>
      <ToastContainer />
      <RequestProvider>
        <ChatBot />
        <Routes location={location} key={location.pathname} >
          <Route exact path="/" element={
            <Home />
          }
          />
          <Route exact path="/search" element={<AllProductPage />} />
          <Route exact path="/productdetail/*" element={
            <Suspense fallback={<Loader />}>
              <SingleProductPage />
            </Suspense>
          } />
          <Route exact path="/cart" element={
            <Suspense fallback={<Loader />}>
              <CardPage />
            </Suspense>
          } />
          <Route exact path="/checkout" element={<CheakoutPage />} />
          <Route exact path="/checkout/success" element={
            <Suspense fallback={<Loader />}>
              <CheakoutSuccess />
            </Suspense>
          } />
          <Route exact path="/wishlist" element={<Wishlist />} />
          <Route exact path="/flash-sale" element={<FlashSale />} />
          <Route exact path="/saller-page" element={<SallerPage />} />
          <Route exact path="/products-compaire" element={<ProductsCompaire />} />
          <Route exact path="/sallers" element={<Sallers />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/blogs/blog" element={<Blog />} />
          <Route exact path="/tracking-order" element={<TrackingOrder />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/faq" element={<Faq />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/chinh-sach" element={<ChinhSachNguoiBan />} />
          <Route exact path="/quyche-hoatdong" element={<QuyCheHoatDong />} />
          <Route exact path="/ban-hang" element={<HuongDanBanHang />} />

          <Route exact path="/signup" element={<RegistrationForm />} />
          <Route exact path="/haha" element={<Signup />} />

          <Route exact path="/profile" element={
            <ProtectedRoute element={<Profile />} />
          } />

          <Route exact path="/become-saller" element={<BecomeSaller />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route exact path="/terms-condition" element={<TermsCondition />} />
          <Route exact path="*" element={<FourZeroFour />} />
          <Route exact path="/singupLinkFrom" element={<LinkFrom />} />
          <Route exact path="/singup2/*" element={<Signupv2 />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/change-password/*" element={<UpdatePassword />} />
          <Route exact path="/home-shop/:Id" element={<HomeShop />} />
        </Routes>
      </RequestProvider>
    </>


  );
}
