import { Route, Routes } from "react-router-dom";
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import TrangChuAdmin from "./pages/Admin/TrangChuAdmin"
import ShopAdmin from "./pages/Admin/ShopAdmin"
import DanhMucAdmin from "./pages/Admin/DanhMucAdmin"
import SanPhamAdmin from "./pages/Admin/SanPhamAdmin"
import KhachHangAdmin from "./pages/Admin/KhachHangAdmin"
import FlashSaleAdmin from "./pages/Admin/FlashSaleAdmin"
import NhanVienAdmin from "./pages/Admin/NhanVienAdmin"
import VoucherAdmin from "./pages/Admin/VoucherAdmin"
import ReportAdmin from "./pages/Admin/ReportAdmin"
import PhanQuyenAdmin from "./pages/Admin/PhanQuyenAdmin"
import ThongTinChungAdmin from "./pages/Admin/ThongTinChungAdmin"
import SettingAdmin from "./pages/Admin/SettingAdmin"
import ThongKeDoanhThuAdmin from "./pages/Admin/ThongKeDoanhThuAdmin"
import ThongKeKhachHangAdmin from "./pages/Admin/ThongKeKhachHangAdmin"
import ThongKeSanPhamAdmin from "./pages/Admin/ThongKeSanPhamAdmin"
import ThongKeDonHangAdmin from "./pages/Admin/ThongKeDonHangAdmin"
import ThongKeNguoiBanAdmin from "./pages/Admin/ThongKeNguoiBanAdmin"
import VoucherDetailAdmin from './pages/Admin/VoucherDetailAdmin'
import ChatBot from "./pages/Seller/ChatBot"
import DiscountRateAdmin from './pages/Admin/DiscountRateAdmin'
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx"; // Adjust the path as necessary
export default function RouterAdmins() {
  return (
    <DefaultLayout>
      <ChatBot />
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute
              element={
                <>
                  <PageTitle title="Trang Chủ" />
                  <TrangChuAdmin />
                </>
              }
            />
          }
        />
        <Route
          path="/quanLy/nhanVien"
          element={
            <ProtectedRoute
              element={
                <>
                  <PageTitle title="Nhân Viên" />
                  <NhanVienAdmin />
                </>
              }
            />

          }
        />
        <Route
          path="/quanLy/voucher"
          element={
            <>
              <PageTitle title="Voucher" />
              <VoucherAdmin />
            </>
          }
        />
        <Route
          path="/quanLy/product"
          element={
            <>
              <PageTitle title="Sản Phẩm" />
              <SanPhamAdmin />
            </>
          }
        />
        <Route
          path="/quanLy/flashSale"
          element={
            <>
              <PageTitle title="Flash Sale" />
              <FlashSaleAdmin />
            </>
          }
        />
        <Route
          path="/quanLy/khachHang"
          element={
            <>
              <PageTitle title="Khách Hàng" />
              <KhachHangAdmin />
            </>
          }
        />
        <Route
path="/quanLy/shop"
          element={
            <>
              <PageTitle title="Shop" />
              <ShopAdmin />
            </>
          }
        />
        <Route
          path="/quanLy/report"
          element={
            <>
              <PageTitle title="Report" />
              <ReportAdmin />
            </>
          }
        />
        <Route
          path="/quanLy/phanQuyen"
          element={
            <>
              <PageTitle title="Phân Quyền" />
              <PhanQuyenAdmin />
            </>
          }
        />
        <Route
          path="/quanLy/danhMuc"
          element={
            <>
              <PageTitle title="Danh Mục" />
              <DanhMucAdmin />
            </>
          }
        />
        <Route
          path="/quanLy/chietkhau"
          element={
            <>
              <PageTitle title="Chiết khấu" />
              <DiscountRateAdmin />
            </>
          }
        />
        <Route
          path="/thongTinChung"
          element={
            <>
              <PageTitle title="Thông Tin Chung" />
              <ThongTinChungAdmin />
            </>
          }
        />
        <Route
          path="/setting"
          element={
            <>
              <PageTitle title="Cài Đặt" />
              <SettingAdmin />
            </>
          }
        />
        <Route
          path="/thongKe/doanhThu"
          element={
            <>
              <PageTitle title="Thống Kê Doanh Thu" />
              <ThongKeDoanhThuAdmin />
            </>
          }
        />
        <Route
          path="/thongKe/sanPham"
          element={
            <>
              <PageTitle title="Thống Kê Sản Phẩm" />
              <ThongKeSanPhamAdmin />
            </>
          }
        />
        <Route
          path="/thongKe/donHang"
          element={
            <>
              <PageTitle title="Thống Kê Đơn Hàng" />
              <ThongKeDonHangAdmin />
            </>
          }
        />
        <Route
          path="/thongKe/seller"
          element={
            <>
              <PageTitle title="Thống Kê Người Bán" />
              <ThongKeNguoiBanAdmin />
            </>
          }
        />
        <Route
          path="/thongKe/khachHang"
          element={
            <>
              <PageTitle title="Thống Kê Khách Hàng" />
              <ThongKeKhachHangAdmin />
            </>
          }
        />
        <Route
          path="/quanLy/voucherDetail"
          element={
            <>
              <PageTitle title="Chi Tiết Voucher" />
              <VoucherDetailAdmin />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}