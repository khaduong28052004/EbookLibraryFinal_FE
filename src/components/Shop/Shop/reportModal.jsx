import React, { useState } from 'react';
import homeShopService from "../../../service/Seller/homeShopService";
import { toast, ToastContainer } from "react-toastify";

// npm install --save react-spinners

const ReportModal = ({ accountId, shopId, isOpen, handleClose }) => {
    if (!isOpen) return null;
    const [images, setImages] = useState([]);
    const [listImage, setListImage] = useState([]);
    const [message, setMessage] = useState("");

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

    const handleImageChange = (event) => {
        const maxSize = 5 * 1024 * 1024;
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
        const uploadImages = Array.from(event.target.files);
        const totalImages = images.length + uploadImages.length;

        if (totalImages > 4) {
            setMessage("Chỉ có thể tải tối đa 4 ảnh. Vui lòng chọn lại");
            event.target.value = "";
            return;
        }

        const validImages = [];
        let hasError = false;
        uploadImages.forEach((image) => {
            if (image.size > maxSize) {
                setMessage("Kích thước ảnh không được vượt quá 5MB");
                hasError = true;
            } else if (!allowedTypes.includes(image.type)) {
                setMessage("Chỉ chấp nhận file ảnh có định dạng PNG, JPEG hoặc JPG");
                hasError = true;
            } else {
                validImages.push(image);
            }
        });

        if (hasError) {
            event.target.value = "";
            return;
        }

        // Cập nhật images với các ảnh hợp lệ
        setImages((prevImages) => [...prevImages, ...validImages]);
        refresh();
        event.target.value = "";
    };

    const removeImage = (index) => {
        console.log(index);
        setImages((images) => images.filter((_image, idx) => idx !== index));
        refresh();
    };

    const refresh = () => {
        setMessage("");
    };

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
                    <div>
                        <h6 className="text-lg  mb-4 ">Nội dung báo cáo</h6>
                        <input name="postContent" value={content} onChange={(e) => setContent(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md mb-4 text-sm"
                            rows="4"
                            placeholder="Nhập nội dung báo cáo"
                        />

                        <div className="col-span-12 grid grid-cols-12 h-min-[600px]">
                            <div className=" col-span-5  text-sm">
                                <div className="">
                                    {" "}
                                    <label htmlFor="upload-photo" className="flex cursor-pointer border border-dashed w-full h-full border-[#003EA1] text-[#003EA1] pl-1 rounded-md justify-center items-center py-1">
                                        <label
                                            className=" flex flex-col items-center pr-2"
                                        >
                                            {/* <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-400"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4zm5 11a2 2 0 100-4 2 2 0 000 4zm-1-6h2V4H8v4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg> */}
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#003EA1" class="size-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                            </svg> */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="#003EA1" class="size-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                            </svg>

                                        </label>
                                        <input
                                            id="upload-photo"
                                            type="file"
                                            className="hidden form-control"
                                            multiple
                                            accept="image/png, image/jpeg"
                                            onChange={handleImageChange}
                                        />
                                        <p>Tải ảnh lên</p>

                                    </label>
                                </div>

                            </div>
                            <div className=" col-span-12 w-full h-min-[40px] items-center bg-red-200 text-red-700 flex justify-center text-[5px] rounded my-2">
                                <label className="message">{message}</label>
                            </div>
                            <div className=" col-span-12 mb-2 ">
                                {images.length == 0 ? <></> :
                                    <div className="h-auto min-h-[150px] border  rounded-md border-gray-400">

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                                            {images.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className="relative">
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt="image"
                                                        id="custom-img-evaluate"
                                                        className="w-[231.1px] h-[115px]  rounded-md object-cover shadow"
                                                    />
                                                    <span className="absolute top-1 right-1 bg-opacity-70 bg-whiten shadow-3  w-5 h-5 hover:bg-opacity-100 hover:cursor-pointer rounded-full flex items-center justify-center duration-300 ease-in"
                                                        id="close-img-evaluate"
                                                        onClick={() => removeImage(index)}
                                                    >
                                                        <p>x</p>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                        <div className="flex justify-end space-x-">
                            <button
                                onClick={() => createReport(new Date())}
                                className="bg-[#003EA1] text-white w-40 py-1 px-5 text-sm rounded-md hover:bg-opacity-90"
                            >
                                Gửi báo cáo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReportModal;
