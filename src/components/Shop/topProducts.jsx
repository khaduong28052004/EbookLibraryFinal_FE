import React, { useEffect, useState, useRef } from 'react';
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne.jsx";

export default function topProducts({data}) {
    const datas = [
        {
            imageProducts: [
                { name: "https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/avatar%2Fd4cdfa62-d6dc-4ba3-b430-f204182b8284-phan-4-dac-nhan-tam-1024x1024.jpg?alt=media" } // Link ảnh mẫu
            ],
            review: 4, // Số lượng sao đánh giá
            name: "Sample Product Name", // Tên sản phẩm
            price: "50000", // Giá gốc
            sale: "10", // Giá ưu đãi
        },
        {
            imageProducts: [
                { name: "https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/avatar%2Fd4cdfa62-d6dc-4ba3-b430-f204182b8284-phan-4-dac-nhan-tam-1024x1024.jpg?alt=media" } // Link ảnh mẫu
            ],
            review: 4, // Số lượng sao đánh giá
            name: "Sample Product Name", // Tên sản phẩm
            price: "500000", // Giá gốc
            sale: "1", // Giá ưu đãi
        },
        {
            imageProducts: [
                { name: "https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/avatar%2Fd4cdfa62-d6dc-4ba3-b430-f204182b8284-phan-4-dac-nhan-tam-1024x1024.jpg?alt=media" } // Link ảnh mẫu
            ],
            review: 4, // Số lượng sao đánh giá
            name: "Sample Product Name", // Tên sản phẩm
            price: "500000", // Giá gốc
            sale: "1", // Giá ưu đãi
        }
    ];

    return (
        <div className=" container-x mx-auto gap-5 bg-white py-4">
            <div className="mb-3">
                <h3 className="text-gray-800 font-semibold text-xl">Sản phẩm bán chạy nhất</h3>
            </div>
            <div className="wrapper relative  max-w-full overflow-x-hidden bg-white">
                <div className='w-20% flex gap-10 hover:shadow'>
                    {datas.map((data) => (
                        <ProductCardStyleOne datas={data} />
                    ))}
                </div>
            </div>
        </div >
    );
}
