import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, ArrowRightIcon, ChevronDownIcon, ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { ExportExcel } from '../../../service/admin/ExportExcel';
import Thongke from '../../../service/admin/ThongKe';
import Pagination from './Pagination';

const TableTwo = ({ onPageChange, entityData }) => {
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [searchItem, setSearchItem] = useState('');

    const [sortColumn, setSortColumn] = useState('');
    const [sortBy, setSortBy] = useState(true);
    const [currentPage, setCurrentPage] = useState(entityData?.pageable?.pageNumber == undefined ? 0 : entityData?.pageable?.pageNumber);
    const [expandedRowId, setExpandedRowId] = useState(null);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < entityData.totalPages) {
            onPageChange(dateStart, dateEnd, searchItem, newPage, sortBy, sortColumn);
        }
    };

    const handlePrevious = () => {
        handlePageChange(entityData?.pageable?.pageNumber - 1);
    };

    const handleNext = () => {
        handlePageChange(entityData?.pageable?.pageNumber + 1);
    };

    useEffect(() => {
        onPageChange(dateStart, dateEnd, searchItem, currentPage, sortBy, sortColumn);
    }, [dateStart, dateEnd, searchItem, currentPage, sortBy, sortColumn]);
    ;


    const handleExport = async () => {
        const sheetNames = ['Danh Sách Thống Kê Doanh Thu'];
        try {
            console.log("totalElements: " + entityData.totalElements);
            const response = await Thongke.doanhThu({ dateStart, dateEnd, currentPage, size: entityData.totalElements, searchItem, sortColumn, sortBy });
            return ExportExcel("Danh Sách Thống Kê Doanh Thu.xlsx", sheetNames, [response.data.result.result.content]);
        } catch (error) {
            console.error("Đã xảy ra lỗi khi xuất Excel:", error.response ? error.response.data : error.message);
            toast.error("Có lỗi xảy ra khi xuất dữ liệu");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const toggleRow = (id) => {
        if (expandedRowId === id) {
            setExpandedRowId(null); // Nếu đã mở thì click lại sẽ đóng
        } else {
            setExpandedRowId(id); // Mở hàng chi tiết
        }
    };

    const formatNumber = (number, decimals = 2) => {
        if (number === null || number === undefined || isNaN(number)) {
            return '0.00';
        }
        return number.toFixed(decimals);
    };
    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="py-6 flex justify-between px-4 md:px-6 xl:px-7.5">
                <form action="https://formbold.com/s/unique_form_id" method="POST">
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

                        {/* Input Start Date */}
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

                        {/* Arrow Icon from Heroicons */}
                        <ArrowRightIcon className="w-5 h-5 text-black dark:text-white" />

                        {/* Input End Date */}
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
                        <input
                            value={searchItem}
                            onChange={(e) => {
                                setSearchItem(e.target.value);
                                setCurrentPage(0);
                            }}
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125" />
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
                                setSortColumn("shopName");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1">
                                <span className="text-sm text-black dark:text-white">Tên shop</span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("fullname");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white">Chủ shop</span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("dtshop");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Doanh thu shop</span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("dtsan");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Doanh thu sàn</span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>
                        <th
                            onClick={() => {
                                setSortColumn("phi");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Phí</span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>
                        <th
                            onClick={() => {
                                setSortColumn("loiNhuan");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Lợi nhuận</span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>

                        {/* <th className=" py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Trạng thái</span>
                            </div>
                        </th> */}
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
                                    <p className="text-sm text-black dark:text-white truncate w-24">{entity.shopName}</p>
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {entity.fullname}
                                    </div>
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {formatNumber(entity.dtshop)}
                                    </div>
                                </td>

                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {formatNumber(entity.dtsan)}
                                    </div>
                                </td>

                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {formatNumber(entity.phi)}
                                    </div>
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {formatNumber(entity.loiNhuan)}
                                    </div>
                                </td>

                            </tr>
                            {expandedRowId === entity.id && (
                                <tr>
                                    <td colSpan="8">
                                        <div className="p-5 border border-gray-100 hover:bg-slate-100">
                                            <p><strong>Thông tin chi tiết:</strong></p>
                                            <div className="pl-20 pt-2 gap-1 grid grid-cols-3">
                                                <p>Trạng thái : {entity.status ? 'Đang hoạt động' : 'Ngừng hoạt động'}</p>
                                                <p>Ngày tạo: {entity.createAt}</p>
                                                <p>Họ tên chủ shop: {entity.fullname}</p>
                                                <p>Giới tính: {entity.gender ? 'Nam' : 'Nữ'}</p>
                                                <p>Email: {entity.email}</p>
                                                <p>Số điện thoại: {entity.phone}</p>
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
