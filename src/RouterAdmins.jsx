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
import ChinhSach from './pages/Admin/ChinhSachAdmin.jsx';


import { useEffect, useState } from "react";
export default function RouterAdmins() {
  const READ_ACCOUNT = import.meta.env.VITE_KEY_ACCOUNT;
  const READ_VOUCHER = import.meta.env.VITE_KEY_ACCOUNT;
  const nhanVien = import.meta.env.VITE_KEY_ACCOUNT;
  const READ_ACCOUNT2 = import.meta.env.VITE_KEY_ACCOUNT;
  const READ_ACCOUNT3 = import.meta.env.VITE_KEY_ACCOUNT;
  const READ_ACCOUNT4 = import.meta.env.VITE_KEY_ACCOUNT;
  const READ_ACCOUNT5 = import.meta.env.VITE_KEY_ACCOUNT;
  useEffect(() => {
    // const [permission, setPermission] = useState([]);
    // const getpermission = sessionStorage.getItem("permission");
    // console.warn(getpermission);

    // const READ_ACCOUNT = import.meta.env.VITE_KEY_ACCOUNT;

  },);
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
              element={<ProtectedRoutePermission requiredPermission="ADMIN" element={
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
            <ProtectedRoutePermission requiredPermission="ADMINV1" element={<>
              <PageTitle title="Voucher" />
              <VoucherAdmin />
            </>} />
          }
        />
        <Route
          path="/quanLy/product"
          element={
            <ProtectedRoute
              element={<ProtectedRoutePermission requiredPermission="ADMINV1" element={
                <>
                  <PageTitle title="Sản Phẩm" />
                  <SanPhamAdmin />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route
          path="/quanLy/flashSale"
          element={
            <ProtectedRoute
              element={<ProtectedRoutePermission requiredPermission="ADMINV1" element={
                <>
                  <PageTitle title="Flash Sale" />
                  <FlashSaleAdmin />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route
          path="/quanLy/khachHang"
          element={
            <ProtectedRoute
              element={<ProtectedRoutePermission requiredPermission="ADMINV1" element={
                <>
                  <PageTitle title="Khách Hàng" />
                  <KhachHangAdmin />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route
          path="/quanLy/shop"
          element={
            <ProtectedRoute
              element={<ProtectedRoutePermission requiredPermission="ADMINV1" element={
                <>
                  <PageTitle title="Shop" />
                  <ShopAdmin />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route
          path="/quanLy/report"
          element={<ProtectedRoute
            element={<ProtectedRoutePermission requiredPermission="ADMINV1" element={
              <>
                <PageTitle title="Report" />
                <ReportAdmin />
              </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route
          path="/quanLy/phanQuyen"
          element={
            <ProtectedRoute element={
              <ProtectedRoutePermission requiredPermission="ADMIN" element={
                <>
                  <PageTitle title="phan Quyen" />
                  <RoleAdmin />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route

          path="/quanLy/phanquyen/notpermission"
          element={
            <ProtectedRoute element={
              <ProtectedRoutePermission requiredPermission="ADMIN" element={
                <>
                  <PageTitle title="Thêm Chi Tiết Quyền" />
                  <NotPermissionAdmin />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route
          path="/quanLy/quyenchitiet"
          element={
            <ProtectedRoute element={
              <ProtectedRoutePermission requiredPermission="ADMIN" element={
                <>
                  <PageTitle title="Chi Tiết Quyền" />
                  <PhanQuyenAdmin />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route
          path="/quanLy/danhMuc"
          element={
            <ProtectedRoute element={
              <ProtectedRoutePermission requiredPermission="ADMINV1" element={
                <>
                  <PageTitle title="Danh Mục" />
                  <DanhMucAdmin />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route
          path="/quanLy/chietkhau"
          element={
            <ProtectedRoute element={
              <ProtectedRoutePermission requiredPermission="ADMIN" element={
                <>
                  <PageTitle title="Chiết khấu" />
                  <DiscountRateAdmin />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route
          path="/thongTinChung"
          element={
            <ProtectedRoute element={
              <ProtectedRoutePermission requiredPermission="ADMIN" element={
                <>
                  <PageTitle title="Thông Tin Chung" />
                  <ThongTinChungAdmin />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route

          path="/chinhsachsan"
          element={
            <ProtectedRoute element={
              <ProtectedRoutePermission requiredPermission="ADMIN" element={
                <>
                  <PageTitle title="Chính sách sàn" />
                  <ChinhSach />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route
          path="/thongKe/doanhThu"
          element={
            <ProtectedRoute element={
              <ProtectedRoutePermission requiredPermission="ADMIN" element={
                <>
                  <PageTitle title="Thống Kê Doanh Thu" />
                  <ThongKeDoanhThuAdmin />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route
          path="/thongKe/sanPham"
          element={
            <ProtectedRoute element={
              <ProtectedRoutePermission requiredPermission="ADMIN" element={
                <>
                  <PageTitle title="Thống Kê Sản Phẩm" />
                  <ThongKeSanPhamAdmin />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route
          path="/thongKe/donHang"
          element={
            <ProtectedRoute element={
              <ProtectedRoutePermission requiredPermission="ADMIN" element={
                <>
                  <PageTitle title="Thống Kê Đơn Hàng" />
                  <ThongKeDonHangAdmin />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route
          path="/thongKe/seller"
          element={
            <ProtectedRoute element={
              <ProtectedRoutePermission requiredPermission="ADMIN" element={
                <>
                  <PageTitle title="Thống Kê Shop" />
                  <ThongKeNguoiBanAdmin />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route
          path="/thongKe/khachHang"
          element={
            <ProtectedRoute element={
              <ProtectedRoutePermission requiredPermission="ADMIN" element={
                <>
                  <PageTitle title="Thống Kê Khách Hàng" />
                  <ThongKeKhachHangAdmin />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route
          path="/quanLy/voucherDetail"
          element={
            <ProtectedRoute element={
              <ProtectedRoutePermission requiredPermission="ADMINV1" element={
                <>
                  <PageTitle title="Chi Tiết Voucher" />
                  <VoucherDetailAdmin />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route
          path="/quanLy/flashsaledetails"
          element={
            <ProtectedRoute element={
              <ProtectedRoutePermission requiredPermission="ADMINV1" element={
                <>
                  <PageTitle title="Chi Tiết Flash Sale" />
                  <FlashSaleDetailsAdmin />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
        <Route
          path="/quanLy/history"
          element={
            <ProtectedRoute element={
              <ProtectedRoutePermission requiredPermission="ADMIN" element={
                <>
                  <PageTitle title="Lịch sử hoạt động" />
                  <HistoryAdmin />
                </>}></ProtectedRoutePermission>}></ProtectedRoute>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}