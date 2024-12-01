import React, { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from 'react-toastify';
import userOrderService from "../../service/user/order";
import OrderDetail from '../OrderDetail/index';
// npm install --save react-spinners


export default function OrderPage({ activeMenu, setActiveMenu, setIsInDetailMode }) {
    const [orderId, setOrderId] = useState(undefined);
    const [orders, setOrders] = useState([]);  // Initialize as an empty array
    const [loading, setLoading] = useState(false);
    const [taskCompleted, setTaskCompleted] = useState(false);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortField, setSortField] = useState(null);

    const getIdAccountFromSession = () => {
        const user = sessionStorage.getItem("user");

        if (user) {
            const userObject = JSON.parse(user);
            return userObject; // Trả về id_account
        }

        return null;
    };

    const fetchOrders = async () => {
        try {
            setLoading(true);

            const orderStatusId = activeMenu;

            const userID = getIdAccountFromSession().id_account;

            const response = await userOrderService.fetchOrder({ userID, orderStatusId });

            
            console.log('response.data.data', response.data.data);
            if (response.data.data) {
                const data = response.data.data;

                setOrders(Array.isArray(data) ? data : []);
            } else {
                toast.warn('Lỗi truyền tải dữ liệu');
                throw new Error('Không có dữ liệu');
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
    
    const cancelOrder = async (billId) => {
        try {
            setLoading(true);

            const response = await userOrderService.cancelOrder({ billId });

           
            if (response.data.status === "successfully") {
                setTaskCompleted(true);
                toast.success('Đơn hàng đã được hủy');
            } else {
                toast.warn('Lỗi truyền tải dữ liệu');
                throw new Error('Unexpected data format');
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const confirmOrder = async (billId) => {
        try {
            setLoading(true);

            const response = await userOrderService.confirmOrder({ billId });

            if (response.data.status === "successfully") {
                setTaskCompleted(true);
                toast.success('Đơn hàng đã được xác nhận');
            } else {
                toast.warn('Lỗi truyền tải dữ liệu');
                throw new Error('Unexpected data format');
            }


        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    const reOrder = async (billId) => {
        try {

            const response = await userOrderService.reOrder({ billId });
          
            if (response.data.status === "successfully") {
                setTaskCompleted(true);
                toast.success('Đã thêm vào giỏ hàng');
            } else {
                toast.warn('Lỗi truyền tải dữ liệu');
                throw new Error('Unexpected data format');
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const setValue = (billID) => {
        setOrderId(billID);
        setIsInDetailMode(false); 
    }

    const clearOrderId = () => {
        setOrderId(undefined);
        setIsInDetailMode(true); 
    }


    // Hàm để thay đổi thứ tự sắp xếp
    const handleSort = (field) => {
        const isAsc = sortField === field && sortOrder === "asc";
        setSortOrder(isAsc ? "desc" : "asc");
        setSortField(field);

        const sorted = [...orders].sort((a, b) => {
            if (isAsc) {
                return a[field] > b[field] ? 1 : -1;
            } else {
                return a[field] < b[field] ? 1 : -1;
            }
        });
        setOrders(sorted);
    };

    const sortedBills = [...orders];


    useEffect(() => {
        fetchOrders();
        console.log("tesst 1");
    }, []);

    useEffect(() => {
        fetchOrders();
        console.log(orderId);
    }, [orderId]);

    useEffect(() => {
        console.log("orders ",orders);
    }, [orders]);

    useEffect(() => {
        console.log(orders);
        fetchOrders();
        if (taskCompleted) {
            setTaskCompleted(false);
        }
    }, [activeMenu, taskCompleted]);


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

    return (
        <>
            <div className="relative w-full overflow-x-auto border-t mt-5 pt-5">
                {sortedBills && sortedBills.length > 0 ? (
                    <>
                        <table className="w-full text-sm text-left rounded-xl text-white dark:text-gray-400 bg-white shadow border">
                            <tbody>
                                {/* table heading */}
                                <tr className="text-[15px] text-gray-900 whitespace-nowrap px-2 border-b default-border-bottom justify-center">
                                    <td className={`py-4 px-2 whitespace-nowrap text-center hover:cursor-pointer ${sortField === "billID" ? "font-bold" : ""}`} onClick={() => handleSort("billID")}>  Đơn hàng  <span>&#160;  &#8645;</span></td>
                                    <td className={`py-4 px-2 whitespace-nowrap text-center hover:cursor-pointer ${sortField === "createdDatetime" ? "font-bold" : ""}`} onClick={() => handleSort("createdDatetime")}>Ngày mua  <span>&#160;  &#8645;</span></td>
                                    <td className={`py-4 px-2 whitespace-nowrap text-center hover:cursor-pointer ${sortField === "billTotalPrice" ? "font-bold" : ""}`} onClick={() => handleSort("billTotalPrice")}>Tổng tiền  <span>&#160;  &#8645;</span></td>
                                    <td className={`py-4 px-2 whitespace-nowrap text-center hover:cursor-pointer ${sortField === "billOrderStatusId" ? "font-bold" : ""}`} onClick={() => handleSort("billOrderStatusId")}>Trạng thái  <span>&#160;  &#8645;</span></td>
                                    <td className="py-4 px-2 whitespace-nowrap text-center" >Phương thức</td>
                                    <td className="py-4 px-2 whitespace-nowrap text-center" >Tùy chọn</td>
                                </tr>
                                {sortedBills.map((order) => (
                                    <tr
                                        key={order.billID}
                                        className="text-sm border-b hover:bg-gray-100 hover:cursor-pointer leading-relaxed transform transition-all duration-300"
                                        onClick={() => setValue(order.billID)}
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
                                            <div className="text-[#003EA1] text-[10px] font-bold text-center mx-1 min-w-[120px]">
                                                {order.billOrderStatus === "Hủy" || order.billOrderStatus === "Hoàn thành" ? (
                                                    <button className="border border-[#003EA1] shadow-6 px-2 py-1 rounded min-w-[120px] hover:bg-gray-300 transition-all duration-300"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            reOrder(order.billID);
                                                        }}
                                                    >
                                                        Mua lại
                                                    </button>
                                                ) : null}
                                                {order.billOrderStatus === "Chờ duyệt" ? (
                                                    <button className="border border-[#003EA1] shadow-6 px-2 py-1 rounded min-w-[120px] hover:bg-gray-300 transition-all duration-300"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            cancelOrder(order.billID);
                                                        }} >
                                                        Hủy đơn
                                                    </button>
                                                ) : null}
                                                {order.billOrderStatus === "Đã giao" ? (
                                                    <button className="border border-[#003EA1] shadow-6 px-2 py-1 rounded min-w-[120px] hover:bg-gray-300 transition-all duration-300"
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
