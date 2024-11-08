import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import Order from '../../../Order/index';
import OrderNavigation from '../../../OrderDetail/orderNavigation';
// npm install --save react-spinners

export const NavItems = [
  { name: "Tất cả", tabName: "TATCA" },
  { name: "Chờ duyệt", tabName: "CHODUYET" },
  { name: "Đang xử lý ", tabName: "DANGXULY" },
  { name: "Đang vận chuyển", tabName: "DANGGIAO" },
  { name: "Đã giao", tabName: "DAGIAO" },
  { name: "Hoàn thành", tabName: "HOANTHANH" },
  { name: "Đã hủy", tabName: "DAHUY" }
];

export default function OrderTab() {
  const [activeMenu, setActiveMenu] = useState(NavItems[0].tabName);
  const [isInDetailMode, setIsInDetailMode] = useState(true); // Track detail mode

  useEffect(() => {
  }, []);

  return (
    <>
      <ToastContainer></ToastContainer>

      {isInDetailMode && <OrderNavigation activeMenu={activeMenu} setActiveMenu={setActiveMenu} />}

      <Order activeMenu={activeMenu} setActiveMenu={setActiveMenu} setIsInDetailMode={setIsInDetailMode}></Order>
    </>
  );
}
