import React, { useEffect, useState, useRef } from 'react';
import SectionStyleThree from '../Helpers/SectionStyleThree';
import Voucher from '../Shop/voucher';
import ShopInfo from '../Shop/shopinfo';
import ErrorThumb from '../../components/FourZeroFour'
import Layout from "../Partials/Layout";
import homeShopService from "../../service/Seller/homeShopService";
import BeatLoader from "react-spinners/BeatLoader";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from 'react-router-dom';
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
            id: 1,
            name: 'Áo sơ mi nam cao cấp',
            imageProducts: [
                {
                    name: 'https://down-bs-vn.img.susercontent.com/vn-11134216-7ras8-m1f4tydj1wt400_tn.webp',
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
            name: 'Giày thể thao nam',
            imageProducts: [
                {
                    name: 'https://down-bs-vn.img.susercontent.com/vn-11134216-7ras8-m1f4tydj1wt400_tn.webp',
                },
            ],
            price: 800000,
            sale: 10,
            star: 5,
            flashSaleDetail: null,
        },
        {
            id: 3,
            name: 'Túi xách nữ thời trang',
            imageProducts: [
                {
                    name: 'https://down-bs-vn.img.susercontent.com/vn-11134216-7ras8-m1f4tydj1wt400_tn.webp',
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
            name: 'Kính mát nam',
            imageProducts: [
                {
                    name: 'https://down-bs-vn.img.susercontent.com/vn-11134216-7ras8-m1f4tydj1wt400_tn.webp',
                },
            ],
            price: 200000,
            sale: 5,
            star: 4,
            flashSaleDetail: null,
        },
        {
            id: 5,
            name: 'Tai nghe Bluetooth',
            imageProducts: [
                {
                    name: 'https://down-bs-vn.img.susercontent.com/vn-11134216-7ras8-m1f4tydj1wt400_tn.webp',
                },
            ],
            price: 150000,
            sale: 50,
            star: 4,
            flashSaleDetail: {
                sale: 30,
            },
        },
        {
            id: 6,
            name: 'Đồng hồ thông minh',
            imageProducts: [
                {
                    name: 'https://down-bs-vn.img.susercontent.com/vn-11134216-7ras8-m1f4tydj1wt400_tn.webp',
                },
            ],
            price: 1000000,
            sale: 15,
            star: 4,
            flashSaleDetail: null,
        },
        {
            id: 7,
            name: 'Chân váy xếp ly nữ',
            imageProducts: [
                {
                    name: 'https://down-bs-vn.img.susercontent.com/vn-11134216-7ras8-m1f4tydj1wt400_tn.webp',
                },
            ],
            price: 250000,
            sale: 20,
            star: 5,
            flashSaleDetail: {
                sale: 10,
            },
        },
        {
            id: 8,
            name: 'Laptop gaming',
            imageProducts: [
                {
                    name: 'https://down-bs-vn.img.susercontent.com/vn-11134216-7ras8-m1f4tydj1wt400_tn.webp',
                },
            ],
            price: 15000000,
            sale: 5,
            star: 4,
            flashSaleDetail: {
                sale: 10,
            },
        },
    ],
};


export default function ShopHome() {
    const [shopInfo, setShopInfo] = useState({});
    const [vouchers, setVouchers] = useState([]);  // Initialize as an empty array
    const [data_Products, setData_ProducAll] = useState([]); 
    const [loading, setLoading] = useState(false);
    const local = useLocation();
    const query = new URLSearchParams(local.search);
    const shopID = query.get("shopID");

    // const getIdAccountFromSession = () => {
    //     const user = sessionStorage.getItem("user");

    //     if (user) {
    //         const userObject = JSON.parse(user);
    //         return userObject; 
    //     }

    //     return null;
    // };

    const fetchDataSelectAll = async () => {
        const id_account = sessionStorage.getItem("id_account") || 0;
        await axios.get("http://localhost:8080/api/v1/user/home/selectall?id_Shop=" + id_account).then(response => {
            setData_ProducAll(response.data.result);
        }).catch(error => {
            setData_ProducAll(data_Products1);
            console.log("fetch selectall error " + error);
        })
    }
    useEffect(() => {
        // fetchDataFlashSale();
        fetchDataSelectAll();
    }, [location]);

    const fetchShopInfo = async () => {
        try {
            setLoading(true);
            const iduser = sessionStorage.getItem("id_account");
            const response = await homeShopService.fetchShopInfo(shopID, iduser);
            if (response.data && response.data.result) {
                setShopInfo(response.data.result);
            } else {
                throw new Error("Không có dữ liệu từ API");
            }
        } catch (error) {
            console.error(error.message); // Log lỗi để debug
            setShopInfo(shopDataEX); // Sử dụng dữ liệu mẫu
            toast.warn('Không thể tải thông tin cửa hàng, đang sử dụng dữ liệu mẫu.');
        } finally {
            setLoading(false);
        }
    };

    const fetchVoucherShopHome = async () => {
        try {
            setLoading(true);
            const response = await homeShopService.fetchVoucherShopHome(shopID);
            if (response.data && response.data.result && response.data.result.Voucher) {
                setVouchers(response.data.result.Voucher);
            } else {
                throw new Error("Không có dữ liệu voucher từ API");
            }
        } catch (error) {
            console.error(error.message); // Log lỗi để debug
            setVouchers(vouchersdfEAsd); // Sử dụng dữ liệu mẫu
            toast.warn('Không thể tải danh sách voucher, đang sử dụng dữ liệu mẫu.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShopInfo();
        fetchVoucherShopHome();
    }, [])



    useEffect(() => {
        console.log("vouchers", vouchers);
    }, [vouchers])

    useEffect(() => {
        console.log("shopInfo", shopInfo);
    }, [shopInfo])


    return (
        <Layout childrenClasses="pt-0 pb-0">
            <ToastContainer />
            <div className="flex flex-col  gap-5   ">
                <div className="bg-white py-5">
                    {shopInfo && Object.keys(shopInfo).length > 0 && (
                        <ShopInfo shopData={shopInfo} />
                    )}
                </div>
                <div className=" container-x mx-auto mb-3">
                    {vouchers.length > 0 ? (
                        <Voucher vouchers={vouchers} />
                    ) : null}
                </div>
                <div className="flex-col align-middle justify-center">
                    <div className="max-w-[1216px] mx-auto px-2 sm:px-6">
                        <h1 className="text-gray-700">SẢN PHẨM</h1>
                    </div>
                    <div className="mb-1 text-gray-300">
                        <SectionStyleThree
                            className="new-products mb-[60px] "
                            seeMoreUrl="/all-products"
                            products={data_Products}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
