import React, { useEffect, useState } from "react";
import ProductCardStyleOne from "../components/Helpers/Cards/ProductCardStyleOneKien";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

    // Fetch data for a specific tab and page
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

    // Handle tab switching
    const handleTabClick = (index) => {
        setActiveTab(index);
        setCarouselIndex(0); // Reset carousel index
    };

    // Handle carousel navigation
    const [isLoading, setIsLoading] = useState(false); // Trạng thái loading

    // Hàm điều hướng carousel
    const handleCarousel = async (direction) => {
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
        <div className="section-style-one ml-27 mr-27 bg-red-500 rounded-lg shadow-3">
            <div className="flex justify-between p-3 border-b">
                <h1 className="text-2xl font-bold text-white">XU HƯỚNG  MUA SẮM</h1>
            </div>
            <div className="bg-white rounded-lg">
                <div className="text-center border-b bg-white ">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 mr-[20px] ml-[20px] ${activeTab === index
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
                    {/* // Nút điều hướng (không thay đổi giao diện, chỉ thêm logic xử lý trạng thái) */}
                    <button
                        className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 z-10 ${carouselIndex === 0 || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => handleCarousel("prev")}
                        disabled={carouselIndex === 0 || isLoading} // Vô hiệu hóa nếu ở đầu hoặc đang tải
                    >
                        &#8592;
                    </button>

                    {/* Carousel */}
                    <div className="overflow-hidden ml-27 mr-27">
                        <div
                            className="flex transition-transform duration-300"
                            style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                        >
                            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                <div
                                    key={slideIndex}
                                    className="grid grid-cols-4 gap-4 w-full "
                                    style={{ minWidth: "100%" }}
                                >
                                    {currentTabData
                                        .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                                        .map((product) => (
                                            // <SectionStyleThree 
                                            // key={product.id}
                                            //     products={product}
                                            //     sectionTitle=""
                                            //     // seeMoreUrl="/all-products"
                                            //     // className="bg-white mb-[60px] ml-27 mr-27 rounded-b-lg"
                                            // />
                                            <ProductCardStyleOne key={product.id} datas={product} />
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Button */}
                    <button
                        className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 z-10 ${(!hasMorePages[activeTab === 0 ? "xuhuong" : activeTab === 1 ? "hot" : "bestseller"] && carouselIndex === totalSlides - 1) || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => handleCarousel("next")}
                        disabled={(!hasMorePages[activeTab === 0 ? "xuhuong" : activeTab === 1 ? "hot" : "bestseller"] && carouselIndex === totalSlides - 1) || isLoading} // Vô hiệu hóa nếu không còn slide hoặc đang tải
                    >
                        &#8594;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCarousel;

