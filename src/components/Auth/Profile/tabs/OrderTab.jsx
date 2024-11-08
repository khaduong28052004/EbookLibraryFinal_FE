import React, { useState, useEffect } from "react";
import OrderNavigation from '../../../Order/orderNavigation';
import OrderDetail from '../../../Order/index';
import BeatLoader from "react-spinners/BeatLoader";
// npm install --save react-spinners

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
  const [orderId, setOrderId] = useState(undefined);
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(NavItems[0].tabName);
  const [taskCompleted, setTaskCompleted] = useState(false);

  const clearOrderId = () => setOrderId(undefined);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const username = 'thu'; // Tài khoản của bạn
      const password = '123'; // Mật khẩu của bạn
      const userID = 8;
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

  const confirmOrder = async (billId) => {
    try {
      setLoading(true);

      const username = 'thu'; // Tài khoản của bạn
      const password = '123'; // Mật khẩu của bạn      
      const basicAuth = 'Basic ' + btoa(username + ':' + password);

      const response = await fetch(`http://localhost:8080/api/v1/bill/update_status/confirm/${billId}`, {
        method: 'POST',
        headers: {
          'Authorization': basicAuth,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
        return;
      }
      setTaskCompleted(true);


    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const cancelOrder = async (billId) => {
    try {
      setLoading(true);

      const username = 'thu'; // Tài khoản của bạn
      const password = '123'; // Mật khẩu của bạn      
      const basicAuth = 'Basic ' + btoa(username + ':' + password);

      const response = await fetch(`http://localhost:8080/api/v1/bill/update_status/cancel/${billId}`, {
        method: 'POST',
        headers: {
          'Authorization': basicAuth,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
        return;
      }

      setTaskCompleted(true);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const reOrder = async (billId) => {
    try {

      const username = 'thu'; // Tài khoản của bạn
      const password = '123'; // Mật khẩu của bạn      
      const basicAuth = 'Basic ' + btoa(username + ':' + password);

      const response = await fetch(`http://localhost:8080/api/v1/bill/create/reorder/${billId}`, {
        method: 'POST',
        headers: {
          'Authorization': basicAuth,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
        return;
      }


    } catch (error) {
      console.log(error);
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
    fetchOrders();
    console.log(orderId);
  }, [orderId]);

  useEffect(() => {
    if (taskCompleted) {
      // Khi task hoàn thành, bạn có thể cập nhật lại dữ liệu
      fetchOrders(); // Tải lại dữ liệu đơn hàng sau khi task hoàn thành
      setTaskCompleted(false);
    }
  }, [taskCompleted]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <BeatLoader color="#56A0D3" />
      </div>
    );
  }

  if (!loading && !orders) return <div>  <div className="min-h-[510px] bg-white  my-3 mb-5 rounded-md flex items-center justify-center">
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="">
        <img className="w-[88px] h-fit items-center" src="https://cdn-icons-png.flaticon.com/128/17568/17568968.png" alt="" />
      </div>
      <div> <p className="text-sm text-gray-400">Lỗi truyền tải dữ liệu</p></div>
    </div>
  </div></div>

  if (orderId) return <OrderDetail orderId={orderId} clearOrderId={clearOrderId}></OrderDetail>
  // if (orderId) return <div>Hello orderdetail</div>

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
                <tr className="text-[15px] text-gray-900 whitespace-nowrap px-2 border-b default-border-bottom justify-center">
                  <td className="py-4 px-2 block whitespace-nowrap text-center">Đơn hàng</td>
                  <td className="py-4 px-2 whitespace-nowrap text-center">Ngày mua</td>
                  <td className="py-4 px-2 whitespace-nowrap text-center">Tổng tiền</td>
                  <td className="py-4 px-2 whitespace-nowrap text-center">Trạng thái</td>
                  <td className="py-4 px-2 whitespace-nowrap text-center">Phương thức</td>
                  <td className="py-4 px-2 whitespace-nowrap text-center">Tùy chọn</td>
                </tr>
                {orders.map((order) => (
                  <tr
                    key={order.billID}
                    className="text-sm border-b hover:bg-gray-100 hover:cursor-pointer leading-relaxed transform transition-all duration-300"
                    onClick={() => setOrderId(order.billID)}
                  >
                    <td className="text-center py-4">
                      <span className="text-qgray font-medium">#{order.billID}</span>
                    </td>
                    <td className="text-center py-4 px-2">
                      <span className="text-sm text-qgray whitespace-nowrap">
                        {order.createdDatetime}
                      </span>
                    </td>
                    <td className="text-center py-4 px-2">
                      <span className="text-qblack whitespace-nowrap px-2">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(order.billTotalPrice)}
                      </span>
                    </td>
                    <td className="text-center py-4 px-2">
                      <span className="rounded text-green-700">
                        {order.billOrderStatus}
                      </span>
                    </td>
                    <td className="text-center py-4 px-2">
                      <span className="text-sm text-qgray whitespace-nowrap">
                        {order.billPaymentMethod}
                      </span>
                    </td>
                    <td className="text-center py-4 px-2">
                      <div className="text-cyan-800 text-[10px] font-bold text-center mx-1 min-w-[120px]">
                        {order.billOrderStatus === "Hủy" || order.billOrderStatus === "Hoàn thành" ? (
                          <button className="border border-cyan-800 shadow-6 px-2 py-1 rounded min-w-[120px] hover:bg-gray-300 transition-all duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              reOrder(order.billID);
                            }}
                          >
                            Mua lại
                          </button>
                        ) : null}
                        {order.billOrderStatus === "Chờ duyệt" ? (
                          <button className="border border-cyan-800 shadow-6 px-2 py-1 rounded min-w-[120px] hover:bg-gray-300 transition-all duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              cancelOrder(order.billID);
                            }} >
                            Hủy đơn
                          </button>
                        ) : null}
                        {order.billOrderStatus === "Đã giao" ? (
                          <button className="border border-cyan-800 shadow-6 px-2 py-1 rounded min-w-[120px] hover:bg-gray-300 transition-all duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              confirmOrder(order.billID);
                            }}
                          >
                            Xác nhận
                          </button>
                        ) : null}
                        {order.billOrderStatus == null ? (
                          <button className="h-[35px] w-[100%] pointer-events-none opacity-0">
                            <span>Không thao tác</span>
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </>
        ) : (
          <div className="min-h-[510px] bg-white  my-3 mb-5 rounded-md flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="">
                <img className="w-[88px] h-fit items-center" src="https://st3.depositphotos.com/5532432/17972/v/450/depositphotos_179728282-stock-illustration-web-search-flat-vector-icon.jpg" alt="" />
              </div>
              <div> <p className="text-sm text-gray-400">Chưa có đơn hàng</p></div>
            </div>
          </div>
        )
        }
      </div>
    </>
  );
}
