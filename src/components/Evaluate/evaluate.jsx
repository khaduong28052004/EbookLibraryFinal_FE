import { useState, useEffect } from "react"
import BeatLoader from "react-spinners/BeatLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";
import { toast, ToastContainer } from 'react-toastify';

export default function Evaluate({ orderDetailId, productId, clearOrderDetailId }) {
    // const [order, setOrder] = useState();
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
            return userObject.id_account; // Trả về id_account
        }

        return null;
    };

    const fetchEvaluate = async () => {
        try {
            setLoading(true);

            const username = 'thu'; // Tài khoản của bạn
            const password = '123'; // Mật khẩu của bạn      
            const basicAuth = 'Basic ' + btoa(username + ':' + password);
            const accountId = 8;

            const formData = new FormData();
            formData.append('star', star);
            formData.append('content', content || "");
            formData.append('billDetailId', orderDetailId);
            formData.append('productId', productId);
            formData.append('accountId', accountId);
    
            if (images && images.length > 0) {
                images.forEach((image, index) => {
                    formData.append(`images[${index}]`, image);
                });
            }

            console.log('formData:', formData );

            const response = await fetch(`http://localhost:8080/api/v1/evaluate/create`, {
                method: 'POST',
                headers: {
                    'Authorization': basicAuth
                },
                body: formData
            })
         

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            console.log('Evaluate submitted successfully');
            clearOrderDetailId();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleStarClick = (value) => {
        setStar(value);
        console.log("start", value);
    };

    const handleImageChange = (event) => {
        const totalImages = images.length + event.target.files.length;
        console.log(listImage);

        if (totalImages > 4) {
            setMessage("Bạn chỉ có thể tải lên tối đa 4 ảnh.");
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

        const uploadImages = [...event.target.files];
        const hasError = uploadImages.some((image) => {
            if (image.size > maxSize) {
                setMessage("Kích thước file ảnh quá lớn");
                return true;
            }

            if (!allowedTypes.includes(image.type)) {
                setMessage(
                    "Loại file không hợp lệ, vui lòng chọn file ảnh có định dạng PNG, JPEG hoặc JPG."
                );
                return true;
            }

            return false;
        });

        if (hasError) {
            return;
        }

        setImages((images) => {
            return [...images, ...uploadImages];
        });
        refresh();
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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen ">
                <BeatLoader color="#56A0D3" />
            </div>
        );
    }


    return (
        <>
            <div className="p-3">
                {/* <ToastContainer></ToastContainer> */}
                <form encType="multipart/form-data" className="text-sm">
                    <div className="border-b">
                        <div className="rounded text-gray-500 font-light text-[5px] pb-2 flex inline-block  hover: cursor-pointer w-[100px]" onClick={clearOrderDetailId}>
                            <img src="https://cdn-icons-png.flaticon.com/128/10728/10728732.png" alt="" className="w-[10px] mr-2" /> TRỞ LẠI
                        </div>
                    </div>
                    <div className="p-5">
                        <div>
                            <div className="flex my-5">
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
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12">
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
                                <div className="col-span-12 grid grid-cols-12">
                                    <div className="md:col-span-5 col-span-12">
                                        <div className="mt-5 h-[160px]">
                                            {" "}
                                            <label className="block mb-2 font-medium text-gray-700">
                                                Đăng tải ảnh sản phẩm
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
                                                    <span className="mt-2 text-sm text-gray-600">
                                                        Đăng tải ảnh sản phẩm
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
                                        <div className="h-auto min-h-[160px] w-full md:ml-3 border  rounded-md border-gray-400">
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
                                                {" "}
                                                {images.map((image, index) => (
                                                    <div key={index} className="relative">
                                                        <img
                                                            src={URL.createObjectURL(image)}
                                                            alt="image"
                                                            id="custom-img-evaluate"
                                                            className="w-[231.1px] h-[100px]  rounded-md"
                                                        />
                                                        <span className="absolute top-2 right-2 bg-gray-50 bg-opacity-50 w-5 h-5 hover:bg-opacity-200 hover:cursor-pointer rounded-full flex items-center justify-center"
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
                                    className="my-4 min-w-[90px] rounded-md bg-indigo-600 px-4 py-1 text-white  hover:bg-indigo-800 hover:cursor-pointer
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
        </>
    )
}