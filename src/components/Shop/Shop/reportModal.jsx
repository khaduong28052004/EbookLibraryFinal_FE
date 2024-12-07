import React, { useState } from 'react';
import homeShopService from "../../../service/Seller/homeShopService";
import { toast, ToastContainer } from "react-toastify";

// npm install --save react-spinners

const ReportModal = ({ accountId, shopId, isOpen, handleClose }) => {
    if (!isOpen) return null;

    const [content, setContent] = useState('')

    const createReport = async (createAt) => {
        const title = "Báo cáo shop"
        try {
            const response = await homeShopService.createReport(accountId, shopId, createAt, content, title);
            if (response.data.status !== 200) {
                console.error("Error report:", response.data.message);
                toast.warn(response.data.message);
                return;
            }
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error report:", error);
        }
    }


    return (
        <>
            <ToastContainer />
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

                <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">

                    <div className="flex justify-end ">
                        <div className="rounded text-gray-500 font-light text-[5px] pb-2 flex inline-block  hover: cursor-pointer" onClick={handleClose}>
                            {/* <img src="https://cdn-icons-png.flaticon.com/128/10728/10728732.png" alt="" className="w-[10px] mr-2" /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-lg font-semibold mb-4">Nhập lý do</h2>
                    <textarea name="postContent" value={content} onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        rows="4"
                        placeholder="Enter your report content"
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => createReport(new Date())}
                            className="bg-[#003EA1] text-white w-40 py-1 px-5 text-sm rounded-md hover:bg-opacity-90"
                        >
                            Gửi báo cáo
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReportModal;
