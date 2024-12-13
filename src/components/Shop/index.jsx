import React, { useEffect, useState, useRef } from 'react';
import SectionStyleThreeHomeShop from '../Helpers/SectionStyleThreeHomeShop';
import Voucher from '../Shop/voucher';
import TopProducts from '../Shop/topProducts';
import ShopInfo from '../Shop/shopinfo';
import ErrorThumb from '../../components/FourZeroFour'
import Layout from "../Partials/Layout";
import homeShopService from "../../service/Seller/homeShopService";
import BeatLoader from "react-spinners/BeatLoader";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useParams } from 'react-router-dom';
import axios from "axios";

const shopDataEX = {
    "rating": {
        "totalReviews": 10000,
        "averageStars": 4.4,
        "totalStars": 5
    },

    "shopDataEX": {
        "idSeller": 8,
        "avatar": "https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/1_W35QUSvGpcLuxPo3SRTH4w.png?alt=media",
        "background": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpV1PD_FQJmavk9gMA--dVtlHhEZJ9VV3oDg&s",
        "shopName": "Cong ty Anh Vang",
        "district": "789 Oak Street",
        "averageStarRating": null,
        "numberOfFollowers": 167,
        "numberOfProducts": 111,
        "createAtSeller": "2023-11-19T17:00:00.000+00:00",
        "participationTime": 365,
        "trackingNumber": 8,
        "shopCancellationRate": 8,
        "isSaved": true

    }
};

const vouchersdfEAsd = [
    {
        "id": 2,
        "name": "Voucher Giảm Giá 20%",
        "note": "Giảm 20% cho đơn hàng trên 300k",
        "totalPriceOrder": 300000,
        "sale": 20,
        "quantity": 30,
        "minOrder": 0,
        "dateStart": "2024-10-15",
        "dateEnd": "2025-11-15",
        "typeVoucher": {
            "id": 2,
            "name": "Voucher combo"
        },
        "account": {},
        "delete": false
    },
    {
        "id": 1,
        "name": "Voucher Giảm Giá 10%",
        "note": "Giảm 10% cho đơn hàng trên 200k",
        "totalPriceOrder": 200000,
        "sale": 10,
        "quantity": 50,
        "minOrder": 0,
        "dateStart": "2024-10-01",
        "dateEnd": "2024-11-31",
        "typeVoucher": {
            "id": 1,
            "name": "Voucher miễn phí vận chuyển"
        },
        "account": {},
        "delete": false
    }
]

const data_Products1 = {
    datas: [

        {
            id: 2,
            name: 'Không gia đình',
            imageProducts: [
                {
                    name: 'https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/evalue%2F330dc5d3-7e6d-40f9-8840-6d47b4fffdd5-khong_gia_dinh_8ae2708ff5.jpg?alt=media',
                },
            ],
            price: 800000,
            sale: 10,
            star: 5,
            flashSaleDetail: null,
        },
        {
            id: 3,
            name: 'Ra bờ suối ngắm hoa kèn hồng',
            imageProducts: [
                {
                    name: 'https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/evalue%2Fa4395187-3b24-42c4-920e-dd577cc6101b-ra-bo-suoi-ngam-hoa-ken-hong.jpg?alt=media',
                },
            ],
            price: 350000,
            sale: 30,
            star: 3,
            flashSaleDetail: {
                sale: 25,
            },
        },
        {
            id: 4,
            name: 'Hoàng tử  bé',
            imageProducts: [
                {
                    name: 'https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/evalue%2F860b160b-317e-4c96-b70c-bd4591d651d8-HTB-review-sach.jpg?alt=media',
                },
            ],
            price: 200000,
            sale: 5,
            star: 4,
            flashSaleDetail: null,
        },
        {
            id: 5,
            name: 'Đắc nhân tâm',
            imageProducts: [
                {
                    name: 'https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/avatar%2Fd4cdfa62-d6dc-4ba3-b430-f204182b8284-phan-4-dac-nhan-tam-1024x1024.jpg?alt=media',
                },
            ],
            price: 150000,
            sale: 50,
            star: 4,
            flashSaleDetail: {
                sale: 30,
            },
        },


    ],
};


export default function ShopHome() {
    const [idUser, setIdUser] = useState({});
    const [shopInfo, setShopInfo] = useState({});
    const [vouchers, setVouchers] = useState([]);  // Initialize as an empty array
    const [products, setProducts] = useState([]);  // Initialize as an empty array
    const [dataTopProducts, setDataTopProducts] = useState([]);  // Initialize as an empty array
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Có còn sản phẩm để tải không
    const [page, setPage] = useState(1); // Trang hiện tại
    const [isFollowed, setIsFollowed] = useState(false);
    const [size, setSize] = useState(8);
    const local = useLocation();
    const query = new URLSearchParams(local.search);
    const { Id } = useParams();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchDataSelectAll = async () => {
        const id_account = sessionStorage.getItem("id_account") || 0;
        await axios.get("http://localhost:8080/api/v1/user/home/selectall?id_Shop=" + id_account).then(response => {
            setProducts(response.data.result);
        }).catch(error => {
            setProducts(data_Products1);
            console.log("fetch selectall error " + error);
        })
    }

    const fetchShopInfo = async () => {
        try {
            setIsLoading(true);
            const idAccountUser = sessionStorage.getItem("id_account");
            setIdUser(idAccountUser)
            const response = await homeShopService.fetchShopInfo(Id, idAccountUser);
            if (response.data.result) {
                const data = response.data.result;
                data != null ? setShopInfo(data) : setShopInfo(null);
                setIsFollowed(response.data.result.shopDataEX.isFollowed);
                setIsLoading(true);
            } else {
                setShopInfo(data);
                ;
                throw new Error('Không có dữ liệu');
            }
        } catch (error) {
            ;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchVoucherShopHome = async () => {
        try {
            setIsLoading(true);
            const response = await homeShopService.fetchVoucherShopHome(Id);
            console.log(response);
            if (response.data.result) {
                const data = response.data.result.Voucher;
                setVouchers(data);
                setIsLoading(true);
            } else {
                throw new Error("Không có dữ liệu voucher từ API");
            }
        } catch (error) {
            setVouchers(vouchersdfEAsd);
            ;
        } finally {
            setIsLoading(false);
        }
    }

    const fetchTopProducts = async () => {
        // setVouchers(vouchersdfEAsd);
        try {
            setIsLoading(true);
            const response = await homeShopService.fetchTopProducts(Id);
            if (response.data.result) {
                const data = response.data.result;
                setProducts(data);
                setIsLoading(true);
            } else {
                throw new Error('Không có dữ liệu');
            }
        } catch (error) {
            setProducts(data_Products1);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchProductShopHome = async (currentSize) => {
        // setVouchers(vouchersdfEAsd);
        try {
            // setIsLoading(true);
            const response = await homeShopService.fetchProductShopHome(Id, currentSize);
            if (response.data.result) {
                const newProducts = response.data.result;
                console.log("newProducts", newProducts);

                setProducts(newProducts);
                setHasMore(newProducts.datas.length >= currentSize)
            } else {
                throw new Error('Không có dữ liệu');
            }
        } catch (error) {
            setProducts(data_Products1);
        } finally {
            setIsLoading(false);
        }
    }

    const handleLoadMore = () => {
        if (hasMore && !isLoading)
            setSize((prevSize) => prevSize + 8);
    };

    useEffect(() => {
        fetchShopInfo();
        fetchVoucherShopHome();
        fetchProductShopHome();
        fetchTopProducts();
    }, [])


    useEffect(() => {
        fetchProductShopHome(size);
    }, [size])

    useEffect(() => {
        console.log("vouchers", vouchers);
    }, [vouchers])

    useEffect(() => {
        console.log("shopInfo", shopInfo);
    }, [shopInfo])

    useEffect(() => {
        // Cập nhật visibleData mỗi khi visibleProducts thay đổi
        console.log("products SectionStyleThreeHomeShop", products);
    }, [products]);


    useEffect(() => {
        // fetchDataFlashSale();
        fetchDataSelectAll();
    }, [location]);


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen ">
                <BeatLoader color="#56A0D3" />
            </div>
        );
    }

    // if (!shopInfo || Object.keys(shopInfo).length === 0) return (
    //     <ErrorThumb></ErrorThumb>
    // )

    return (
        <Layout childrenClasses="pt-0 pb-0">
            <ToastContainer />
            <div className="flex flex-col  gap-5   ">
                <div className="bg-white py-5">
                    {shopInfo && Object.keys(shopInfo).length > 0 && (
                        <ShopInfo shopData={shopInfo} idUser={idUser} />
                    )}
                </div>
                <div className=" container-x mx-auto mb-3">
                    {vouchers.length > 0 ? (
                        <Voucher vouchers={vouchers} />
                    ) : null}
                </div>
                <div className=" container-x mx-auto mb-3">
                    <TopProducts data={dataTopProducts} />
                </div>
                <div className="flex-col align-middle justify-center">
                    <div className="max-w-[1216px] mx-auto px-2 sm:px-6">
                        <h1 className="text-gray-700">SẢN PHẨM</h1>
                    </div>
                    <div className="mb-1 text-gray-300">
                        <SectionStyleThreeHomeShop
                            className="new-products mb-[60px] "
                            seeMoreUrl="/all-products"
                            products={products}
                        />
                    </div>
                    <div className=''>
                        {hasMore && (
                            <div className="flex justify-center mb-10">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={isLoading}
                                    className="load-more border rounded border-[#003EA1] text-[#003EA1] px-20 py-1 bg-white hover:bg-[#003EA1] hover:text-white">
                                    {isLoading ? "Đang tải..." : "Xem thêm"}
                                </button>
                            </div>
                        )}
                        {/* <div className="flex justify-center mb-10">
                            <button
                                onClick={handleLoadMore}
                                className="load-more border rounded border-[#003EA1] text-[#003EA1] px-20 py-1 bg-white hover:bg-[#003EA1] hover:text-white">
                                Xem thêm
                            </button>
                        </div> */}
                    </div>
                </div>

            </div>
        </Layout>


    );
}
