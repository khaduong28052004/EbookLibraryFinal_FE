import React, { useEffect, useState, useRef } from 'react';
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne.jsx";
import homeShopService from "../../service/Seller/homeShopService";
import BeatLoader from "react-spinners/BeatLoader";


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
export default function topProducts({ shopData }) {

    const [products, setProducts] = useState({});  // Initialize as an empty array
    const [isLoading, setIsLoading] = useState(false);
    
    const fetchTop3Products = async () => {        
        try {
            setIsLoading(true);
            const response = await homeShopService.fetchTopProducts(shopData.shopDataEX.idSeller);
            if (response.data.result) {
                const data = response.data.result;
                setProducts(data.datas);
                setIsLoading(true);
            } else {
                throw new Error('Không có dữ liệu');
            }
        } catch (error) {
            // setProducts(data_Products1);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchTop3Products();
    }, [])

    useEffect(() => {
        console.log("product toptop", products);
    }, [products])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen ">
                <BeatLoader color="#56A0D3" />
            </div>
        );
    }

    return (
        <div className=" container-x mx-auto gap-5 bg-white py-4">
            <div className="mb-3">
                <h3 className="text-gray-800 font-semibold text-xl">Sản phẩm bán chạy nhất</h3>
            </div>
            <div className="wrapper relative  max-w-full overflow-x-hidden bg-white">
                <div className='w-20% flex gap-10 hover:shadow'>
                {Array.isArray(products) && products.map((data) => (
                        <ProductCardStyleOne datas={data} />
                    ))}
                </div>
            </div>
        </div >
    );
}
