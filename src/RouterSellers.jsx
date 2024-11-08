import { Route, Routes } from "react-router-dom";
import PageTitle from './components/PageTitle';
import SellerLayout from './layout/SellerLayout';
import TrangChuSeller from "./pages/Seller/TrangChuSeller";
import SanPhamSeller from "./pages/Seller/SanPhamSeller";
import DonHangSeller from "./pages/Seller/DonHangSeller"
import ThongTinShopSeller from "./pages/Seller/ThongTinShopSeller"
import VoucherSeller from "./pages/Seller/VocuherSeller"
import ThongKeDonHangSeller from "./pages/Seller/ThongKeDonHangSeller"
import ThongKeSanPham from "./pages/Seller/ThongKeSanPhamSeller"
import ThongKeKhachHang from "./pages/Seller/ThongKeKhachHangSeller"
import DanhGiaSeller from "./pages/Seller/DanhGiaSeller"
export default function RouterSellers() {
  return (
    <SellerLayout>
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
          path="/shop"
          element={
            <>
              <PageTitle title="Thông Tin Shop" />
              <ThongTinShopSeller />
            </>
          }
        />
        <Route
          path="/danhGia"
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
              <PageTitle title="Thông Tin Shop" />
              <ThongKeDonHangSeller />
            </>
          }
        />
        <Route
          path="/thongKe/khachHang"
          element={
            <>
              <PageTitle title="Thông Tin Shop" />
              <ThongKeKhachHang />
            </>
          }
        />
        <Route
          path="/thongKe/sanPham"
          element={
            <>
              <PageTitle title="Thông Tin Shop" />
              <ThongKeSanPham />
            </>
          }
        />
      </Routes>
    </SellerLayout>
  );
}
