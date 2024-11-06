import { useState, useEffect } from "react"
// npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome


export default function OrderDetail({ orderId, clearOrderDetailId }) {
    const [order, setOrder] = useState();
    const [loading, setLoading] = useState(false);

    const fetchOrderDetail = async () => {
        try {
            setLoading(true);

            const username = 'thu'; // Tài khoản của bạn
            const password = '123'; // Mật khẩu của bạn      
            const basicAuth = 'Basic ' + btoa(username + ':' + password);

            const response = await fetch(`http://localhost:8080/api/v1/billdetail/read?billId=${orderId}`, {
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
            setOrder(data.data);
            typeof (data.data)
            console.log('hello world 1');


        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchOrderDetail();
    }, [])


    useEffect(() => {
        console.log('hello world 2');
        console.log(order);
    }, [order])

    if (loading) return <div>LOADING ...</div>

    if (!loading && !order) return <div>Cannot find</div>


    return (
        <>
            {order && order.length > 0 ? (
                order.map((bill) =>
                    <div className="" key={bill.billID}>
                        <div className="border-b hover: cursor-pointer">
                            <div className="rounded text-gray-500 font-light text-[5px] pb-2" onClick={clearOrderDetailId}>
                                TRỞ LẠI
                            </div>
                        </div>
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
                                        <a href="#">
                                            <div className="shopInfo-container inline-flex  flex gap-6 items-center border-b-2  pb-2 pt-5">
                                                <div className="shopName font-bold text-gray-900 text-[18px] hover:cursor-pointer"><p>{bill.shopName}</p></div>
                                            </div>
                                        </a>
                                    </div>
                                    {bill.products.map((product) =>
                                        <div className="mb-5">
                                            <div className="productInfo-container  grid gap-3 px-5 " key={product.productId}>
                                                <a href="#">
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
                                                            <div className="productInfo-3 ">
                                                                {product.isEvaluate == false && bill.billOrderStatus === "Hoàn thành" ?
                                                                    (
                                                                        <div className="productInfo-butoton w-[100%] flex items-end content-between">
                                                                            <div className="productInfo-rating">
                                                                                <button className="w-[100px] h-[35px] rounded text-[#608BC1] text-[15px]  px-2 py-0 border border-[#608BC1] transition-all duration-500 ease-in-out hover:bg-gray-200 w-[100%]">Đánh giá</button>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                    : <></>}

                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
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
                                                {(bill.billOrderStatus === "Hủy") || (bill.billOrderStatus === "Hoàn thành") && (
                                                    <div className=" bg-cyan-800 rounded text-white  text-sm font-bold text-center px-6 py-1 ">
                                                        <button>Mua lại</button>
                                                    </div>
                                                )}
                                                {bill.billOrderStatus === "Chờ duyệt" && (
                                                    <div className=" bg-cyan-800 rounded text-white  text-sm font-bold text-center px-6 py-1 ">
                                                        <button>Hủy đơn</button>
                                                    </div>
                                                )}

                                                {bill.billOrderStatus === "Đã giao" && (
                                                    <div className=" bg-cyan-800 rounded text-white  text-sm font-bold text-center px-6 py-1 ">
                                                        <button>Xác nhận đã nhận hàng</button>
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