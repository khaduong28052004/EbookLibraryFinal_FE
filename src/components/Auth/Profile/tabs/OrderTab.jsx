import React, { useState, useEffect } from "react";
import OrderNavigation from '../../../Order/orderNavigation';
import OrderDetail from '../../../Order/index';


export const NavItems = [
  { name: "Tất cả", tabName: "TATCA" },
  { name: "Chờ duyệt", tabName: "CHODUYET" },
  { name: "Đang xử lý ", tabName: "DANGXULY" },
  { name: "Đang vận chuyển", tabName: "DANGGIAO" },
  { name: "Đã giao", tabName: "DAGIAO" },
  { name: "Hoàn thành", tabName: "HOANTHANH" },
  { name: "Đã hủy", tabName: "DAHUY" },
];

export default function OrderTab() {
  const [orderDetailId, setOrderDetailId] = useState(undefined);
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(NavItems[0].tabName);

  const clearOrderDetailId = () => setOrderDetailId(undefined);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const username = 'thu'; // Tài khoản của bạn
      const password = '123'; // Mật khẩu của bạn
      const userID = 6;
      const orderStatusId = activeMenu;

      const basicAuth = 'Basic ' + btoa(username + ':' + password);

      const response = await fetch(`http://localhost:8080/api/v1/bill/read?userId=${userID}&orderStatusFind=${orderStatusId}`, {
        method: 'GET',
        headers: {
          'Authorization': basicAuth,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setOrders(data.data);
      typeof (data.data)
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    console.log(orders);
    fetchOrders();
  }, [activeMenu]);

  useEffect(() => {
    console.log(orderDetailId);
  }, [orderDetailId]);

  // if (loading) return <div>LOADING ...</div>

  if (!loading && !orders) return <div>Cannot find</div>

  if (orderDetailId) return <OrderDetail orderId={orderDetailId} clearOrderDetailId={clearOrderDetailId}></OrderDetail>

  return (
    <>
      <div className="w-full border-b pb-5">
        <OrderNavigation activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      </div>

      <div className="relative w-full overflow-x-auto sm:rounded-lg  mt-5">

        {orders && orders.length > 0 ? (
          <>
            <table className="w-full text-sm text-left text-white dark:text-gray-400 bg-white shadow border">
              <tbody>
                {/* table heading */}
                <tr className="text-[17px] text-gray-900 whitespace-nowrap px-2 border-b default-border-bottom ">
                  <td className="py-4 block whitespace-nowrap text-center"> Đơn hàng </td>
                  <td className="py-4 whitespace-nowrap text-center">Ngày mua</td>
                  <td className="py-4 whitespace-nowrap text-center">Tổng tiền</td>
                  <td className="py-4 whitespace-nowrap text-center">Trạng thái</td>
                  <td className="py-4 whitespace-nowrap  text-center">Phương thức thanh toán</td>
                </tr>
                {orders.map((order) =>
                  <tr className="text-[18px]  border-b  hover:bg-gray-100 hover:cursor-pointer " key={order.billID} onClick={() => setOrderDetailId(order.billID)}
                  >
                    <td className="text-center py-4">
                      <span className=" text-qgray font-medium">#{order.billID}</span>
                    </td>
                    <td className="text-center py-4 px-2">
                      <span className="text-base text-qgray  whitespace-nowrap">
                        {order.createdDatetime}
                      </span>
                    </td>
                    <td className="text-center py-4 px-2">
                      <span className=" text-qblack whitespace-nowrap px-2 ">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(order.billTotalPrice)}
                      </span>
                    </td>
                    <td className="text-center py-4 px-2">
                      <span className=" rounded text-green-700  p-2 ">
                        {order.billOrderStatus}
                      </span>
                    </td>

                    <td className="text-center py-4 px-2">
                      <span className="text-base text-qgray  whitespace-nowrap">
                        {order.billPaymentMethod}
                      </span>
                    </td>
                    <td className="text-center py-4">
                    </td>
                  </tr>
                )
                }
              </tbody>
            </table>
          </>
        ) : (
          <div className="min-h-[510px] bg-white  my-3 mb-5 rounded-md flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="">
                <img className="w-[88px] h-fit items-center" src="https://st3.depositphotos.com/5532432/17972/v/450/depositphotos_179728282-stock-illustration-web-search-flat-vector-icon.jpg" alt="" />
              </div>
              <div> <p className="text-base text-gray-400">Chưa có đơn hàng</p></div>
            </div>
          </div>
        )
        }
      </div>
    </>
  );
}
