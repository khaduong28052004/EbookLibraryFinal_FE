import React, { useEffect, useState, useRef } from 'react';
import SectionStyleThree from '../Helpers/SectionStyleThree';
import Voucher from '../Shop/voucher';
import ShopInfo from '../Shop/shopinfo';
import ErrorThumb from '../../components/FourZeroFour'
import Layout from "../Partials/Layout";
import homeShopService from "../../service/Seller/homeShopService";
import BeatLoader from "react-spinners/BeatLoader";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useParams } from 'react-router-dom';

const shopDataEX = {
    "rating": {
        "totalReviews": 10000,
        "averageStars": 4.4,
        "totalStars": 5
    },
    "shopDataEX": {
        "idSeller": 8,
        "avatar": "avatar3.png",
        "background": "background3.png",
        "shopName": "Cong ty Anh Vang",
        "district": "789 Oak Street",
        "averageStarRating": null,
        "numberOfFollowers": 167747,
        "numberOfProducts": 1111111116,
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

const data_Products = {
    data: [
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
    const [loading, setLoading] = useState(false);
    const local = useLocation();
    const query = new URLSearchParams(local.search);
    const { Id } = useParams();

    const fetchShopInfo = async () => {
        try {
            setLoading(true);
            const iduser = sessionStorage.getItem("id_account");
            const response = await homeShopService.fetchShopInfo(Id, iduser);
            if (response.data.result) {
                const data = response.data.result;
                data != null ? setShopInfo(data) : setShopInfo(null);
                setLoading(true);
            } else {
                setShopInfo(data);
                ;
                throw new Error('Không có dữ liệu');
            }
        } catch (error) {
            ;
        } finally {
            setLoading(false);
        }
    }

    const fetchVoucherShopHome = async () => {
        // setVouchers(vouchersdfEAsd);
        try {
            setLoading(true);
            const response = await homeShopService.fetchVoucherShopHome(Id);
            console.log(response);
            if (response.data.result) {
                const data = response.data.result.Voucher;
                setVouchers(data);
                setLoading(true);
            } else {
                throw new Error('Không có dữ liệu');
            }
        } catch (error) {
            setVouchers(vouchersdfEAsd);
            ;
        } finally {
            setLoading(false);
        }
    }


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


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen ">
                <BeatLoader color="#56A0D3" />
            </div>
        );
    }

    if (shopInfo == null) return (
        <ErrorThumb></ErrorThumb>
    )

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
