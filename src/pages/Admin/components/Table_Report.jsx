import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ChevronRightIcon, ChevronDownIcon, ArrowLongDownIcon, ArrowLongUpIcon, ArrowPathIcon } from '@heroicons/react/24/solid'

import Modal from "./ModalThongBao";
import accountService from '../../../service/admin/Account';
import productService from '../../../service/admin/Product';
import { ExportExcel } from '../../../service/admin/ExportExcel';
import Pagination from './Pagination';

const TableTwo = () => {
    const [data, setData] = useState([]);

    const [searchItem, setSearchItem] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortBy, setSortBy] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const [contents, setContents] = useState("");
    const [id, setId] = useState('');
    const [option, setOption] = useState("");
    const [optionEntity, setOptionEntity] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const [expandedRowId, setExpandedRowId] = useState(null);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < data.totalPages) {
            setCurrentPage(newPage);
            console.log("currentPage: " + newPage);
        }
    };

    const handlePrevious = () => {
        handlePageChange(currentPage - 1);
    };

    const handleNext = () => {
        handlePageChange(currentPage + 1);
    };


    const findAllAccountReport = async () => {
        try {
            const response = await accountService.findAllAccountReport({ option, page: currentPage, size: 10, searchItem, sortColumn, sortBy });
            console.log("content: " + response.data.result.content);
            setData(response.data.result);
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    const findAllProductReport = async () => {
        try {
            const response = await productService.findAllProductReport({ option, page: currentPage, size: 10, searchItem, sortColumn, sortBy });
            console.log("content: " + response.data.result.content);
            setData(response.data.result);
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    const putStatusAccount = async () => {
        try {
            const response = await accountService.putStatusAccountReport({ id, contents });
            console.log("Mã Code status: " + response.data.code);
            if (response.data.code === 1000) {
                toast.success(response.data.message);
            }
            setContents("");
            findAllAccountReport();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error: " + error);
        }
    }

    const putStatusProduct = async () => {
        try {
            const response = await productService.putStatusProductReport({ id, contents });
            console.log("Mã Code status: " + response.data.code);
            if (response.data.code === 1000) {
                toast.success(response.data.message);
            }
            setContents("");
            findAllProductReport();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error: " + error);
        }
    }

    const handleConfirm = () => {
        if (optionEntity === "product") {
            putStatusProduct();
        } else {
            putStatusAccount();
        }
    };

    useEffect(() => {
        if (optionEntity === "product") {
            findAllProductReport();
        } else {
            findAllAccountReport();
        }
    }, [optionEntity, searchItem, currentPage, sortBy, sortColumn, option]);
    ;
    const handleExport = async () => {
        const sheetNames = ['Danh Sách Báo Cáo'];
        try {
            console.log("data.totalElements: " + data.totalElements);
            if (optionEntity === "product") {
                const response = await productService.findAllProductReport({ option, page: currentPage, size: data.totalElements, searchItem, sortColumn, sortBy });
                if (!response || response.data.result.totalElements === 0) {
                    toast.error("Không có dữ liệu");
                } else {
                    const formattedData = response.data.result.content.map(entity => ({
                        'Mã báo cáo': entity.id,
                        'Tiêu đề': entity.title,
                        'Ngày tạo': entity.createAt,
                        'Ngày tạo': entity.createAt,
                        'Nội dung': entity.content,
                        'Trạng thái': entity.status ? 'Đã phản hồi' : 'Chưa giải quyết',
                        'Mã sản phẩm': entity.product.id,
                        'Tên sản phẩm': entity.product.name,
                        'Giá bán (VNĐ)': entity.product.price.toFixed(0),
                        'Giảm giá (%)': entity.product.sale,
                        'Tác giả': entity.product.writerName,
                        'Nhà xuất bản': entity.product.publishingCompany,
                        'Ngày tạo': new Date(entity.product.createAt).toLocaleString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false, // Sử dụng định dạng 24 giờ
                        }),
                        'Số lượng': entity.product.quantity,
                        'Shop bán': entity.product.account.shopName,
                    }));
                    return ExportExcel("Danh sách báo cáo sản phẩm.xlsx", sheetNames, [formattedData]);
                }
            } else {
                const response = await accountService.findAllAccountReport({ option, page: currentPage, size: data.totalElements === 0 ? 5 : data.totalElements, searchItem, sortColumn, sortBy });
                if (!response || response.data.result.totalElements === 0) {
                    toast.error("Không có dữ liệu");
                } else {
                    const formattedData = response.data.result.content.map(entity => ({
                        'Mã báo cáo': entity.id,
                        'Tiêu đề': entity.title,
                        'Ngày tạo': entity.createAt,
                        'Nội dung': entity.content,
                        'Trạng thái': entity.status ? 'Đã phản hồi' : 'Chưa giải quyết',
                        'Mã shop': entity.shop.id,
                        'Họ tên chủ shop': entity.shop.fullname,
                        'Tên shop': entity.shop.shopName,
                        'Giới tính': entity.shop.gender ? 'Name' : 'Nữ',
                        'Số điện thoại': entity.shop.phone,
                        'Email': entity.shop.email,
                        'Ngày sinh': entity.shop.birthday,
                        'Trạng thái': entity.shop.status ? 'Đang hoạt động' : 'Ngừng hoạt động'
                    }));
                    return ExportExcel("Danh sách báo cáo shop.xlsx", sheetNames, [formattedData]);
                }
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xuất dữ liệu");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const toggleRow = (id) => {
        if (expandedRowId === id) {
            setExpandedRowId(null);
        } else {
            setExpandedRowId(id);
        }
    };

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <ToastContainer />
            <div className="py-6 flex justify-between px-4 md:px-6 xl:px-7.5">
                <form method="POST">
                    <div className="relative pt-3">
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
                                    fill="" />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                                    fill="" />
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
                            className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125" />

                        {/* Dropdown Option */}
                        <select
                            value={optionEntity}
                            onChange={(e) => {
                                setOptionEntity(e.target.value);
                                setCurrentPage(0);
                            }}
                            className="w-50 mr-5 bg-transparent  text-black focus:outline-none dark:text-white"
                        >
                            <option value="macdinh" disabled>Đối tượng lọc</option>
                            <option value="shop">Shop</option>
                            <option value="product">Sách</option>
                        </select>
                        {/* Dropdown Option */}
                        <select
                            value={option}
                            onChange={(e) => {
                                setOption(e.target.value);
                                setCurrentPage(0);
                            }}
                            className="w-50 bg-transparent text-black focus:outline-none dark:text-white"
                        >
                            <option value="macdinh" disabled>Nội dung lọc</option>
                            <option value="chuaphanhoi">Chưa phản hồi</option>
                            <option value="daphanhoi">Đã phản hồi</option>
                        </select>
                    </div>
                </form>
                <form onSubmit={handleSubmit}
                    className="flex items-center space-x-2">
                    <button
                        onClick={handleExport}
                        type="button"
                        className="inline-flex items-center justify-center rounded-md bg-gray-600 py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
                    >
                        Excel
                    </button>
                </form>



            </div>
            <table className="w-full border-collapse border border-stroke dark:border-strokedark">
                <thead>
                    <tr className="border-t border-stroke dark:border-strokedark">
                        <th className="py-4.5 px-4 md:px-6 2xl:px-2.5"></th>
                        <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">#</th>
                        <th
                            onClick={() => {
                                setSortColumn("account.username");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1">
                                <span className="text-sm text-black dark:text-white">Tài khoản </span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "account.username" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "account.username" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("shop.shopName");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white "> {optionEntity === "product" ? "Sản phẩm bị báo cáo" : "Shop bị báo cáo"}</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "shop.shopName" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "shop.shopName" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("title");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white">Tiêu đề</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "title" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "title" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>
                        {/* <th className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-6.5 text-left font-medium">Anh
                        </th> */}
                        <th
                            onClick={() => {
                                setSortColumn("createAt");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Ngày báo cáo</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "createAt" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "createAt" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>

                        <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <span className="text-sm text-black dark:text-white truncate w-24">Hành động</span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {data?.content?.map((entity, index) => (
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
                                    {data.pageable.pageNumber * data.size + index + 1}
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                                    <p className="text-sm text-black dark:text-white truncate w-24">{entity.account.username}</p>
                                </td>

                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {optionEntity === "product" ? entity?.product?.name : entity?.shop?.shopName}
                                    </div>
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {entity.title}
                                    </div>
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {entity.createAt}
                                    </div>
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                                    <div className="flex space-x-3.5">
                                        <button onClick={(event) => {
                                            event.stopPropagation();
                                            setId(entity.id);
                                            setIsOpen(true);
                                        }}>
                                            {entity.status ? (<p className=' inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-success text-success'>Đã phản hồi</p>) : (<button
                                                className=" inline-flex items-center justify-center rounded-md bg-green-600 py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
                                            >Phản hồi</button>)}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            {expandedRowId === entity.id && (
                                <tr>
                                    <td colSpan="9">
                                        <div className="p-5 border border-gray-100 hover:bg-slate-100">
                                            <p><strong>Thông tin chi tiết:</strong></p>
                                            <div className="pl-20 pt-2 gap-3 grid grid-cols-2">
                                                <p>Họ tên người báo cáo: {entity.account.fullname}</p>
                                                <p>Email người báo cáo: {entity.account.email}</p>
                                                <p className='flex flex-wrap gap-2'>Ảnh: {optionEntity === "product" ?
                                                    (entity?.imageReportProducts?.length > 0 ?
                                                        entity.imageReportProducts.map((entity, index) => (
                                                            <img className='w-[50px] h-[60px] object-cover' src={entity.src} alt="image" key={index} />
                                                        )) :
                                                        <span className="text-gray-500">No images</span>
                                                    ) :
                                                    (entity?.imageAccountReports?.length > 0 ?
                                                        entity.imageAccountReports.map((entity, index) => (
                                                            <img className='w-[50px] h-[60px] object-cover' src={entity.src} alt="image" key={index} />
                                                        )) :
                                                        <span className="text-gray-500">No images</span>
                                                    )
                                                }</p>
                                                <p>Nội dung: {entity.content}</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody >
            </table>
            <Pagination
                pageNumber={currentPage}
                totalPages={data?.totalPages}
                totalElements={data?.totalElements}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                setPageNumber={setCurrentPage}
                size={data.size}></Pagination>

            <Modal
                content={contents}
                setContent={setContents}
                open={isOpen}
                setOpen={setIsOpen}
                title={'Phản hồi báo cáo'}
                message={'Bạn chắc chắn muốn phản hồi báo cáo này không?'}
                onConfirm={handleConfirm}
                confirmText={'Xác Nhận'}
                cancelText="Thoát"
                icon={<ArrowPathIcon className="h-6 w-6 text-green-600" />}
                iconBgColor={'bg-green-100'}
                buttonBgColor={'bg-green-600'} />
        </div>
    );
};

export default TableTwo;
