import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, ChevronDownIcon, ArrowLongDownIcon, ArrowLongUpIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import { NoSymbolIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import ModalDuyetShop from "./Modal_DuyetShop";
import accountService from '../../../service/admin/Account';
import { ExportExcel } from '../../../service/admin/ExportExcel';
import Pagination from './Pagination';
import { toast, ToastContainer } from 'react-toastify';

const TableTwo = ({ status, setStatus }) => {
    const [data, setData] = useState([]);

    const [searchItem, setSearchItem] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortBy, setSortBy] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [expandedRowId, setExpandedRowId] = useState(null);

    const [id, setId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [statusentity, setStatusentity] = useState(false);

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

    const findAllSellerNotBrowse = async () => {
        try {
            const response = await accountService.findAllSellerNotBrowse({ currentPage, size: 10, searchItem, sortColumn, sortBy });
            console.log("FindAllSellerNotBrowse: ");
            setData(response.data.result);
            console.log(data);
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    useEffect(() => {
        findAllSellerNotBrowse();
    }, [searchItem, currentPage, sortBy, sortColumn, status]);

    const handleExport = async () => {
        const sheetNames = ['Danh Sách Đăng Ký Người Bán'];
        try {
            console.log("totalElements: " + data.totalElements);
            const response = await accountService.findAllSellerNotBrowse({ currentPage, size: data.totalElements === 0 ? 5 : data.totalElements, searchItem, sortColumn, sortBy });
            if (!response || response.data.result.totalElements === 0) {
                toast.error("Không có dữ liệu");
            } else {
                return ExportExcel("Danh Sách Đăng Ký Người Bán.xlsx", sheetNames, [response.data.result.content]);
            }
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

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <ToastContainer></ToastContainer>
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
                            <div className="flex items-center gap-1">
                                <span className="text-sm text-black dark:text-white">Họ tên </span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "fullname" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "fullname" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("numberId");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white">Số CCCD</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "numberId" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "numberId" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("afterIdImage");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-5.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white">Ảnh CCCD mặt trước</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "afterIdImage" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "afterIdImage" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>
                        <th
                            onClick={() => {
                                setSortColumn("beforeIdImage");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-5.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white">Ảnh CCCD mặt sau</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "beforeIdImage" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "beforeIdImage" ? "text-black" : "text-gray-500"} text-black`} />
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
                                    {/* <img className="h-12.5 w-15 rounded-md" src={entity.avatar} alt="entity" /> */}
                                    <p className="text-sm text-black dark:text-white truncate w-24">{entity.fullname}</p>
                                </td>

                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {entity.numberId}
                                    </div>
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <img className="h-12.5 w-15 rounded-md" src={entity.afterIdImage} alt="entity" />
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <img className="h-12.5 w-15 rounded-md" src={entity.beforeIdImage} alt="entity" />
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                                    <div className="flex space-x-3.5">
                                        <button onClick={(event) => {
                                            event.stopPropagation();
                                            setId(entity.id);
                                            setIsOpen(true);
                                            setStatusentity(entity.status);
                                        }}
                                            className=" inline-flex items-center justify-center rounded-md bg-yellow-600 py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
                                        >
                                            Duyệt
                                        </button>
                                    </div>
                                </td>

                            </tr>
                            {expandedRowId === entity.id && (
                                <tr>
                                    <td colSpan="8">
                                        <div className="p-5 border border-gray-100 hover:bg-slate-100">
                                            <p><strong>Thông tin chi tiết:</strong></p>
                                            <div className="pl-20 pt-2 gap-1 grid grid-cols-3">
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
                totalPages={data?.totalPages}
                totalElements={data?.totalElements}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                setPageNumber={setCurrentPage}
                size={data.size}></Pagination>


            <ModalDuyetShop
                open={isOpen}
                id={id}
                status={status}
                setStatus={setStatus}
                setOpen={setIsOpen}
                title={'Duyệt shop'}
                message={'Bạn muốn duyệt shop này không?'}
                confirmText={'Duyệt'}
                cancelText={"Không duyệt"}
                icon={statusentity ? (
                    <ArrowPathIcon className="h-6 w-6 text-yellow-600" />
                ) : (
                    <ReceiptRefundIcon className="h-6 w-6 text-yellow-600" />
                )}
                iconBgColor={statusentity ? 'bg-yellow-100' : 'bg-yellow-100'}
                buttonBgColor={statusentity ? 'bg-blue-600' : 'bg-yellow-600'} />
        </div >
    );
};

export default TableTwo;
