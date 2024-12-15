import React, { useEffect, useState } from "react";
import ProductCardStyleOne from "../components/Helpers/Cards/ProductCardStyleOne";
import axios from "axios";

const ProductCarousel = () => {
    const [activeTab, setActiveTab] = useState(0); // Tab index
    const [carouselIndex, setCarouselIndex] = useState(0); // Carousel index
    const [data, setData] = useState({
        xuhuong: [],
        hot: [],
        bestseller: [],
    }); // Data for all tabs
    const [currentPages, setCurrentPages] = useState({
        xuhuong: 0,
        hot: 0,
        bestseller: 0,
    }); // Current page for each tab
    const [hasMorePages, setHasMorePages] = useState({
        xuhuong: true,
        hot: true,
        bestseller: true,
    }); // Track additional pages for each tab
    const itemsPerSlide = 4; // Products per slide
    const itemsPerPage = 8; // Items fetched per page

    const tabs = ["Xu Hướng Theo Ngày", "Sách HOT - Giảm Sốc", "Bestseller Ngoại Văn"];

    useEffect(() => {
        // Fetch data for all tabs during initial load
        const fetchInitialData = async () => {
            await Promise.all([
                fetchData("xuhuong", 0),
                fetchData("hot", 0),
                // fetchData("bestseller", 0),
            ]);
        };

        fetchInitialData();
    }, []);

    // Fetch data for a specific tab and page
    const fetchData = async (tab, page) => {
        const account_id = sessionStorage.getItem("id_account") || 0;
        let url;

        if (tab === "xuhuong") {
            url = `http://localhost:8080/api/v1/user/actions_product_category1?account_id=${account_id}&page=${page}`;
        } else if (tab === "hot") {
            url = `http://localhost:8080/api/v1/user/actions_product_category1?account_id=${account_id}&page=${page}`;
            // url = `http://localhost:8080/api/v1/user/actions_hot_books?account_id=${account_id}&page=${page}`;
        } else if (tab === "bestseller") {
            // url = `http://localhost:8080/api/v1/user/actions_bestseller_books?account_id=${account_id}&page=${page}`;
            url = `http://localhost:8080/api/v1/user/actions_product_category1?account_id=${account_id}&page=${page}`;
        }

        try {
            const response = await axios.get(url);
            const newProducts = response.data.result.content || [];

            setData((prev) => ({
                ...prev,
                [tab]: [...prev[tab], ...newProducts],
            }));

            setHasMorePages((prev) => ({
                ...prev,
                [tab]: newProducts.length === itemsPerPage,
            }));
        } catch (error) {
            console.error(`Error fetching data for tab ${tab}:`, error);
        }
    };

    // Handle tab switching
    const handleTabClick = (index) => {
        setActiveTab(index);
        setCarouselIndex(0); // Reset carousel index
    };

    // Handle carousel navigation
    const handleCarousel = (direction) => {
        const tab = activeTab === 0 ? "xuhuong" : activeTab === 1 ? "hot" : "bestseller";
        const totalSlides = Math.ceil(data[tab].length / itemsPerSlide);

        if (direction === "next") {
            if (carouselIndex < totalSlides - 1) {
                setCarouselIndex(carouselIndex + 1);
            } else if (hasMorePages[tab]) {
                const nextPage = currentPages[tab] + 1;
                setCurrentPages((prev) => ({
                    ...prev,
                    [tab]: nextPage,
                }));
                fetchData(tab, nextPage);
            }
        }

        if (direction === "prev" && carouselIndex > 0) {
            setCarouselIndex(carouselIndex - 1);
        }
    };

    // Get data for the currently active tab
    const getCurrentTabData = () => {
        return activeTab === 0 ? data.xuhuong : activeTab === 1 ? data.hot : data.bestseller;
    };

    const currentTabData = getCurrentTabData();
    const totalSlides = Math.ceil(currentTabData.length / itemsPerSlide);

    return (
        <div className="section-style-one ml-27 mr-27 bg-red-500 rounded-lg shadow-2">
            <div className="flex justify-between p-3 border-b">
                <h1 className="text-2xl font-bold text-white">XU HƯỚNG MUA SẮM</h1>
            </div>
            <div className="bg-white rounded-lg">
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

                <div className="relative mt-4">
                    {/* Left Button */}
                    <button
                        className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 z-10 ${carouselIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
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
                                    {currentTabData
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
                        className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 z-10 ${!hasMorePages[activeTab === 0 ? "xuhuong" : activeTab === 1 ? "hot" : "bestseller"] && carouselIndex === totalSlides - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => handleCarousel("next")}
                        disabled={!hasMorePages[activeTab === 0 ? "xuhuong" : activeTab === 1 ? "hot" : "bestseller"] && carouselIndex === totalSlides - 1}
                    >
                        &#8594;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCarousel;
