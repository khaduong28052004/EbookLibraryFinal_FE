import React, { useState, useEffect } from 'react';
import { ArrowLongDownIcon, ArrowPathIcon, ChevronRightIcon, ChevronDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { TrashIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import flashSale from '../../../service/admin/FlashSale';
import flashSaleDetails from '../../../service/admin/FlashSaleDetails';
import ModalFlashSaleDetails from "./Model_FlashSaleCTInsert";
import Modal from "./Modal_ThongBao_NotMail";
import ModalFlashSale from './ModalFlaseSale';
import Pagination from './Pagination';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const TableTwo = () => {

    const [Product, setProduct] = useState([]);
    const [entityFlashSale, setEntityFlashSale] = useState([]);

    const [entityFlashSaleDetails, setEntityFlashSaleDetailst] = useState([]);
    const [dataProduct, setdataProduct] = useState([]);
    const [sortColumnProduct, setSortColumnProduct] = useState('');
    const [sortByProduct, setSortByProduct] = useState(true);
    const [currentPageProduct, setCurrentPageProduct] = useState(0);

    const [ProductNotProduct, setProductNotProduct] = useState([]);
    const [dataProductNotFS, setdataProductNotFS] = useState([]);
    const [sortColumnNotProduct, setSortColumnNotProduct] = useState('');
    const [sortByNotProduct, setSortByNotProduct] = useState(true);
    const [currentPageNotProduct, setCurrentPageNotProduct] = useState(0);

    const [post, setPost] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [status, setStatus] = useState(true);
    const [isOpenModalSP, setIsOpenModalSP] = useState(false);
    const [expandedRowId, setExpandedRowId] = useState(null);
    const [searchItem, setSearchItem] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const flashsale_id = searchParams.get('flashsale_id');


    const handleGoBack = () => {
        navigate(-1);
    };

    const handlePageChangeProduct = (newPage) => {
        if (newPage >= 0 && newPage < dataProduct.totalPages) {
            setCurrentPageProduct(newPage);
            console.log("setCurrentPageProduct: " + newPage);
        }
    };

    const handlePreviousProduct = () => {
        handlePageChangeProduct(currentPageProduct - 1);
    };

    const handleNextProduct = () => {
        handlePageChangeProduct(currentPageProduct + 1);
    };
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < dataProductNotFS.totalPages) {
            setCurrentPageNotProduct(newPage);
            console.log("newPage: " + newPage);
        }
    };

    const handlePrevious = () => {
        handlePageChange(currentPageNotProduct - 1);
    };

    const handleNext = () => {
        handlePageChange(currentPageNotProduct + 1);
    };

    const findFalshSaleById = async () => {
        try {
            const response = await flashSale.findById({ id: flashsale_id });
            const flashSaleData = response.data.result;
            setEntityFlashSale(flashSaleData);
            console.log(flashSaleData);
        } catch (error) {
            console.log("Error: " + error);
        }
    };



    const findListNotFalshSale = async () => {
        try {
            const response = await flashSaleDetails.findListNotFalshSale({ searchItem, id: flashsale_id, page: currentPageNotProduct, size: 5, sortColumn: sortColumnNotProduct, sortBy: sortByNotProduct });
            setdataProductNotFS(response.data.result);
            setCurrentPageNotProduct(response.data.result.pageable.pageNumber);
            console.log(dataProductNotFS);
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    const findListByFlashSale = async () => {
        try {
            const response = await flashSaleDetails.findListByFlashSale({ searchItem, id: flashsale_id, page: currentPageProduct, size: 5, sortColumn: sortColumnProduct, sortBy: sortByProduct });
            setdataProduct(response.data.result);
            setCurrentPageProduct(response.data.result.pageable.pageNumber);
            console.log("setCurrentPageProduct" + currentPageProduct);
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    const deleteFlashSaleDetails = async (id) => {
        try {
            const response = await flashSaleDetails.delete({ id });
            toast.success("Xóa sản phẩm thành công");
            setStatus(!status);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error: " + error);
        }
    }
    const handleConfirm = () => {
        deleteFlashSaleDetails(Product.id);
    };

    useEffect(() => {
        findListNotFalshSale();
        findListByFlashSale();
    }, [searchItem, currentPageProduct, currentPageNotProduct, sortByProduct, sortColumnProduct, sortByNotProduct, sortColumnNotProduct, status]);

    useEffect(() => {
        findFalshSaleById();
    }, []);

    const toggleRow = (id) => {
        if (expandedRowId === id) {
            setExpandedRowId(null); // Nếu đã mở thì click lại sẽ đóng
        } else {
            setExpandedRowId(id); // Mở hàng chi tiết
        }
    };

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <ToastContainer />
            <div className=" grid grid-cols-12 py-6  px-4 md:px-6 xl:px-7.5">
                <form method="POST" className='col-span-6'>
                    <div className="relative pt-3 flex items-center space-x-4">
                        <button className="absolute left-0 top-6 -translate-y-1/2">
                            <svg
                                className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                                    fill=""
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                                    fill=""
                                />
                            </svg>
                        </button>

                        <input
                            value={searchItem}
                            onChange={(e) => {
                                setSearchItem(e.target.value);
                                setCurrentPage(0);
                            }}
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-50" />
                    </div>
                </form>
                <div className='col-span-6 space-x-2 ml-auto flex pb-5'>
                    <button onClick={() => { setIsOpenModalSP(true) }}
                        className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
                    >
                        Flash Sale
                    </button>
                    <button onClick={handleGoBack}
                        className="inline-flex items-center justify-center rounded-md bg-gray-600 py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
                    >
                        Quay Lại
                    </button>

                </div>
                {
                    entityFlashSale && entityFlashSale.dateStart && (entityFlashSale.delete || new Date(entityFlashSale.dateStart).getTime() <= new Date().getTime()) ?

                        (<></>) : (<>
                            <div className='col-span-12'>
                                <table className="w-full border-collapse border border-stroke dark:border-strokedark">
                                    <thead>
                                        <tr className="border-t border-stroke dark:border-strokedark  ${expandedRowId === entity.id ? `bg-slate-100` : `bg-white`}`} onClick={() => toggleRow(entity.id)}">
                                            <th className="py-4.5 px-4 md:px-6 2xl:px-2.5"></th>
                                            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">#</th>
                                            <th
                                                onClick={() => {
                                                    setSortColumnNotProduct("name");
                                                    setSortByNotProduct(!sortByNotProduct);
                                                }}
                                                className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm text-black dark:text-white">Sản phẩm </span>
                                                    <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                                    <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                                                </div>
                                            </th>
                                            <th
                                                onClick={() => {
                                                    setSortColumnNotProduct("account.shopName");
                                                    setSortByNotProduct(!sortByNotProduct);
                                                }}
                                                className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                                <div className="flex items-center gap-1 hidden xl:flex">
                                                    <span className="text-sm text-black dark:text-white ">Shop </span>
                                                    <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                                    <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                                                </div>
                                            </th>
                                            <th
                                                onClick={() => {
                                                    setSortColumnNotProduct("price");
                                                    setSortByNotProduct(!sortByNotProduct);
                                                }}
                                                className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm text-black dark:text-white">Giá ban đầu </span>
                                                    <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                                    <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                                                </div>
                                            </th>
                                            <th
                                                onClick={() => {
                                                    setSortColumnNotProduct("sale");
                                                    setSortByNotProduct(!sortByNotProduct);
                                                }}
                                                className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm text-black dark:text-white">Sale shop </span>
                                                    <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                                    <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                                                </div>
                                            </th>

                                            <th
                                                onClick={() => {
                                                    setSortColumnNotProduct("quantity");
                                                    setSortByNotProduct(!sortByNotProduct);
                                                }}
                                                className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                                <div className="flex items-center gap-1 hidden xl:flex">
                                                    <span className="text-sm text-black dark:text-white">Số lượng kho</span>
                                                    <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                                    <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                                                </div>
                                            </th>
                                            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                                <span className="text-sm text-black dark:text-white truncate w-24">Hành động</span>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {dataProductNotFS?.content?.map((entity, index) => (
                                            <>
                                                <tr key={index} className={`border-t border-stroke dark:border-strokedark ${expandedRowId === entity.id ? `bg-slate-100` : `bg-white`}`} onClick={() => toggleRow(entity.id)}>
                                                    <td
                                                        className="py-4.5 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                                        {expandedRowId === entity.id ? (
                                                            <ChevronDownIcon className='text-sm h-5 w-5 text-black dark:text-white ml-auto' />
                                                        ) : (
                                                            <ChevronRightIcon className='text-sm h-5 w-5 text-black dark:text-white ml-auto' />
                                                        )
                                                        }
                                                    </td>
                                                    <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                                        {dataProductNotFS.pageable.pageNumber * dataProductNotFS.size + index + 1}
                                                    </td>
                                                    <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                                                        <p className="text-sm text-black dark:text-white truncate w-50">{entity.name}</p>
                                                    </td>
                                                    <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                                        <div className="flex items-center gap-1 hidden xl:flex">
                                                            {entity.account.shopName ? entity.account.shopName : ''}
                                                            {/* {(entity.price - (entity.price * entity.sale / 100)).toLocaleString("vi-VN", { style: "currency", currency: "VND" })} */}
                                                        </div>
                                                    </td>

                                                    <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                                        <div className="flex items-center gap-1 hidden xl:flex">
                                                            {entity.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                                        </div>
                                                    </td>
                                                    <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                                        <div className="flex items-center gap-1 hidden xl:flex">
                                                            {entity.sale} %
                                                        </div>
                                                    </td>

                                                    <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                                        <div className="flex items-center gap-1 hidden xl:flex">
                                                            {entity.quantity}
                                                        </div>
                                                    </td>

                                                    <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                                                        <div className="flex space-x-3.5">
                                                            <button onClick={(event) => {
                                                                event.stopPropagation();
                                                                setProductNotProduct(entity);
                                                                setIsOpen(true);
                                                                setPost(true);
                                                            }}>
                                                                <ArrowPathIcon className='w-5 h-5 text-black hover:text-green-600  dark:text-white' />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {expandedRowId === entity.id && (
                                                    <tr>
                                                        <td colSpan="8">
                                                            <div className="p-5 border border-gray-100 hover:bg-slate-100">
                                                                <p><strong>Thông tin chi tiết:</strong></p>
                                                                <div className="pl-20 pt-2 gap-1 grid grid-cols-1">
                                                                    {/* <p>Mã sản phẩm: {entity.id}</p> */}
                                                                    <p>Tên sản phẩm: {entity.name}</p>
                                                                    {/* <p>Giá ban đầu: {(entity.price - (entity.price * entity.sale / 100)).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p> */}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}

                                            </>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination
                                    pageNumber={currentPageNotProduct || 0}
                                    totalPages={dataProductNotFS?.totalPages || 0}
                                    totalElements={dataProductNotFS?.totalElements || 0}
                                    handlePrevious={handlePrevious}
                                    handleNext={handleNext}
                                    setPageNumber={setCurrentPageNotProduct}
                                    size={dataProductNotFS.size}></Pagination>

                            </div>
                        </>)
                }
                <div className='col-span-12'>
                    <table className="w-full border-collapse border border-stroke dark:border-strokedark">
                        <thead>
                            <tr className="border-t border-stroke dark:border-strokedark">
                                <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"></th>
                                <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">#</th>
                                <th
                                    onClick={() => {
                                        setSortColumnProduct("product.name");
                                        setSortByProduct(!sortByProduct);
                                    }}
                                    className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm text-black dark:text-white">Sản phẩm </span>
                                        <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                        <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                                    </div>
                                </th>

                                <th
                                    onClick={() => {
                                        setSortColumnProduct("sale");
                                        setSortByProduct(!sortByProduct);
                                    }}
                                    className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        <span className="text-sm text-black dark:text-white">Sale</span>
                                        <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                        <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                                    </div>
                                </th>
                                <th
                                    onClick={() => {
                                        setSortColumnProduct("quantity");
                                        setSortByProduct(!sortByProduct);
                                    }}
                                    className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        <span className="text-sm text-black dark:text-white">
                                            {entityFlashSale.delete ? 'Số lượng còn lại' : 'Số lượng sale'}
                                        </span>
                                        <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                        <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                                    </div>
                                </th>
                                {entityFlashSale && entityFlashSale.dateStart && (entityFlashSale.delete || new Date(entityFlashSale.dateStart).getTime() <= new Date().getTime()) ?
                                    (<></>) : (<>
                                        <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                            <span className="text-sm text-black dark:text-white truncate w-24">Hành động</span>
                                        </th>
                                    </>)}
                            </tr>
                        </thead>

                        <tbody>
                            {dataProduct?.content?.map((entity, index) => (
                                <>
                                    <tr key={index} className={`border-t border-stroke dark:border-strokedark ${expandedRowId === entity.id ? `bg-slate-100` : `bg-white`}`} onClick={() => toggleRow(entity.id)}>
                                        <td
                                            className="py-4.5 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                            {expandedRowId === entity.id ? (
                                                <ChevronDownIcon className='text-sm h-5 w-5 text-black dark:text-white ml-auto' />
                                            ) : (
                                                <ChevronRightIcon className='text-sm h-5 w-5 text-black dark:text-white ml-auto' />
                                            )
                                            }
                                        </td>
                                        <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                            {dataProduct.pageable.pageNumber * dataProduct.size + index + 1}
                                        </td>
                                        <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                                            <p className="text-sm text-black dark:text-white truncate w-40">{entity.product.name}</p>
                                        </td>

                                        <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                            <div className="flex items-center gap-1 hidden xl:flex">
                                                {entity.sale} %
                                            </div>
                                        </td>
                                        {/* <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                        <div className="flex items-center gap-1 hidden xl:flex">
                                            {(entity.product.price - (entity.product.price * entity.product.sale / 100)).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                        </div>
                                    </td>
                                    <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                        <div className="flex items-center gap-1 hidden xl:flex">
                                            {(entity.product.price - (entity.product.price * entity.product.sale / 100) - (entity.product.price * entity.sale / 100)).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                        </div>
                                    </td> */}
                                        <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                            <div className="flex items-center gap-1 hidden xl:flex">
                                                {entity.quantity === 0 ? 'Đã hết' : entity.quantity}
                                            </div>
                                        </td>
                                        {entityFlashSale && entityFlashSale.dateStart && (entityFlashSale.delete || new Date(entityFlashSale.dateStart).getTime() <= new Date().getTime()) ?
                                            (<></>) : (<>
                                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">

                                                    <div className="flex space-x-3.5">
                                                        <button onClick={(event) => {
                                                            event.stopPropagation();
                                                            setProduct(entity);
                                                            setIsOpenDelete(true);
                                                        }}>
                                                            {!entity.delete ? (<TrashIcon className='w-5 h-5 text-black hover:text-red-600  dark:text-white' />) : (<ReceiptRefundIcon className='w-5 h-5 text-black hover:text-yellow-600  dark:text-white' />)}
                                                        </button>
                                                        <button onClick={(event) => {
                                                            event.stopPropagation();
                                                            setEntityFlashSaleDetailst(entity);
                                                            setIsOpen(true);
                                                            setPost(false);
                                                        }}>
                                                            <ArrowPathIcon className='w-5 h-5 text-black hover:text-green-600  dark:text-white' />
                                                        </button>
                                                    </div>
                                                </td>
                                            </>)}
                                    </tr>
                                    {expandedRowId === entity.id && (
                                        <tr>
                                            <td colSpan="8">
                                                <div className="p-5 border border-gray-100 hover:bg-slate-100">
                                                    <p><strong>Thông tin chi tiết:</strong></p>
                                                    <div className="pl-20 pt-2 gap-1 grid grid-cols-2">
                                                        {/* <p>Mã sản phẩm: {entity.id}</p> */}
                                                        <p className='col-span-2'>Tên sản phẩm: {entity.product.name}</p>
                                                        <p>Shop: {entity.product.account.shopName}</p>
                                                        <p>Số lượng: {entity.product.quantity}</p>
                                                        <p>Giá ban đầu: {(entity.product.price - (entity.product.price * entity.product.sale / 100)).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
                                                        <p>Giá sale: {(entity.product.price - (entity.product.price * entity.product.sale / 100) - (entity.product.price * entity.sale / 100)).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr >
                                    )}

                                </>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        pageNumber={currentPageProduct || 0}
                        totalPages={dataProduct?.totalPages || 0}
                        totalElements={dataProduct?.totalElements || 0}
                        handlePrevious={handlePreviousProduct}
                        handleNext={handleNextProduct}
                        setPageNumber={setCurrentPageProduct}
                        size={dataProduct.size}></Pagination>
                </div>

                <ModalFlashSaleDetails
                    product={ProductNotProduct}
                    flashSaleId={flashsale_id}
                    entity={post ? null : entityFlashSaleDetails}
                    open={isOpen}
                    setOpen={setIsOpen}
                    title={post ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm'}
                    message={post ? 'Bạn chắc chắn muốn thêm sản phẩm này không?' : 'Bạn chắc chắn muốn cập nhật sản phẩm này không?'}
                    confirmText={'Xác Nhận'}
                    cancelText="Thoát"
                    status={status}
                    setStatus={setStatus} />
                <Modal
                    open={isOpenDelete}
                    setOpen={setIsOpenDelete}
                    title={'Xóa Sản Phẩm'}
                    message={'Bạn chắc chắn xóa sản phẩm này không?'}
                    onConfirm={handleConfirm}
                    confirmText={'Xác Nhận'}
                    cancelText="Thoát"
                    icon={
                        <TrashIcon className="h-6 w-6 text-red-600" />
                    }
                    iconBgColor={'bg-red-100'}
                    buttonBgColor={'bg-red-600'} />

                <ModalFlashSale
                    entity={entityFlashSale}
                    status={status}
                    setStatus={setStatus}
                    open={isOpenModalSP}
                    setOpen={setIsOpenModalSP}
                    title="Cập nhật Mới"
                    confirmText="Lưu"
                    cancelText="Hủy"
                />
            </div >
        </div >
    );
};

export default TableTwo;
