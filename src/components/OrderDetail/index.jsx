import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import Evaluate from '../Evaluate/evaluate';
import BeatLoader from "react-spinners/BeatLoader";
import userOrderDetailService from "../../service/user/orderDetail";
import { toast, ToastContainer } from 'react-toastify';
// npm install --save react-spinners


export default function OrderDetail({ orderId, clearOrderId }) {
    const [order, setOrder] = useState();
    const [loading, setLoading] = useState(false);
    const [taskCompleted, setTaskCompleted] = useState(false);
    const [orderDetailId, setOrderDetailId] = useState();
    const [productId, setProductId] = useState();

    const getIdAccountFromSession = () => {
        const user = sessionStorage.getItem("user");

        if (user) {
            const userObject = JSON.parse(user);
            return userObject; // Trả về id_account
        }

        return null;
    };

    const fetchOrderDetail = async () => {
        try {
            setLoading(true);

            const response = await userOrderDetailService.fetchOrderDetail({ orderId });

            if (response && response.data && response.data.data) {
                const data = response.data.data;

                setOrder(Array.isArray(data) ? data : []);
            } else {
                throw new Error('Không có dữ liệu');
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

            const response = await userOrderDetailService.confirmOrderDetail({ billId });

            if (response.data.status === "successfully") {
                setTaskCompleted(true);
                toast.success('Đã xác nhận đơn hàng');
            } else {
                toast.warn('Lỗi truyền tải dữ liệu');
                throw new Error('Unexpected data format');
            }

        } catch (error) {
            console.log(error);
            toast.warn(error.message || 'Đã xảy ra lỗi khi xác nhận đơn hàng');
        } finally {
            setLoading(false);
        }
    }

    const cancelOrder = async (billId) => {
        try {
            setLoading(true);
            const response = await userOrderDetailService.cancelOrderDetail({ billId });


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

    const reOrder = async (billId) => {
        try {

            const response = await userOrderDetailService.reOrderDetail({ billId });

            if (response.data.status === "successfully") {
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

    const setValue = (billDetailId, productId) => {
        setOrderDetailId(billDetailId);
        setProductId(productId);
    }

    const clearValue = () => {
        setOrderDetailId(undefined);
        setProductId(undefined);
    };


    useEffect(() => {
        fetchOrderDetail();
    }, [])

    useEffect(() => {
        console.log(order);
    }, [order])

    useEffect(() => {
        fetchOrderDetail();
        console.log("đã đánh giá");
    }, [orderDetailId])

    useEffect(() => {
        if (taskCompleted) {
            fetchOrderDetail();
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
    if (!loading && !order) return <div>  <div className="min-h-[510px] bg-white  my-3 mb-5 rounded-md flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="">
                <img className="w-[88px] h-fit items-center" src="https://cdn-icons-png.flaticon.com/128/17568/17568968.png" alt="" />
            </div>
            <div> <p className="text-sm text-gray-400">Lỗi truyền tải dữ liệu</p></div>
        </div>
    </div>
    </div>


    if (orderDetailId) return <Evaluate orderDetailId={orderDetailId} productId={productId} clearOrderDetailId={clearValue} /**isSuccessfully={evaluateSuccessfully} */></Evaluate>

    return (
        <>
            <ToastContainer></ToastContainer>
            {order && order.length > 0 ? (
                order.map((bill) =>
                    <div className="" key={bill.billID}>
                        <div className="border-b">
                            <div className="rounded text-gray-500 font-light text-[5px] pb-2 flex inline-block  hover: cursor-pointer w-[100px]" onClick={clearOrderId}>
                                <img src="https://cdn-icons-png.flaticon.com/128/10728/10728732.png" alt="" className="w-[10px] mr-2" /> TRỞ LẠI
                            </div>
                        </div>
                        <ToastContainer></ToastContainer>
                        <div className="detail-wrapper grid gap-5 py-2">
                            <div className="orderInfo-container  border-gray-100 px-1">
                                <div className="orderInfo  ">
                                    <div className="orderInfo-1-container flex inline-block justify-between items-center">
                                        <div className="orderInfo-1-item   h-100px w-[70%]">
                                            <div className="orderId-container inline-flex text-[24px] flex gap-2">
                                                <div className="orderId-title text-gray-900 font-bold ">Mã đơn hàng</div>
                                                <div className="orderId text-gray-500 font-light"><span>#</span>{bill.billID}</div>
                                            </div>
                                        </div>
                                        <div className="orderInfo-1-item h-100px w-[30%] ">
                                            <div className="orderStatus-container flex justify-end px-5">
                                                <div className=" bg-[#C6E7FF] rounded-full text-cyan-800  text-sm font-bold text-center px-4 py-1 ">
                                                    <p>{bill.billOrderStatus}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="orderInfo-date text-[15px] text-gray-600">
                                        <p>Ngày tạo đơn: {bill.createdDatetime}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="customerInfo-container h-300px w-100%  border-t-2  border-b-2 py-2">
                                {/* <div className="customerInfo-title flex inline-block justify-between px-5 py-2 bg-gray-50 rounded-t-xl  items-center">
                            <div className="title font-medium text-[18px] ">Thông tin người nhận</div>
                        </div> */}
                                <div className="customerInfo grid gap-1 text-[15px] px-5 py-2">
                                    <div className="username-info flex inline-block gap-5">
                                        <div className="username-tag text-gray-900  font-medium w-30">Tên người nhận</div>
                                        <div className="username text-gray-600">{bill.userFullname}</div>
                                    </div>
                                    <div className="phoneNumber-info flex inline-block  gap-5">
                                        <div className="phoneNumber-tag text-gray-900 font-medium w-30">Số điện thoại</div>
                                        <div className="phoneNumber text-gray-600">{bill.userPhone}</div>
                                    </div>
                                    <div className="address-info flex inline-block  gap-5">
                                        <div className="address-tag text-gray-900 font-medium  w-30">Địa chỉ</div>
                                        <div className="address text-gray-600">{bill.billAddress}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="border rounded-lg border-t-2 px-2">
                                <div className="customerInfo-container h-300px w-100%  border-b-2 pb-5 ">
                                    {/* <div className="card-title flex inline-block justify-between  px-5 py-3 items-center ">
                            <div className="title font-medium text-[18px]">Chi tiết</div>
                            <div className="dropArrow font-bold"> <span>V</span></div>
                        </div> */}
                                    <div className="cardInfo-container pb-5 px-5">
                                        <a>
                                            <div className="shopInfo-container inline-flex  flex gap-6 items-center border-b-2  pb-2 pt-5">
                                                <div className="shopName font-bold text-gray-900 text-[18px] hover:cursor-pointer"><p>{bill.shopName}</p></div>
                                            </div>
                                        </a>
                                    </div>
                                    {bill.products.map((product) =>
                                        <div className="mb-5" key={product.productId}>
                                            <div className="productInfo-container  grid gap-3 px-5 ">
                                                <Link   to={`/productdetail?idProduct=${product.productId}`} className="hover:bg-gray-50">
                                                    <div className="hover:text-blue-500"> {product.name}</div>
                                                    <div className="productImage-wrapper flex p-2 rounded border  justify-between" >
                                                        <div className="productInfo-1 w-[15%] ">
                                                            <a href="">
                                                                <div className="productImage-container hover:cursor-pointer">
                                                                    <img className="w-[80px] h-[100px] rounded  object-cover " src={product.productImageURL} alt="product-image" />
                                                                </div>
                                                            </a>
                                                        </div>
                                                        <div className="productInfo-1 flex justify-between w-[85%]">
                                                            <div className="productInfo-2 text-[18px] grid text-gray-500 font-medium  ">
                                                                <div className="productName text-gray-900 "><p>{product.productName}</p></div>
                                                                <div className="flex-col content-end">
                                                                    <div className="productPrice"><p className="text-gray-500 font-light text-[15px] ">Đơn giá: <span className="font-normal">
                                                                        {new Intl.NumberFormat("vi-VN", {
                                                                            style: "currency",
                                                                            currency: "VND",
                                                                        }).format(product.productPrice)}</span></p></div>
                                                                    <div className="productQuantity"><p className="text-gray-500 font-light text-[15px] ">Số lượng: <span className="font-normal">{product.productQuantity}</span></p></div>
                                                                </div>
                                                            </div>
                                                            <div className="productInfo-3 flex flex-col justify-between mr-0">
                                                                {bill.billOrderStatus === "Hoàn thành" && product.isEvaluate == false ?
                                                                    (
                                                                        <div className="productInfo-butoton w-[100%] flex items-end mt-auto">
                                                                            <div className="productInfo-rating">
                                                                                <button onClick={() => setValue(product.billDetailId, product.productId)} className="w-[100px] h-[35px] rounded text-[#608BC1] text-[15px]  
                                                                                px-2 py-0 border border-[#608BC1] transition-all duration-500 ease-in-out hover:bg-gray-200 ">Đánh giá</button>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                    : <></>}

                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link  >
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="summary-wrapper">
                                    <div className="summary-container h-300px w-100%   ">
                                        <div className="summary-title flex inline-block justify-between px-5 py-2 rounded-xl  items-center">
                                            <div className="title font-medium text-[18px] ">Tóm tắt đơn hàng</div>
                                        </div>
                                        <div className="summary grid gap-1 text-[15px] px-5 py-1">
                                            <div className="summary-1 flex inline-block  justify-between gap-5">
                                                <div className="summary-tag  text-gray-600  font-medium w-30">Tạm tính</div>
                                                <div className="summary text-gray-600">
                                                    {new Intl.NumberFormat("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }).format(bill.billTempPrice)}
                                                </div>
                                            </div>
                                            <div className="summary-2 flex inline-block  justify-between  gap-5">
                                                <div className="summary-tag  text-gray-600 font-medium w-30">Phí vận chuyển</div>
                                                <div className="summary text-gray-600">
                                                    {new Intl.NumberFormat("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }).format(bill.billTotalShippingPrice)}</div>
                                            </div>
                                            <div className="summary-3 flex inline-block  justify-between  gap-5">
                                                <div className="summary-tag  text-gray-600 font-medium  w-30">Giảm giá</div>
                                                <div className="summary text-gray-600">
                                                    {new Intl.NumberFormat("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }).format(bill.billDiscountPrice)}</div>
                                            </div>
                                        </div>
                                        <div className="summary-2 grid gap-1 text-[15px] py-2 border-t mx-5 ">
                                            <div className="summary-3 flex inline-block  justify-between  text-gray-900 font-medium  gap-5">
                                                <div className="summary-tag   w-30">Tổng tiền</div>
                                                <div className="summary ">  {new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(bill.billTotalPrice)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="orderInfo-container  border-gray-100 px-1">
                                <div className="orderInfo  ">
                                    <div className="orderInfo-1-container flex inline-block justify-end items-center">
                                        <div className="orderInfo-1-item h-100px  ">
                                            <div className="orderStatus-container flex justify-end">
                                                {((bill.billOrderStatus === "Hủy") || (bill.billOrderStatus === "Hoàn thành")) ? (
                                                    <div className=" bg-cyan-800 rounded text-white  text-sm font-bold text-center px-6 py-1 ">
                                                        <button onClick={() => reOrder(bill.billID)}>Mua lại</button>
                                                    </div>
                                                ) : <></>}
                                                {bill.billOrderStatus === "Chờ duyệt" ? (
                                                    <div className=" bg-cyan-800 rounded text-white  text-sm font-bold text-center px-6 py-1 ">
                                                        <button onClick={() => cancelOrder(bill.billID)}>Hủy đơn</button>
                                                    </div>
                                                ) : <></>}

                                                {bill.billOrderStatus === "Đã giao" && (
                                                    <div className=" bg-cyan-800 rounded text-white  text-sm font-bold text-center px-6 py-1 ">
                                                        <button onClick={() => confirmOrder(bill.billID)}>Xác nhận đã nhận hàng</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                )
            )
                : (
                    <>
                        <div className="min-h-[510px] bg-white  my-3 mb-5 rounded-md flex items-center justify-center">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <div className="">
                                    <img className="w-[88px] h-fit items-center" src="https://st3.depositphotos.com/5532432/17972/v/450/depositphotos_179728282-stock-illustration-web-search-flat-vector-icon.jpg" alt="" />
                                </div>
                                <div> <p className="text-base text-gray-400">Không có dữ liệu</p></div>
                            </div>
                        </div>
                    </>
                )}
        </>
    )
}