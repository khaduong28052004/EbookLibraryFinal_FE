import React from 'react';
import { useState, useEffect } from "react"
import BeatLoader from "react-spinners/BeatLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";
import userEvaluateService from '../../service/user/evaluate';
import { toast, ToastContainer } from 'react-toastify';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
// npm install --save react-spinners

const RatingModal = ({ product, orderDetailId, productId, isOpen, handleClose, clearOrderDetailId }) => {
    if (!isOpen) return null; // Nếu modal không mở thì không hiển thị gì
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [star, setStar] = useState(0);
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const [listImage, setListImage] = useState([]);
    const [message, setMessage] = useState("");
    const [taskCompleted, setTaskCompleted] = useState(false);

    const getIdAccountFromSession = () => {
        const user = sessionStorage.getItem("user");

        if (user) {
            const userObject = JSON.parse(user);
            return userObject; // Trả về id_account
        }

        return null;
    };

    const fetchEvaluate = async () => {
        try {
            setLoading(true);

            const accountId = getIdAccountFromSession().id_account;
            if (!star || star <= 0) {
                toast.warn("Vui lòng đánh giá sao trước khi gửi");
                setLoading(false);
                return;
            }
            console.log('1');

            console.log('star:', star);
            console.log('content:', content);
            console.log('orderDetailId:', orderDetailId);
            console.log('productId:', productId);
            console.log('accountId:', accountId);
            console.log('images:', images);

            const response = await userEvaluateService.createEvaluate({
                star,
                content: content || "",
                orderDetailId,
                productId,
                accountId: accountId,
                images: images,
            });

            if (response.status !== 200) {
                handleErrorResponse(response.data);
                return;
            }
            toast.success("Gửi đánh giá thành công");
            handleClose()
            clearOrderDetailId();

        } catch (error) {
            console.log('Caught error:', error.message);
            toast.error(error.message || "Đã xảy ra lỗi khi gửi đánh giá");
        } finally {
            setLoading(false);
        }
    };


    const handleStarClick = (value) => {
        setStar(value);
        console.log("start", value);
    };

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

    const handleContentChange = (value) => {
        setContent(value);
    };

    const refresh = () => {
        setMessage("");
    };

    useEffect(() => {
        console.log("{product.urlImge", product)
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen ">
                <BeatLoader color="#56A0D3" />
            </div>
        );
    }

    return (
        <div className={`${loading ? 'opacity-50' : 'opacity-100'} fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50`}>
            <div className="bg-white rounded-lg p-6 w-1/3">

                <div className="flex justify-end border-b">
                    <div className="rounded text-gray-500 font-light text-[5px] pb-2 flex inline-block  hover: cursor-pointer" onClick={handleClose}>
                        {/* <img src="https://cdn-icons-png.flaticon.com/128/10728/10728732.png" alt="" className="w-[10px] mr-2" /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </div>
                </div>
                
                <div className="border border-[#003EA1] p-2 flex gap-4 mb-5">
                        <img className='w-[50px] h-[50px] border border-[#003EA1] rounded ' src={`${product.urlImge}`} alt="" />
                        <div className="flex flex-col text-sm text-[#003EA1]">
                            <div>{product.productName}</div>
                            <div className='text-[5px]'>
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(product.price)}
                            </div>
                        </div>
                    </div>
                <div className="p-5 border mt-[10px] rounded">
                    <ToastContainer></ToastContainer>
                    <div className="">
                        <form encType="multipart/form-data" className="text-sm">
                            <div className="">
                                <div>
                                    <div className="flex my-3">
                                        <p className="mr-3 font-medium text-gray-700">Chất lượng sản phẩm:</p>
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <span
                                                    key={value}
                                                    className={`${star >= value ? "text-yellow-300" : "text-gray-400"
                                                        }`}
                                                    data-value={value}
                                                    onClick={() => handleStarClick(value)}
                                                >
                                                    <FontAwesomeIcon icon={faStar} />
                                                </span>
                                            ))}
                                            <p id="rating-text" className="rating-text2"></p>
                                            <input
                                                id="rating-value"
                                                type="hidden"
                                                name="starDescription"
                                                value={star}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 gap-4 ">
                                        <div className="col-span-12 mt-5">
                                            <div className="flex items-center">
                                                <p className="mr-3  font-medium text-gray-700">Đúng với thông tin sản phẩm:</p>
                                                <p className="text-gray-500">Để lại đánh giá</p>
                                            </div>
                                            <div className="mt-3 w-full">
                                                <input
                                                    name="content"
                                                    className="border border-gray-500 rounded-md p-2.5 placeholder-slate-500 w-full"
                                                    placeholder="Vui lòng để lại đánh giá"
                                                    required
                                                    value={content}
                                                    onChange={(e) => handleContentChange(e.target.value)}
                                                ></input>
                                            </div>
                                            <span style={{ color: "red", fontSize: "15px" }}>
                                                {/* {errorMessageContent} */}
                                            </span>
                                        </div>
                                        <div className="col-span-12 grid grid-cols-12 h-min-[600px]">
                                            <div className="md:col-span-5 col-span-12">
                                                <div className="mt-5 h-[160px]">
                                                    {" "}
                                                    <label className="block mb-2 font-medium text-gray-700">
                                                        Đăng tải ảnh đánh giá
                                                    </label>
                                                    <div className="border border-dashed w-full h-full border-gray-400 p-5 rounded-md flex justify-center items-center">
                                                        <label
                                                            htmlFor="upload-photo"
                                                            className="cursor-pointer flex flex-col items-center"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-12 w-12 text-gray-400"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4zm5 11a2 2 0 100-4 2 2 0 000 4zm-1-6h2V4H8v4z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            <span className="mt-2 text-sm text-center text-gray-600">
                                                                Đăng tải ảnh
                                                            </span>
                                                        </label>
                                                        <input
                                                            id="upload-photo"
                                                            type="file"
                                                            className="hidden form-control"
                                                            multiple
                                                            accept="image/png, image/jpeg"
                                                            onChange={handleImageChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full h-min-[40px] items-center bg-red-200 text-red-700 flex justify-center text-[5px] rounded-b">
                                                    <label className="message">{message}</label>
                                                </div>
                                            </div>

                                            <div className="md:col-span-7 col-span-12 mt-12 ">
                                                <div className="h-auto min-h-[160px] md:ml-3 border  rounded-md border-gray-400">
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                                                        {" "}
                                                        {images.map((image, index) => (
                                                            <div key={index} className="relative">
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <>
                                        <button
                                            type="button"
                                            className="my-4 min-w-[90px] rounded-md bg-[#003EA1] px-4 py-1 text-white  hover:opacity-90 hover:cursor-pointer
                                       cursor-default"
                                            style={{ width: "90px" }}
                                            onClick={() => fetchEvaluate()}
                                        >
                                            Gửi
                                        </button>
                                    </>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RatingModal;
