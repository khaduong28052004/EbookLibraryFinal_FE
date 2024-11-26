import { Route, Routes } from "react-router-dom";
import PageTitle from './components/PageTitle';
import SellerLayout from './layout/SellerLayout';
import TrangChuSeller from "./pages/Seller/TrangChuSeller";
import SanPhamSeller from "./pages/Seller/SanPhamSeller";
import DonHangSeller from "./pages/Seller/DonHangSeller"
import CategorySeller from "./pages/Seller/CategorySeller"
import VoucherSeller from "./pages/Seller/VocuherSeller"
import ThongKeDonHangSeller from "./pages/Seller/ThongKeDonHangSeller"
import ThongKeSanPham from "./pages/Seller/ThongKeSanPhamSeller"
import ThongKeKhachHang from "./pages/Seller/ThongKeKhachHangSeller"
import DanhGiaSeller from "./pages/Seller/DanhGiaSeller"
import VoucherDetailSeller from "./pages/Seller/VoucherDetailSeller"
import ChatBot from "./pages/Seller/ChatBot2"
import Shop from "./pages/Seller/ThongTinShopSeller"
export default function RouterSellers() {
  return (
    <SellerLayout>
      <ChatBot />
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <PageTitle title="Trang Chủ" />
              <TrangChuSeller />
            </>
          }
        />
        <Route
          path="/quanLy/product"
          element={
            <>
              <PageTitle title="Sản Phẩm" />
              <SanPhamSeller />
            </>
          }
        />
        <Route
          path="/quanLy/bill"
          element={
            <>
              <PageTitle title="Đơn Hàng" />
              <DonHangSeller />
            </>
          }
        />
        <Route
          path="/quanLy/voucher"
          element={
            <>
              <PageTitle title="Voucher" />
              <VoucherSeller />
            </>
          }
        />
        <Route
          path="/quanLy/category"
          element={
            <>
              <PageTitle title="Thể Loại" />
              <CategorySeller />
            </>
          }
        />
        <Route
          path="/quanLy/danhGia"
          element={
            <>
              <PageTitle title="Đánh Giá" />
              <DanhGiaSeller />
            </>
          }
        />
        <Route
          path="/thongKe/donHang"
          element={
            <>
              <PageTitle title="Thống Kê Đơn Hàng" />
              <ThongKeDonHangSeller />
            </>
          }
        />
        <Route
          path="/thongKe/khachHang"
          element={
            <>
              <PageTitle title="Thống Kê Khách Hàng" />
              <ThongKeKhachHang />
            </>
          }
        />
        <Route
          path="/thongKe/sanPham"
          element={
            <>
              <PageTitle title="Thống Kê Sản Phẩm" />
              <ThongKeSanPham />
            </>
          }
        />
        <Route
          path="/quanLy/voucherDetail"
          element={
            <>
              <PageTitle title="Chi Tiết Voucher" />
              <VoucherDetailSeller />
            </>
          }
        />
        <Route path="shop"
          element={
            <>
              <PageTitle title="Shop" />
              <Shop/>
            </>
          } />
      </Routes>
    </SellerLayout>
  );
}
