import { useState } from "react";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import CountDown from "../Helpers/CountDown";
import DataIteration from "../Helpers/DataIteration";
export default function FlashSale({ products, lastDate, totalProducts }) {
    const { showHour, showMinute, showSecound } = CountDown(lastDate);
    const [loading, setLoading] = useState(true);
    return (
        <div className={`w-full lg:h-auto`}>
            <div className="container-x mx-auto h-full">
                <div className="pt-5">
                    {/* Flash Sale Header */}
                    <div className="container mx-auto mb-6 bg-white p-5 rounded-lg pl-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <h2 className="text-2xl font-bold text-red-600">FLASH SALE</h2>
                                <p className="ml-5">Kết thúc trong</p>
                                <div className="flex items-center ml-5 space-x-2">
                                    <p className="bg-black-2 text-white rounded-md w-8 h-8 flex items-center justify-center">{showHour < 10 ? "0" + showHour : showHour}</p>
                                    <p className="bg-black-2 text-white rounded-md w-8 h-8 flex items-center justify-center">{showMinute < 10 ? "0" + showMinute : showMinute}</p>
                                    <p className="bg-black-2 text-white rounded-md w-8 h-8 flex items-center justify-center">{showSecound < 10 ? "0" + showSecound : showSecound}</p>

                                </div>
                            </div>
                            <div>
                                <Link to="/flash-sale" className="text-sm text-red-500 no-underline flex items-center">
                                    Xem tất cả
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                                        <path stroke-linecap="round"  stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </Link>
                            </div>
                            {/* <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-2">
                                    <div className="text-center">
                                        <span className="text-lg font-bold">{showHour}</span>
                                        <p className="text-xs">tiếng</p>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-lg font-bold">{showMinute}</span>
                                        <p className="text-xs">phút</p>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-lg font-bold">{showSecound}</span>
                                        <p className="text-xs">giây</p>
                                    </div>
                                </div>
                                <Link to="/flash-sale" className="text-sm text-red-500 underline">
                                    Xem tất cả
                                </Link>
                            </div> */}
                        </div>
                    </div>

                    {/* Flash Sale Items Grid */}
                    <div className="container mx-auto grid xl:grid-cols-4  grid-cols-2 sm:grid-cols-3 gap-4">
                        {/* {saleItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="border rounded-lg p-4 shadow-md relative group hover:shadow-xl transition-shadow duration-300"
                                >
                                    <Link to={`/product/${item.id}`}>
                                        <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <h3 className="text-sm font-semibold text-gray-800 mb-2">
                                            {item.name}
                                        </h3>
                                        <div className="flex justify-between items-center">
                                            <p className="text-red-500 font-bold">${item.discountPrice}</p>
                                            <p className="text-gray-500 line-through text-xs">
                                                ${item.originalPrice}
                                            </p>
                                        </div>
                                    </Link>

                                
                                    <div className="mt-3">
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="bg-red-500 h-full"
                                                style={{ width: `${item.soldPercent}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Sold: {item.soldPercent}%</p>
                                    </div>
                                </div>
                            ))} */}


                        <DataIteration datas={products} startLength={0} endLength={products?.length}>
                            {({ datas }) => (
                                <div data-aos="fade-up" key={datas.id} className="item mb-10">
                                    <LazyLoad
                                        // once={true}
                                        key={datas?.product?.id}
                                        height={100}
                                        offset={[-100, 100]}
                                        placeholder={<div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                                            <div class="animate-pulse flex space-x-4">
                                                <div class="flex-1 space-y-3 py-1">
                                                    <div class="rounded-none bg-slate-700 h-[165px] w-full"></div>
                                                    <div class="h-5 bg-slate-700 rounded"></div>
                                                    <div class="h-5 bg-slate-700 rounded"></div>
                                                    <div class="space-y-3">
                                                        <div class="grid grid-cols-4 gap-4">
                                                            <div class="h-5 bg-slate-700 rounded col-span-2"></div>
                                                            <div class="h-5 bg-slate-700 rounded col-span-2"></div>
                                                        </div>
                                                        {/* <div class="h-2 bg-slate-700 rounded"></div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                    >

                                        <ProductCardStyleOne datas={datas.product} />

                                    </LazyLoad>
                                </div>
                            )}
                        </DataIteration>
                    </div>
                </div>
            </div>
        </div>
        // </div>
    );
}
