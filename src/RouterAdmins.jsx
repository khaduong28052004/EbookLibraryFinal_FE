import { Route, Routes } from "react-router-dom";
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import TrangChuAdmin from "./pages/Admin/TrangChuAdmin.jsx"
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
import ThongKeDoanhThuAdmin from "./pages/Admin/ThongKeDoanhThuAdmin"
import ThongKeKhachHangAdmin from "./pages/Admin/ThongKeKhachHangAdmin"
import ThongKeSanPhamAdmin from "./pages/Admin/ThongKeSanPhamAdmin"
import ThongKeDonHangAdmin from "./pages/Admin/ThongKeDonHangAdmin"
import ThongKeNguoiBanAdmin from "./pages/Admin/ThongKeNguoiBanAdmin"
import VoucherDetailAdmin from './pages/Admin/VoucherDetailAdmin'
import ChatBot from "./pages/Seller/ChatBot"
import DiscountRateAdmin from './pages/Admin/DiscountRateAdmin'
import RoleAdmin from './pages/Admin/RoleAdmin'
import NotPermissionAdmin from './pages/Admin/NotPermissonAdmin.jsx'
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx"; // Adjust the path as necessary
import ProtectedRoutePermission from "./components/Auth/ProtectedRoutePERMISSION.jsx";
import FlashSaleDetailsAdmin from './pages/Admin/FlashsaleDetails.jsx';
import HistoryAdmin from './pages/Admin/HistoryAdmin.jsx';


import { useEffect, useState } from "react";
export default function RouterAdmins() {
  // useEffect(() => {
  //   const [permission, setPermission] = useState([]);
  //   const getpermission = sessionStorage.getItem("permission");
  //   console.warn(getpermission);

  // },);
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
              element={<ProtectedRoutePermission requiredPermission="READ_VOUCHER" element={
                <>
                  <PageTitle title="Nhân Viên" />
                  <NhanVienAdmin />
                </>
              }
              />
              }
            />
          }
        />

        <Route
          path="/quanLy/voucher"
          element={
            <ProtectedRoutePermission requiredPermission="READ_VOUCHER" element={<>
              <PageTitle title="Voucher" />
              <VoucherAdmin />
            </>} />
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
            <ProtectedRoutePermission requiredPermission="READ_VOUCHER" element={<>
              <PageTitle title="Voucher" />
              <RoleAdmin />
            </>} />
            // <>
            //   <PageTitle title="Phân Quyền" />
            //   <RoleAdmin />
            // </>
          }
        />
        <Route

          path="/quanLy/phanquyen/notpermission"
          element={
            <>
              <PageTitle title="Thêm Chi Tiết Quyền" />
              <NotPermissionAdmin />
            </>
          }
        />
        <Route

          path="/quanLy/quyenchitiet"
          element={
            <>
              <PageTitle title="Chi Tiết Quyền" />
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
              <PageTitle title="Thống Kê Shop" />
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
        <Route
          path="/quanLy/flashsaledetails"
          element={
            <>
              <PageTitle title="Chi Tiết Flash Sale" />
              <FlashSaleDetailsAdmin />
            </>
          }
        />
         <Route
          path="/quanLy/history"
          element={
            <>
              <PageTitle title="Lịch sử hoạt động" />
              <HistoryAdmin />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}