import React, { useEffect, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from 'react-toastify';
import userOrderService from "../../service/user/order";
import OrderDetail from '../OrderDetail/index';
import Pagination from '../../pages/User/components/pagination';
import { useLocation } from "react-router-dom";
const dataTEST = [
    {
        "billId": 9,
        "userId": 2,
        "totalPriceBill": 651049.2,
        "priceShippingBill": 49500,
        "totalQuantityBill": 3,
        "orderStatus": "Hoàn thành",
        "createdDatetime": "2024-12-01T02:54:26.758+00:00",
        "updatedDatetime": "2024-12-01T03:33:04.438+00:00"
    },
    {
        "billId": 8,
        "userId": 2,
        "totalPriceBill": 484550,
        "priceShippingBill": 49500,
        "totalQuantityBill": 5,
        "orderStatus": "Hoàn thành",
        "createdDatetime": "2024-11-30T13:14:33.847+00:00",
        "updatedDatetime": "2024-12-01T03:23:15.916+00:00"
    },
    {
        "billId": 7,
        "userId": 2,
        "totalPriceBill": 145900,
        "priceShippingBill": 49500,
        "totalQuantityBill": 1,
        "orderStatus": "Hoàn thành",
        "createdDatetime": "2024-11-30T13:14:33.801+00:00",
        "updatedDatetime": "2024-11-30T13:18:06.146+00:00"
    },
    {
        "billId": 6,
        "userId": 2,
        "totalPriceBill": 0,
        "priceShippingBill": 0,
        "totalQuantityBill": 5,
        "orderStatus": "Hoàn thành",
        "createdDatetime": "2024-11-30T12:07:24.021+00:00",
        "updatedDatetime": "2024-11-30T13:18:58.863+00:00"
    },
    {
        "billId": 5,
        "userId": 2,
        "totalPriceBill": 0,
        "priceShippingBill": 0,
        "totalQuantityBill": 5,
        "orderStatus": "Hoàn thành",
        "createdDatetime": "2024-11-30T12:07:23.839+00:00",
        "updatedDatetime": "2024-12-01T03:26:12.002+00:00"
    },
    {
        "billId": 4,
        "userId": 2,
        "totalPriceBill": 0,
        "priceShippingBill": 0,
        "totalQuantityBill": 5,
        "orderStatus": "Hoàn thành",
        "createdDatetime": "2024-11-30T12:07:23.817+00:00",
        "updatedDatetime": "2024-12-01T03:36:53.614+00:00"
    },
    {
        "billId": 3,
        "userId": 2,
        "totalPriceBill": 0,
        "priceShippingBill": 0,
        "totalQuantityBill": 5,
        "orderStatus": "Hoàn thành",
        "createdDatetime": "2024-11-30T12:07:23.479+00:00",
        "updatedDatetime": "2024-11-30T12:07:23.479+00:00"
    },
    {
        "billId": 2,
        "userId": 2,
        "totalPriceBill": 0,
        "priceShippingBill": 0,
        "totalQuantityBill": 5,
        "orderStatus": "Hoàn thành",
        "createdDatetime": "2024-11-30T12:07:23.372+00:00",
        "updatedDatetime": "2024-12-01T03:24:07.417+00:00"
    },
    {
        "billId": 1,
        "userId": 2,
        "totalPriceBill": 0,
        "priceShippingBill": 0,
        "totalQuantityBill": 5,
        "orderStatus": "Hoàn thành",
        "createdDatetime": "2024-11-30T12:07:21.567+00:00",
        "updatedDatetime": "2024-12-01T03:23:34.938+00:00"
    }
]
export default function OrderPage({ activeMenu, setActiveMenu, setIsInDetailMode }) {
    const [orderId, setOrderId] = useState(undefined);
    const [orders, setOrders] = useState([]);  // Initialize as an empty array
    const [loading, setLoading] = useState(false);
    const [taskCompleted, setTaskCompleted] = useState(false);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortField, setSortField] = useState(null);
    const local = useLocation();
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState(null);
    const [hasMore, setHasMore] = useState(true); // Có còn sản phẩm để tải không
    const [size, setSize] = useState(8);
    const [page, setPage] = useState(0);

    const getIdAccountFromSession = () => {
        const user = sessionStorage.getItem("user");
        if (user) {
            const userObject = JSON.parse(user);
            return userObject;
        }
    };

    const fetchOrders = async (currentSize) => {
        try {
            // setLoading(true);

            const orderStatusId = activeMenu;
            const userID = getIdAccountFromSession().id_account;
            const response = await userOrderService.fetchOrder(userID, orderStatusId, currentSize);

            if (response.data.data) {
                const data = response.data.data;
                setOrders(Array.isArray(data) ? data : []);
                setHasMore(data.length >= currentSize)
                setData(data);
                // setCurrentPage(data.currentPage)
            } else {
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

            const response = await userOrderService.cancelOrder(billId);

            if (response.data.status === "successfully") {
                setTaskCompleted(true);
                toast.success('Đơn hàng đã được hủy');
            } else {
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

            const response = await userOrderService.confirmOrder(billId);

            if (response.data.status === "successfully") {
                setTaskCompleted(true);
                toast.success('Đơn hàng đã được xác nhận');
            } else {
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

            const response = await userOrderService.reOrder(billId);

            if (response.data.status === "successfully") {
                setTaskCompleted(true);
                toast.success('Đã thêm vào giỏ hàng');
            } else {
                throw new Error('Unexpected data format');
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const setValue = (billID) => {
        console.log(billID);
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



    const handleLoadMore = () => {
        console.log("hasMore && !setLoading",hasMore && !setLoading );
        if (hasMore && setLoading)
            setSize((prevSize) => prevSize + 8);

    };

    useEffect(() => {
        fetchOrders(size);
    }, []);

    useEffect(() => {
        fetchOrders();
        console.log(orderId);
    }, [orderId]);

    useEffect(() => {
        console.log("activeMenu",activeMenu);
        fetchOrders(size);
        if (taskCompleted) {
            setTaskCompleted(false);
        }
    }, [activeMenu, taskCompleted, size]);

    useEffect(() => {
        const id = sessionStorage.getItem("billId");
        if (id) {
            setValue(id);
            console.log("ID:", id);
            sessionStorage.removeItem("billId");
        }
    }, [local]);



    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen ">
                <BeatLoader color="#56A0D3" />
            </div>
        );
    }

    if (!loading && !orders) return <div>  <div className="min-h-[470px] bg-white  my-3 mb-5 rounded-md flex items-center justify-center">
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
            <div className="relative w-full overflow-x-auto border-t mt-5 pt-5 ">
                {sortedBills && sortedBills.length > 0 ? (
                    <>
                        <table className=" w-full text-sm text-left  text-white dark:text-gray-400 bg-white shadow border">
                            <tbody>
                                {/* table heading */}
                                <tr className=" text-[15px] text-gray-900 whitespace-nowrap px-2 border-b default-border-bottom justify-center">
                                    <td className={`py-4 px-2 whitespace-nowrap text-center hover:cursor-pointer ${sortField === "billID" ? "font-bold" : ""}`} onClick={() => handleSort("billID")}>  Đơn hàng  <span>&#160;  &#8645;</span></td>
                                    <td className={`py-4 px-2 whitespace-nowrap text-center hover:cursor-pointer ${sortField === "createdDatetime" ? "font-bold" : ""}`} onClick={() => handleSort("createdDatetime")}>Ngày mua  <span>&#160;  &#8645;</span></td>
                                    <td className={`py-4 px-2 whitespace-nowrap text-center hover:cursor-pointer ${sortField === "billTotalPrice" ? "font-bold" : ""}`} onClick={() => handleSort("billTotalPrice")}>Tổng tiền  <span>&#160;  &#8645;</span></td>
                                    <td className={`py-4 px-2 whitespace-nowrap text-center hover:cursor-pointer ${sortField === "billOrderStatusId" ? "font-bold" : ""}`} onClick={() => handleSort("billOrderStatusId")}>Trạng thái  <span>&#160;  &#8645;</span></td>
                                    <td className="py-4 px-2 whitespace-nowrap text-center" >Phương thức</td>
                                    <td className="py-4 px-2 whitespace-nowrap text-center" >Tùy chọn</td>
                                </tr>
                                {sortedBills.map((order) => (
                                    <tr
                                        key={order.billId}
                                        className="text-sm border-b hover:bg-gray-100 hover:cursor-pointer leading-relaxed transform transition-all duration-300"
                                        onClick={() => setValue(order.billId)}
                                    >
                                        <td className="text-center py-4">
                                            <span className="text-qgray font-medium">#{order.billId}</span>
                                        </td>
                                        <td className="text-center py-4 px-2">
                                            <span className="text-sm text-qgray whitespace-nowrap">
                                                {new Date(order.createdDatetime).toLocaleDateString('vn-Vn')}                                            </span>
                                        </td>
                                        <td className="text-center py-4 px-2">
                                            <span className="text-qblack whitespace-nowrap px-2">
                                                {new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(order.totalPriceBill)}
                                            </span>
                                        </td>
                                        <td className="text-center py-4 px-2">
                                            <span className="rounded text-green-700">
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td className="text-center py-4 px-2">
                                            <span className="text-sm text-qgray whitespace-nowrap">
                                                {order.paymentMethod}
                                            </span>
                                        </td>
                                        <td className="text-center py-4 px-2">
                                            <div className="text-[#003EA1] text-[10px] font-bold text-center mx-1 min-w-[120px]">
                                                {order.orderStatus === "Hủy" || order.orderStatus === "Hoàn thành" ? (
                                                    <button className="border border-[#003EA1] shadow-6 px-2 py-1 rounded min-w-[120px] hover:bg-gray-300 transition-all duration-300"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            reOrder(order.billId);
                                                        }}
                                                    >
                                                        Mua lại
                                                    </button>
                                                ) : null}
                                                {order.orderStatus === "Chờ duyệt" ? (
                                                    <button className="border border-[#003EA1] shadow-6 px-2 py-1 rounded min-w-[120px] hover:bg-gray-300 transition-all duration-300"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            cancelOrder(order.billId);
                                                        }} >
                                                        Hủy đơn
                                                    </button>
                                                ) : null}
                                                {order.orderStatus === "Đã giao" ? (
                                                    <button className="border border-[#003EA1] shadow-6 px-2 py-1 rounded min-w-[120px] hover:bg-gray-300 transition-all duration-300"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            confirmOrder(order.billId);
                                                        }}
                                                    >
                                                        Xác nhận
                                                    </button>
                                                ) : null}
                                                {order.orderStatus == null ? (
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
                    <div className="min-h-[410px] bg-white  my-3 mb-5 rounded-md flex items-center justify-center">
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
            {hasMore && (
                <div className="flex justify-center mb-10  mt-10">
                    <button
                        onClick={handleLoadMore}
                        // disabled={setLoading}
                        className="load-more border rounded border-[#003EA1] text-[#003EA1] px-20 py-1 bg-white hover:bg-[#003EA1] hover:text-white">
                        Xem thêm
                    </button>
                </div>
            )}
            {/* <div className="flex justify-end w-full  border-t">
                {data?.totalItems > 0 ? (
                    <Pagination
                        pageNumber={data?.currentPage}
                        totalPages={data?.totalPages}
                        totalElements={data?.totalItems}
                        handlePrevious={handlePrevious}
                        handleNext={handleNext}
                        setPageNumber={setCurrentPage}
                        size={data?.pageSize}>
                    </Pagination>
                ) : <></>}
            </div> */}
        </>
    );
}
