import React, { useEffect, useState, useCallback, useRef } from "react";
import ProductCardStyleOne from "../components/Helpers/Cards/ProductCardStyleOne";
import axios from "axios";

const sampleData = {
    xuhuong: [
        {
            id: 1,
            name: "Sách mẫu 1",
            price: 100000,
            sale: 10,
            writerName: "Tác giả 1",
            publishingCompany: "NXB 1",
            quantity: 100,
            active: true,
            delete: false
        },
        // Add more sample items here...
    ],
    hot: [
        {
            id: 2,
            name: "Sách mẫu 2",
            price: 150000,
            sale: 15,
            writerName: "Tác giả 2",
            publishingCompany: "NXB 2",
            quantity: 80,
            active: true,
            delete: false
        },
        // Add more sample items here...
    ],
    bestseller: [
        {
            id: 3,
            name: "Sách mẫu 3",
            price: 200000,
            sale: 20,
            writerName: "Tác giả 3",
            publishingCompany: "NXB 3",
            quantity: 120,
            active: true,
            delete: false
        },
        // Add more sample items here...
    ]
};

const ProductCarousel = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [data, setData] = useState({
        xuhuong: [],
        hot: [],
        bestseller: [],
    });
    const [currentPages, setCurrentPages] = useState({
        xuhuong: 0,
        hot: 0,
        bestseller: 0,
    });
    const [hasMorePages, setHasMorePages] = useState({
        xuhuong: true,
        hot: true,
        bestseller: true,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [autoScroll, setAutoScroll] = useState(false);
    const autoScrollIntervalRef = useRef(null);

    const itemsPerSlide = 4;
    const itemsPerPage = 8;
    const autoScrollInterval = 5000; // 5 seconds

    const tabs = ["Xu Hướng Theo Ngày", "Sách HOT - Giảm Sốc", "Bestseller Ngoại Văn"];

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                await Promise.all([
                    fetchData("xuhuong", 0),
                    fetchData("hot", 0),
                    fetchData("bestseller", 0),
                ]);
            } catch (error) {
                console.error("Error fetching initial data:", error);
                useSampleData("xuhuong");
                useSampleData("hot");
                useSampleData("bestseller");
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        if (autoScroll) {
            autoScrollIntervalRef.current = setInterval(() => {
                handleCarousel("next");
            }, autoScrollInterval);
        }

        return () => {
            if (autoScrollIntervalRef.current) {
                clearInterval(autoScrollIntervalRef.current);
            }
        };
    }, [autoScroll, carouselIndex]);

    const fetchData = async (tab, page) => {
        const account_id = sessionStorage.getItem("id_account") || 0;
        let url;
        const url_host = import.meta.env.VITE_API_BASEURL;

        if (tab === "xuhuong") {
            url = `${url_host}/api/v1/user/actions_product_category1_data?account_id=${account_id}&page=${page}`;
        } else if (tab === "hot") {
            url = `${url_host}/api/v1/user/actions_product_category1?account_id=${account_id}&page=${page}`;
        } else if (tab === "bestseller") {
            url = `${url_host}/api/v1/user/actions_product_category1_Bestseller?account_id=${account_id}&page=${page}`;
        }

        try {
            const response = await axios.get(url);
            if (response.data.code === 0) {
                const newProducts = response.data.result.content || [];

                setData((prev) => ({
                    ...prev,
                    [tab]: [...prev[tab], ...newProducts],
                }));

                setHasMorePages((prev) => ({
                    ...prev,
                    [tab]: !response.data.result.last,
                }));

                setCurrentPages((prev) => ({
                    ...prev,
                    [tab]: response.data.result.number,
                }));
            } else {
                console.error(`Error fetching data for tab ${tab}: ${response.data.message}`);
                useSampleData(tab);
            }
        } catch (error) {
            console.error(`Error fetching data for tab ${tab}:`, error);
            useSampleData(tab);
        }
    };

    const useSampleData = (tab) => {
        setData((prev) => ({
            ...prev,
            [tab]: sampleData[tab],
        }));
        setHasMorePages((prev) => ({
            ...prev,
            [tab]: false,
        }));
        setCurrentPages((prev) => ({
            ...prev,
            [tab]: 0,
        }));
    };

    const handleTabClick = (index) => {
        setActiveTab(index);
        setCarouselIndex(0);
    };

    const handleCarousel = useCallback(async (direction) => {
        const tab = activeTab === 0 ? "xuhuong" : activeTab === 1 ? "hot" : "bestseller";
        const totalSlides = Math.ceil(data[tab].length / itemsPerSlide);

        if (direction === "next") {
            if (carouselIndex < totalSlides - 1) {
                setCarouselIndex(carouselIndex + 1);
            } else if (hasMorePages[tab]) {
                setIsLoading(true);
                const nextPage = currentPages[tab] + 1;
                await fetchData(tab, nextPage);
                setCarouselIndex(carouselIndex + 1);
                setIsLoading(false);
            } else {
                setCarouselIndex(0); // Loop back to the first slide
            }
        }

        if (direction === "prev") {
            if (carouselIndex > 0) {
                setCarouselIndex(carouselIndex - 1);
            } else {
                setCarouselIndex(totalSlides - 1); // Loop to the last slide
            }
        }
    }, [activeTab, carouselIndex, currentPages, data, hasMorePages]);

    const getCurrentTabData = () => {
        return activeTab === 0 ? data.xuhuong : activeTab === 1 ? data.hot : data.bestseller;
    };

    const currentTabData = getCurrentTabData();
    const totalSlides = Math.ceil(currentTabData.length / itemsPerSlide);

    return (
        <div className="section-style-one ml-27 mr-27 first-letter:rounded-lg shadow-2">
            <div className="section-wrapper w-full  bg-white">
                <div className="container-x mx-auto pb-10 ">
                    {/* <div className=" bg-red-500  section-title flex justify-between  items-center mb-5">
                        <h1 className="text-2xl font-bold text-white">XU HƯỚNG MUA SẮM</h1>
                    </div> */}


                    <div className="section-content">


                        <div className="bg-white products-section w-full rounded-lg">
                            <div className="flex justify-between border-b bg-white">
                                {tabs.map((tab, index) => (
                                    <button
                                        key={index}
                                        className={`px-4 py-2 ${activeTab === index
                                            ? "border-b-2 border-red-500 text-red-500 font-semibold"
                                            : "text-gray-600 hover:text-red-500 font-medium"
                                            }`}
                                        onClick={() => handleTabClick(index)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="relative mt-4 pb-4">
                                <button
                                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 z-10 ${carouselIndex === 0 || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => handleCarousel("prev")}
                                    disabled={isLoading}
                                >
                                    &#8592;
                                </button>

                                <div className="overflow-hidden">
                                    <div
                                        className="flex transition-transform duration-300 ease-in-out"
                                        style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                                    >
                                        {Array.from({ length: Math.ceil(currentTabData.length / itemsPerSlide) }).map((_, slideIndex) => (
                                            <div
                                                key={slideIndex}
                                                className="w-full flex-shrink-0 mb-1"
                                            >

                                                <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
                                                    {/* <div className="grid grid-cols-4 gap-4"> */}
                                                    {currentTabData
                                                        .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                                                        .map((product) => (
                                                            <div key={product.id} className="w-full">
                                                                <ProductCardStyleOne datas={product} />
                                                            </div>
                                                        ))}
                                                    {/* </div> */}
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>

                                <button
                                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 z-10 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => handleCarousel("next")}
                                    disabled={isLoading}
                                >
                                    &#8594;
                                </button>

                                <div className="flex justify-center gap-2 mt-4">
                                    {Array.from({ length: Math.ceil(currentTabData.length / itemsPerSlide) }).map((_, index) => (
                                        <button
                                            key={index}
                                            className={`w-2 h-2 rounded-full ${index === carouselIndex ? 'bg-red-500' : 'bg-gray-300'}`}
                                            onClick={() => setCarouselIndex(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductCarousel;

