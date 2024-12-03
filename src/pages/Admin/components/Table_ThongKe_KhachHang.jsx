import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, ChevronDownIcon, ArrowRightIcon, ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { TrashIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import { ExportExcel } from '../../../service/admin/ExportExcel';
import Thongke from '../../../service/admin/ThongKe';
import Pagination from './Pagination';
import { toast, ToastContainer } from 'react-toastify';

const TableTwo = ({ onPageChange, entityData }) => {
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [searchItem, setSearchItem] = useState('');
    const [option, setOption] = useState('');
    const [expandedRowId, setExpandedRowId] = useState(null);

    const [sortColumn, setSortColumn] = useState('');
    const [sortBy, setSortBy] = useState(true);
    const [currentPage, setCurrentPage] = useState(entityData?.pageable?.pageNumber == undefined ? 0 : entityData?.pageable?.pageNumber);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < entityData.totalPages) {
            onPageChange(dateStart, dateEnd, option, searchItem, newPage, sortBy, sortColumn);
        }
    };

    const handlePrevious = () => {
        handlePageChange(entityData?.pageable?.pageNumber - 1);
    };

    const handleNext = () => {
        handlePageChange(entityData?.pageable?.pageNumber + 1);
    };

    useEffect(() => {
        onPageChange(dateStart, dateEnd, option, searchItem, currentPage, sortBy, sortColumn);
    }, [dateStart, dateEnd, option, searchItem, currentPage, sortBy, sortColumn]);


    const handleExport = async () => {
        const sheetNames = ['Danh Sách Thống Kê Khách Hàng'];
        try {
            console.log("totalElements: " + entityData.totalElements);
            const response = await Thongke.khachHang({ dateStart, dateEnd, searchItem, option, currentPage, size: entityData.totalElements === 0 ? 5 : entityData.totalElements, sortColumn, sortBy });
            if (!response || response.data.result.thongke.totalElements === 0) {
                toast.error("Không có dữ liệu");
            } else {
                return ExportExcel("Danh Sách Thống Kê Khách Hàng.xlsx", sheetNames, [response.data.result.thongke.content]);
            }
        } catch (error) {
            console.error("Đã xảy ra lỗi khi xuất Excel:", error.response ? error.response.data : error.message);
            toast.error("Có lỗi xảy ra khi xuất dữ liệu");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const toggleRow =
        (id) => {
            if (expandedRowId === id) {
                setExpandedRowId(null); // Nếu đã mở thì click lại sẽ đóng
            } else {
                setExpandedRowId(id); // Mở hàng chi tiết
            }
        };
    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <ToastContainer />
            <div className="py-6 flex justify-between px-4 md:px-6 xl:px-7.5">
                <form method="POST">
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
                        {option === "macdinh" ? (<></>) : (<>
                            <input
                                value={dateStart}
                                onChange={(e) => {
                                    setDateStart(e.target.value);
                                }}
                                type="date"
                                placeholder="Start Date"
                                name="startDate"
                                className="w-45 bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white"
                            />
                            <ArrowRightIcon className="w-5 h-5 text-black dark:text-white" />
                            <input
                                value={dateEnd}
                                onChange={(e) => {
                                    setDateEnd(e.target.value);
                                }}
                                type="date"
                                placeholder="End Date"
                                name="endDate"
                                className="w-45 bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white"
                            />
                        </>)}
                        <input
                            value={searchItem}
                            onChange={(e) => {
                                setSearchItem(e.target.value);
                                setCurrentPage(0);
                            }}
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-50" />
                        <select
                            value={option}
                            onChange={(e) => setOption(e.target.value)}
                            className="w-70 bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white"
                        >
                            <option value="" disabled>Lọc theo</option>
                            <option value="macdinh">Tất cả</option>
                            <option value="khachhangmoi">Khách hàng mới</option>
                            <option value="muanhieunhat">Mua nhiều nhất</option>
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
                                setSortColumn("fullname");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white ">Họ và tên</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "fullname" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "fullname" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("avgdonhang");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Đơn trung bình</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "avgdonhang" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "avgdonhang" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("avgStar");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Đánh giá trung bình</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "avgStar" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "avgStar" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>
                        <th
                            onClick={() => {
                                setSortColumn("sumDonHang");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white">Tổng đơn hàng</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "sumDonHang" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "sumDonHang" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>

                    </tr>
                </thead>

                <tbody>
                    {entityData?.content?.map((entity, index) => (
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
                                    {entityData.pageable.pageNumber * entityData.size + index + 1}
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                                    <img className="h-12.5 w-15 rounded-md" src={entity.avatar} alt="entity" />
                                    <p className="text-sm text-black dark:text-white truncate w-24">{entity.fullname}</p>
                                </td>

                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {entity.avgdonhang.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                    </div>
                                </td>

                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {entity.avgStar}
                                    </div>
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {entity.sumDonHang}
                                    </div>
                                </td>
                            </tr>
                            {expandedRowId === entity.id && (
                                <tr>
                                    <td colSpan="9">
                                        <div className="p-5 border border-gray-100 hover:bg-slate-100">
                                            <p><strong>Thông tin chi tiết:</strong></p>
                                            <div className="pl-20 pt-2 gap-1 grid grid-cols-3">
                                                <p>Họ tên: {entity.fullname}</p>
                                                <p>Giới tính: {entity.gender ? 'Nam' : 'Nữ'}</p>
                                                <p>Email: {entity.email}</p>
                                                <p>Số điện thoại: {entity.phone}</p>
                                                <p>Trạng thái : {entity.status ? 'Đang hoạt động' : 'Ngừng hoạt động'}</p>
                                                <p>Ngày tạo: {entity.createAt}</p>
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
                pageNumber={currentPage}
                totalPages={entityData?.totalPages}
                totalElements={entityData?.totalElements}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                setPageNumber={setCurrentPage}
                size={entityData.size}></Pagination>

        </div>
    );
};

export default TableTwo;
