import React, { useState, useEffect } from "react";

import ProductCardStyleOne from "../components/Helpers/Cards/ProductCardStyleOne";
import axios from "axios";

const ProductCarousel = () => {
    const [activeTab, setActiveTab] = useState(0); // Tab index
    const [carouselIndex, setCarouselIndex] = useState(0); // Carousel index
    const [data_ProducAll, setData_ProducAll] = useState([]);

    // Dummy product data
    const data_Products1 = {
        datas: [
            {
                id: 1,
                name: "Áo sơ mi nam cao cấp",
                imageProducts: [
                    {
                        name: "https://down-bs-vn.img.susercontent.com/vn-11134216-7ras8-m1f4tydj1wt400_tn.webp",
                    },
                ],
                price: 500000,
                sale: 20,
                star: 4,
                flashSaleDetail: {
                    sale: 15,
                },
            },
            {
                id: 2,
                name: "Giày thể thao nam",
                imageProducts: [
                    {
                        name: "https://down-bs-vn.img.susercontent.com/vn-11134216-7ras8-m1f4tydj1wt400_tn.webp",
                    },
                ],
                price: 800000,
                sale: 10,
                star: 5,
                flashSaleDetail: null,
            },
            {
                id: 3,
                name: "Balo thời trang",
                imageProducts: [
                    {
                        name: "https://down-bs-vn.img.susercontent.com/vn-11134216-7ras8-m1f4tydj1wt400_tn.webp",
                    },
                ],
                price: 300000,
                sale: 5,
                star: 3,
                flashSaleDetail: null,
            },
            {
                id: 4,
                name: "Túi đeo chéo nữ",
                imageProducts: [
                    {
                        name: "https://down-bs-vn.img.susercontent.com/vn-11134216-7ras8-m1f4tydj1wt400_tn.webp",
                    },
                ],
                price: 400000,
                sale: 12,
                star: 4,
                flashSaleDetail: null,
            },
            {
                id: 5,
                name: "Túi đeo chéo nữ",
                imageProducts: [
                    {
                        name: "https://down-bs-vn.img.susercontent.com/vn-11134216-7ras8-m1f4tydj1wt400_tn.webp",
                    },
                ],
                price: 400000,
                sale: 12,
                star: 4,
                flashSaleDetail: null,
            },
        ],
    };
    useEffect(() => {
        fetchDataSelectAll();
        console.log(data_ProducAll);
    }, []);

    const fetchDataSelectAll = async () => {
        const id_account = sessionStorage.getItem("id_account") || 0;
        // await axios.get("http://localhost:8080/api/v1/user/home/selectall?id_Shop=" + id_account + "&page=" + currentPage)
        await axios.get("http://localhost:8080/api/v1/user/actions_product_category")
            .then(response => {
                setData_ProducAll(response.data.result);
                // if (currentPage > 0 && currentPage < totalPages) {
                //     setData_ProducAll((prev) => [...prev, ...response.data.result?.datas]);
                // } else if (currentPage == 0) {
                //     setData_ProducAll(response.data.result?.datas);
                // }
                // setTotalPages(response.data.result?.totalPages);
            }).catch(error => {
                setData_ProducAll(data_Products1.datas);
                console.log("fetch selectall error " + error);
            });
    };


    const tabs = ["Xu Hướng Theo Ngày", "Sách HOT - Giảm Sốc", "Bestseller Ngoại Văn"];

    const itemsPerSlide = 4;
    const totalSlides = Math.ceil(data_ProducAll.length / itemsPerSlide);

    // Handle Next/Prev button click
    const handleCarousel = (direction) => {
        if (direction === "next" && carouselIndex < totalSlides - 1) {
            setCarouselIndex(carouselIndex + 1);
        }
        if (direction === "prev" && carouselIndex > 0) {
            setCarouselIndex(carouselIndex - 1);
        }
    };

    return (
        <div className="w-full  max-w-screen-lg mx-auto mt-6  bg-red-300 rounded-lg">
            {/* Tabs w-full h-[500px] text-red-500*/}
            <div className="flex justify-between p-3 border-b ">
                <h1 className="text-2xl font-bold text-slate-800"> XU HƯƠNG MUA SẮM</h1>
            </div>
            {/* <div className="bg-blue-50"> */}
            <div className="bg-slate-50">


                <div className="  flex justify-between border-b bg-slate-50">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 ${activeTab === index
                                ? "border-b-2 border-red-500 text-red-500 font-semibold"
                                : "text-gray-600 hover:text-red-500 font-medium"
                                }`}
                            onClick={() => setActiveTab(index)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Carousel Wrapper */}
                {activeTab === 0 && (
                    <div className="relative mt-4">
                        {/* Left Button */}
                        <button
                            className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 z-10 ${carouselIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            onClick={() => handleCarousel("prev")}
                            disabled={carouselIndex === 0}
                        >
                            &#8592;
                        </button>

                        {/* Carousel */}
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-300"
                                style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                            >
                                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                    <div
                                        key={slideIndex}
                                        className="grid grid-cols-4 gap-4 w-full"
                                        style={{ minWidth: "100%" }}
                                    >
                                        {data_ProducAll
                                            .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                                            .map((product) => (
                                                <ProductCardStyleOne key={product.id} datas={product} />
                                            ))}
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Right Button */}
                        <button
                            className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 z-10 ${carouselIndex === totalSlides - 1 ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            onClick={() => handleCarousel("next")}
                            disabled={carouselIndex === totalSlides - 1}
                        >
                            &#8594;
                        </button>
                    </div>
                )}
                {activeTab === 1 && (
                    <div>
                        {/* Nội dung cho tab 2 */}
                        <h1>Sách HOT - Giảm Sốc</h1>
                    </div>
                )}
                {activeTab === 2 && (
                    <div>
                        {/* Nội dung cho tab 3 */}
                        <h1>Bestseller Ngoại Văn</h1>
                    </div>
                )}
                <div className="text-center border-b p-5">
                    xem thêm
                </div>
            </div>
        </div>
    );
};

export default ProductCarousel;