import React, { useEffect, useState, useRef } from 'react';
import SectionStyleThree from '../Helpers/SectionStyleThree';
import Voucher from '../Shop/voucher';
import ShopInfo from '../Shop/shopinfo';
import ErrorThumb from '../../components/FourZeroFour'
const shopDataEX = {
    shopName: 'Shop Name 123',
    avatarUrl:
        'https://down-bs-vn.img.susercontent.com/vn-11134216-7ras8-m1f4tydj1wt400_tn.webp',
    productsCount: 58,
    rating: {
        score: 5.0,
        totalReviews: 21,
    },
    followers: 58,
    joinDate: '12/2023',
    isFollowed: true,
};

const vouchers = [
    { discount: '1k', minOrder: '1k', expiry: '22/12/2024', isSaved: true },
    { discount: '2k', minOrder: '2k', expiry: '25/12/2024', isSaved: false },
    { discount: '1k', minOrder: '1k', expiry: '20/12/2024', isSaved: true },
    { discount: '2k', minOrder: '2k', expiry: '15/12/2024', isSaved: false },
];

const data_Products = {
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


export default function ShopHome({ shopId }) {

    if (shopId == null) {
        return (
            <> 
            <ErrorThumb/>
            </>
        )
    }

    return (
        <>
            <div className="flex flex-col  gap-5   ">
                <div className="bg-white py-5">
                    <ShopInfo shopData={shopDataEX} />
                </div>
                <div className=" container-x mx-auto mb-3">
                    <Voucher vouchers={vouchers} />
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
        </>
    );
}
