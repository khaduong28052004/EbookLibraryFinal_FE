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
import ThongKeDanhGiaAdmin from "./pages/Admin/ThongKeDanhGiaAdmin"
export default function RouterAdmins() {
  return (
    <DefaultLayout>
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <PageTitle title="Trang Chủ" />
              <TrangChuAdmin />
            </>
          }
        />
        <Route
          path="/nhanVien"
          element={
            <>
              <PageTitle title="Nhân Viên" />
              <NhanVienAdmin />
            </>
          }
        />
        <Route
          path="/voucher"
          element={
            <>
              <PageTitle title="Voucher" />
              <VoucherAdmin />
            </>
          }
        />
        <Route
          path="/product"
          element={
            <>
              <PageTitle title="Sản Phẩm" />
              <SanPhamAdmin />
            </>
          }
        />
        <Route
          path="/flashSale"
          element={
            <>
              <PageTitle title="Flash Sale" />
              <FlashSaleAdmin />
            </>
          }
        />
        <Route
          path="/khachHang"
          element={
            <>
              <PageTitle title="Khách Hàng" />
              <KhachHangAdmin />
            </>
          }
        />
        <Route
          path="/shop"
          element={
            <>
              <PageTitle title="Shop" />
              <ShopAdmin />
            </>
          }
        />
        <Route
          path="/report"
          element={
            <>
              <PageTitle title="Report" />
              <ReportAdmin />
            </>
          }
        />
        <Route
          path="/phanQuyen"
          element={
            <>
              <PageTitle title="Phân Quyền" />
              <PhanQuyenAdmin />
            </>
          }
        />
        <Route
          path="/danhMuc"
          element={
            <>
              <PageTitle title="Danh Mục" />
              <DanhMucAdmin />
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
          path="/thongKe/danhGia"
          element={
            <>
              <PageTitle title="Thống Kê Đánh Giá" />
              <ThongKeDanhGiaAdmin />
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
      </Routes>
    </DefaultLayout>
  );
}
