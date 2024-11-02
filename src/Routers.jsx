import { Route, Routes } from "react-router-dom";
import About from "./components/About/index.jsx";
import AllProductPage from "./components/AllProductPage/index.jsx";
import Login from "./components/Auth/Login/index";
import Profile from "./components/Auth/Profile/index.jsx";
import Signup from "./components/Auth/Signup/index.jsx";
import BecomeSaller from "./components/BecomeSaller/index.jsx";
import Blog from "./components/Blogs/Blog.jsx/index.jsx";
import Blogs from "./components/Blogs/index.jsx";
import CardPage from "./components/CartPage/index.jsx";
import CheakoutPage from "./components/CheakoutPage/index.jsx";
import Contact from "./components/Contact/index.jsx";
import Faq from "./components/Faq/index.jsx";
import FlashSale from "./components/FlashSale/index.jsx";
import FourZeroFour from "./components/FourZeroFour/index.jsx";
import Home from "./components/Home/index.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy/index.jsx";
import ProductsCompaire from "./components/ProductsCompaire/index";
import SallerPage from "./components/SallerPage/index.jsx";
import Sallers from "./components/Sellers/index.jsx";
import SingleProductPage from "./components/SingleProductPage/index.jsx";
import TermsCondition from "./components/TermsCondition/index";
import TrackingOrder from "./components/TrackingOrder/index.jsx";
import Wishlist from "./components/Wishlist/index.jsx";

export default function Routers() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      {/* <Route exact path="/home-two" element={<HomeTwo />} />
      <Route exact path="/home-three" element={<HomeThree />} />
      <Route exact path="/home-four" element={<HomeFour />} />
      <Route exact path="/home-five" element={<HomeFive />} /> */}
      <Route exact path="/all-products" element={<AllProductPage />} />
      <Route exact path="/single-product" element={<SingleProductPage />} />
      <Route exact path="/cart" element={<CardPage />} />
      <Route exact path="/checkout" element={<CheakoutPage />} />
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
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/become-saller" element={<BecomeSaller />} />
      <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route exact path="/terms-condition" element={<TermsCondition />} />
      <Route exact path="*" element={<FourZeroFour />} />
    </Routes>
  );
}
