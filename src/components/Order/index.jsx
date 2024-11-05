import { useState, useEffect } from "react"
// npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome


export default function OrderDetail({ orderId, clearOrderDetailId }) {
    // const [order, setOrder] = useState();
    // const [loading, setLoading] = useState(false);

    // const fetchOrderDetail = async () => {
    //     try {
    //         setLoading(true);

    //         // Hàm delay tạo một Promise để có thể sử dụng await

    //         setOrder({ id: 1 })
    //         // Chờ 5 giây

    //         console.log('hello world');
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }


    // useEffect(() => {
    //     fetchOrderDetail();
    // }, [])

    // if (loading) return <div>LOADING ...</div>

    // if (!loading && !order) return <div>Cannot find</div>


    return (
        <>
            <div className="">
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
                                        <div className="orderId text-gray-500 font-light"><span>#</span>123456</div>
                                    </div>
                                </div>
                                <div className="orderInfo-1-item h-100px w-[30%] ">
                                    <div className="orderStatus-container flex justify-end px-5">
                                        <div className=" bg-[#C6E7FF] rounded-full text-cyan-800  text-sm font-bold text-center px-4 py-1 ">
                                            <p>Đã hủy</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="orderInfo-date text-[15px] text-gray-600">
                                <p>Ngày tạo đơn: 22/10/2023</p>
                            </div>
                        </div>
                    </div>
                    <div className="customerInfo-container h-300px w-100%   border  rounded-xl ">
                        <div className="customerInfo-title flex inline-block justify-between px-5 py-2 bg-gray-50 rounded-t-xl  items-center">
                            <div className="title font-medium text-[18px] ">Thông tin người nhận</div>
                        </div>
                        <div className="customerInfo grid gap-1 text-[15px] px-5 py-2">
                            <div className="username-info flex inline-block gap-5">
                                <div className="username-tag text-gray-900  font-medium w-30">Tên người nhận</div>
                                <div className="username text-gray-600">Anh Thu</div>
                            </div>
                            <div className="phoneNumber-info flex inline-block  gap-5">
                                <div className="phoneNumber-tag text-gray-900 font-medium w-30">Số điện thoại</div>
                                <div className="phoneNumber text-gray-600">0123456789</div>
                            </div>
                            <div className="address-info flex inline-block  gap-5">
                                <div className="address-tag text-gray-900 font-medium  w-30">Địa chỉ</div>
                                <div className="address text-gray-600">Long Mỹ, Hậu Giang, Việt Nam</div>
                            </div>
                        </div>
                    </div>
                    <div className="customerInfo-container h-300px w-100%  border rounded-xl pb-5 ">
                        <div className="card-title flex inline-block justify-between  px-5 py-3 items-center rounded-t-xl bg-gray-50">
                            <div className="title font-medium text-[18px]">Chi tiết</div>
                            {/* <div className="dropArrow font-bold"> <span>V</span></div> */}
                        </div>
                        <div className="cardInfo-container py-2 px-5">
                            <a href="#">
                                <div className="shopInfo-container inline-flex  flex gap-6 items-center border-b-2  pb-2">
                                    <div className="shopName font-bold text-gray-900 text-[18px] hover:cursor-pointer"><p>Cửa hàng CLIO</p></div>
                                </div>
                            </a>
                        </div>
                        <div className="productInfo-container  grid gap-3 px-5 ">
                            <a href="#">
                                <div className="productImage-wrapper flex p-2 rounded border  justify-between" >
                                    <div className="productInfo-1 w-[10%] ">
                                        <a href="">
                                            <div className="productImage-container hover:cursor-pointer hover:cursor-pointer ">
                                                <img className="w-[80px] h-[100px] rounded  object-cover " src="https://vcdn1-giaitri.vnecdn.net/2018/03/20/co-gai-den-tu-hom-qua3-2984-14-6777-2518-1521549733.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=u8TzC1ZXZ6dyPZfTp3J_3Q" alt="" />
                                            </div>
                                        </a>
                                    </div>
                                    <div className="productInfo-1 flex justify-between w-[85%]">
                                        <div className="productInfo-2 text-[18px] grid text-gray-500 font-medium  ">
                                            <div className="productName text-gray-900 "><p>Ngày xưa có một chuyện tình</p></div>
                                            <div className="flex-col content-end">
                                                <div className="productPrice"><p className="text-gray-500 font-light text-[15px] ">Đơn giá: <span className="font-normal">250000</span></p></div>
                                                <div className="productQuantity"><p className="text-gray-500 font-light text-[15px] ">Số lượng: <span className="font-normal">2</span></p></div>
                                            </div>
                                        </div>
                                        <div className="productInfo-3 ">
                                            <div className="productInfo-butoton w-[100%] flex items-end content-between">
                                                <div className="productInfo-rating">
                                                    <button className="w-[100px] h-[35px] rounded text-[#608BC1] text-[15px]  px-2 py-0 border border-[#608BC1] transition-all duration-500 ease-in-out hover:bg-gray-200 w-[100%]">Đánh giá</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="#">
                                <div className="productImage-wrapper flex p-2 border  rounded justify-between" >
                                    <div className="productInfo-1 w-[10%] ">
                                        <a href="">
                                            <div className="productImage-container hover:cursor-pointer hover:cursor-pointer ">
                                                <img className="w-[80px] h-[100px] rounded  object-cover " src="https://nld.mediacdn.vn/thumb_w/698/291774122806476800/2023/6/19/ngay-xua-co-1-chuyen-tinh-1-6365-16871692447131238194593.jpg" alt="" />
                                            </div>
                                        </a>
                                    </div>
                                    <div className="productInfo-1 flex justify-between w-[85%]">
                                        <div className="productInfo-2 text-[18px] grid text-gray-500 font-medium  ">
                                            <div className="productName text-gray-900 "><p>Ngày xưa có một chuyện tình</p></div>
                                            <div className="flex-col content-end">
                                                <div className="productPrice"><p className="text-gray-500 font-light text-[15px] ">Đơn giá: <span className="font-normal">250000</span></p></div>
                                                <div className="productQuantity"><p className="text-gray-500 font-light text-[15px] ">Số lượng: <span className="font-normal">2</span></p></div>
                                            </div>
                                        </div>
                                        <div className="productInfo-3 ">
                                            <div className="productInfo-butoton w-[100%] flex items-end content-between">
                                                <div className="productInfo-rating">
                                                    <button className="w-[100px] h-[35px] rounded text-[#608BC1] text-[15px]  px-2 py-0 border border-[#608BC1] transition-all duration-500 ease-in-out hover:bg-gray-200 w-[100%]">Đánh giá</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="#">
                                <div className="productImage-wrapper flex p-2 border rounded justify-between " >
                                    <div className="productInfo-1 w-[10%] ">
                                        <a href="">
                                            <div className="productImage-container  ">
                                                <img className="w-[80px] h-[100px] rounded  object-cover " src="https://filesdata.cadn.com.vn/filedatacadn/media//data_news/Image/2022/th1/ng17/14van3.jpg" alt="" />
                                            </div>
                                        </a>
                                    </div>
                                    <div className="productInfo-1 flex justify-between w-[85%]">
                                        <div className="productInfo-2 text-[18px] grid text-gray-500 font-medium  ">
                                            <div className="productName text-gray-900 "><p>Ngày xưa có một chuyện tình</p></div>
                                            <div className="flex-col content-end">
                                                <div className="productPrice"><p className="text-gray-500 font-light text-[15px] ">Đơn giá: <span className="font-normal">250000</span></p></div>
                                                <div className="productQuantity"><p className="text-gray-500 font-light text-[15px] ">Số lượng: <span className="font-normal">2</span></p></div>
                                            </div>
                                        </div>
                                        <div className="productInfo-3 ">
                                            <div className="productInfo-butoton w-[100%] flex items-end content-between">
                                                <div className="productInfo-rating">
                                                    <button className="w-[100px] h-[35px] rounded text-[#608BC1] text-[15px]  px-2 py-0 border border-[#608BC1] transition-all duration-500 ease-in-out hover:bg-gray-200 w-[100%]">Đánh giá</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="summary-wrapper">
                        <div className="summary-container h-300px w-100%   border  rounded-xl bg-gray-50 ">
                            <div className="summary-title flex inline-block justify-between px-5 py-2 rounded-xl  items-center">
                                <div className="title font-medium text-[18px] ">Tóm tắt đơn hàng</div>
                            </div>
                            <div className="summary grid gap-1 text-[15px] px-5 py-1">
                                <div className="summary-1 flex inline-block  justify-between gap-5">
                                    <div className="summary-tag text-gray-900  font-medium w-30">Tạm tính</div>
                                    <div className="summary text-gray-600">500000</div>
                                </div>
                                <div className="summary-2 flex inline-block  justify-between  gap-5">
                                    <div className="summary-tag text-gray-900 font-medium w-30">Phí vận chuyển</div>
                                    <div className="summary text-gray-600">20000</div>
                                </div>
                                <div className="summary-3 flex inline-block  justify-between  gap-5">
                                    <div className="summary-tag text-gray-900 font-medium  w-30">Giảm giá</div>
                                    <div className="summary text-gray-600">0</div>
                                </div>
                            </div>
                            <div className="summary-2 grid gap-1 text-[15px] py-2 border-t mx-5 ">
                                <div className="summary-3 flex inline-block  justify-between  gap-5">
                                    <div className="summary-tag text-gray-900 font-medium  w-30">Tổng tiền</div>
                                    <div className="summary text-gray-600">520000</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="orderInfo-container  border-gray-100 px-1">
                        <div className="orderInfo  ">
                            <div className="orderInfo-1-container flex inline-block justify-end items-center">
                                <div className="orderInfo-1-item h-100px  ">
                                    <div className="orderStatus-container flex justify-end">
                                        <div className=" bg-cyan-800 rounded-lg text-[#C6E7FF]  text-sm font-bold text-center px-4 py-1 ">
                                            <button>Mua lại</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}