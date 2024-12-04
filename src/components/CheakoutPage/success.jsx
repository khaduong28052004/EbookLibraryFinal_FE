import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../Partials/Layout";
import { useRequest } from "../Request/RequestProvicer";
const success = () => {
    const localtion = useLocation();
    const [vnp_TransactionStatus, setVnp_TransactionStatus] = useState();
    const [vnp_Amount, setVnp_Amount] = useState();
    const [vnp_TransactionNo, setVnp_TransactionNo] = useState();
    const [vnp_PayDate, setVnp_PayDate] = useState();
    const query = new URLSearchParams(localtion.search);
    const navigate = useNavigate();
    const { getItem, startRequest, endRequest } = useRequest();
    useEffect(() => {
        startRequest();
        setVnp_TransactionStatus(query.get("vnp_TransactionStatus"));
        setVnp_Amount(query.get("vnp_Amount"));
        setVnp_TransactionNo(query.get("vnp_TransactionNo"));
        const dateString = query.get("vnp_PayDate");
        // Chuyển đổi chuỗi thành đối tượng Date
        const year = parseInt(dateString.substring(0, 4), 10);
        const month = parseInt(dateString.substring(4, 6), 10) - 1; // Tháng (0-based)
        const day = parseInt(dateString.substring(6, 8), 10);
        const hour = parseInt(dateString.substring(8, 10), 10);
        const minute = parseInt(dateString.substring(10, 12), 10);
        const date = new Date(year, month, day, hour, minute);
        const idUser = sessionStorage.getItem("id_account");
        const token = sessionStorage.getItem("token");
        setVnp_PayDate(date);
        if (query.get("vnp_TransactionStatus") === "00" && getItem("data")) {
            axios.post("http://localhost:8080/api/v1/user/pay/" + idUser + "?paymentMethod_id=2&id_address" + getItem("id_address"), getItem("data"), {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then(response => {
                sessionStorage.removeItem("appData");
                endRequest();
            }).catch();
        }
    }, []);
    return (
        <Layout>
            <div className="w-full">
                {vnp_TransactionStatus == "00" ? (<div className=" flex justify-center items-center ">
                    <div className="w-[600px] p-10 border border-gray-400 space-y-3">
                        <div className="flex flex-col flex-1 justify-center items-center space-y-3">
                            <img src="https://ich.edu.vn/App_Files/Upload/2019/icon-thanh-cong.png" className="w-15" alt="" />
                            <div className="font-semibold text-[20px] text-green-500">Giao dịch thành công</div>
                            <div className="font-medium text-[20px]">Thông tin giao dịch</div>
                        </div>
                        <div className="flex flex-col flex-1 space-y-3">
                            <div className="flex justify-between">
                                <div className="font-normal">Thời gian thực hiện</div>
                                <div className="font-medium">{Intl.DateTimeFormat('vi-VN', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour12: false
                                }).format(vnp_PayDate)}</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="font-normal">Mã giao dịch</div>
                                <div className="font-medium">{vnp_TransactionNo}</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="font-normal">Nội dung thanh toán</div>
                                <div className="font-medium">Thanh toán đơn hàng TOEL</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="font-normal">Cổng thanh toán</div>
                                <div className="font-medium">Thanh toán trực tuyến VNPAY</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="font-normal">Số tiền thanh toán</div>
                                <div className="font-medium">{Intl.NumberFormat().format(vnp_Amount / 100)} VND</div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button onClick={() => { startRequest(); endRequest(); navigate("/") }} class=" flex ml-5 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 active:bg-blue-700">
                                Tiếp tục mua
                            </button>
                            <button onClick={() => { startRequest(); endRequest(); navigate("/profile#order") }} class=" flex ml-5 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 active:bg-blue-700">
                                Xem đơn hàng
                            </button>

                        </div>
                    </div>
                </div>) : (
                    <div className=" flex justify-center items-center ">
                        <div className="w-[600px] p-10 border border-gray-400 space-y-3">
                            <div className="flex flex-col flex-1 justify-center items-center space-y-3">
                                <img src="https://sandbox.vnpayment.vn/paymentv2/images/graph/error.svg" className="w-15" alt="" />
                                <div className="font-semibold text-[20px] text-red-500">Giao dịch thất bại</div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </Layout>)
}
export default success;