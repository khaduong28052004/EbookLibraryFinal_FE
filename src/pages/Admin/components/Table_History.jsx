import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ArrowLongDownIcon, ArrowLongUpIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { NoSymbolIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline';
import historyService from '../../../service/admin/History';
import { ExportExcel } from '../../../service/admin/ExportExcel';
import Pagination from './Pagination';

const TableTwo = () => {
    const [data, setData] = useState([]);
    // const [doiTuong, setDoiTuong] = useState([]);
    const [expandedRowId, setExpandedRowId] = useState(null);

    const [searchItem, setSearchItem] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortBy, setSortBy] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

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

    const findAllHistory = async () => {
        try {
            const AccountID = sessionStorage.getItem("id_account");
            console.log("accountID: " + AccountID);
            const response = await historyService.findAllHistory({ searchItem, AccountID: AccountID, page: currentPage, size: 10, sortColumn, sortBy });
            setData(response.data.result);

            // Kiểm tra nếu content và doituong tồn tại, sau đó parse
            // const content = response.data.result.content[0];  // Giả sử chỉ có 1 phần tử trong mảng content
            // if (content && content.doituong) {
            //     try {
            //         const parsedDoiTuong = JSON.parse(content.doituong);
            //         setDoiTuong(parsedDoiTuong);
            //         console.log("đối tượng: " + parsedDoiTuong.username);
            //     } catch (e) {
            //         console.error("Lỗi khi parse doituong: ", e);
            //     }
            // } else {
            //     console.log("doituong không tồn tại hoặc không hợp lệ");
            // }
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    useEffect(() => {
        findAllHistory();
    }, [searchItem, currentPage, sortBy, sortColumn]);
    ;
    const handleExport = async () => {
        const sheetNames = ['Danh Sách Lịch Sử Hoạt Động'];
        try {
            console.log("data.totalElements: " + data.totalElements);
            const response = await historyService.findAllHistory({ searchItem, AccountID: AccountID, page: currentPage, size: totalElements, sortColumn, sortBy });
            if (!response || response.data.result.totalElements === 0) {
                toast.error("Không có dữ liệu");
            } else {
                return ExportExcel("Danh sách lịch sử hoạt động.xlsx", sheetNames, [response.data.result.content]);
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
                    </div>
                </form>
            </div>
            <table className="w-full border-collapse border border-stroke dark:border-strokedark">
                <thead>
                    <tr className="border-t border-stroke dark:border-strokedark">
                        <th></th>
                        <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">#</th>
                        <th
                            onClick={() => {
                                setSortColumn("action_type");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white ">Hành động</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "action_type" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "action_type" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>
                        <th
                            onClick={() => {
                                setSortColumn("tableName");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white ">Đối tượng </span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "tableName" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "tableName" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>
                        <th
                            onClick={() => {
                                setSortColumn("timestamps");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Thời gian</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "timestamps" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "timestamps" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>
                        <th
                            onClick={() => {
                                setSortColumn("account.fullname");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Người thực hiện</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "account.fullname" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "account.fullname" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
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
                                </td>                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                    {data.pageable.pageNumber * data.size + index + 1}
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {entity.action_type}
                                    </div>
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {entity.tableName}
                                    </div>
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black max-w-5 dark:text-white ">
                                    <div className="flex items-center gap-1 xl:flex">
                                        <p className="text-sm text-black dark:text-white truncate w-40">
                                            {new Date(entity.timestamps).toLocaleString("vi-VN", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                                hour12: false, // Sử dụng định dạng 24 giờ
                                            })}
                                            {/* {entity.timestamps.toLocaleString("en-GB")} */}
                                        </p>
                                    </div>

                                </td>

                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {entity.account.fullname}
                                    </div>
                                </td>
                            </tr>
                            {
                                expandedRowId === entity.id && (
                                    // Xử lý JSON.parse() ngoài JSX
                                    (() => {
                                        let parsedDoiTuongOld = {};
                                        let parsedDoiTuongNew = {};
                                        try {
                                            parsedDoiTuongOld = JSON.parse(entity.doituongOld);
                                            parsedDoiTuongNew = entity.doituongNew == null ? null : JSON.parse(entity.doituongNew);
                                        } catch (e) {
                                            console.error("Lỗi khi parse doituong: ", e);
                                        }

                                        return (
                                            <tr>
                                                <td colSpan="9">
                                                    <div className="p-5 border border-gray-100 hover:bg-slate-100">
                                                        <p><strong>Thông tin chi tiết:</strong></p>
                                                        {entity.tableName === "Account" ? (
                                                            <div className="pl-20 pt-2 gap-3 grid grid-cols-3">
                                                                {parsedDoiTuongOld.shopName ?
                                                                    <p>Chủ shop: {parsedDoiTuongOld.fullname}</p> :
                                                                    <p>Họ tên: {parsedDoiTuongOld.fullname}</p>}
                                                                {parsedDoiTuongOld.shopName ?
                                                                    <p>Tên shop: {parsedDoiTuongOld.shopName}</p> :
                                                                    <></>}
                                                                <p>Giới tính: {entity.gender ? 'Nam' : 'Nữ'}</p>
                                                                <p>Email: {parsedDoiTuongOld.email}</p>
                                                                <p>Số điện thoại: {parsedDoiTuongOld.phone}</p>
                                                            </div>
                                                        ) : null}
                                                        {entity.tableName === "FlashSaleDetails" ? (
                                                            <div className={`pl-20 pt-2 grid ${parsedDoiTuongNew == null ? "gap-9 grid-cols-3" : "grid-cols-1"}`}>
                                                                <p>
                                                                    Tên sản phẩm: 
                                                                    <span className=" text-gray-900 px-2">
                                                                        {parsedDoiTuongOld?.product?.name || ""}
                                                                    </span>
                                                                    {parsedDoiTuongNew && (
                                                                        <>
                                                                            <span className="text-gray-500 mx-4">→</span>
                                                                            <span className=" text-green-700">
                                                                                {parsedDoiTuongNew?.product?.name || ""}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </p>
                                                                <p>
                                                                    Số lượng sale: 
                                                                    <span className=" text-gray-900 px-2">
                                                                        {parsedDoiTuongOld?.quantity + "%" || ""}
                                                                    </span>
                                                                    {parsedDoiTuongNew && (
                                                                        <>
                                                                            <span className="text-gray-500 mx-4">→</span>
                                                                            <span className=" text-green-700">
                                                                                {parsedDoiTuongNew.quantity + "%" || ""}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </p>
                                                                <p>
                                                                    Phần trăm sale:
                                                                    <span className=" text-gray-900 px-2">
                                                                        {parsedDoiTuongOld?.sale + "%" || ""}
                                                                    </span>
                                                                    {parsedDoiTuongNew && (
                                                                        <>
                                                                            <span className="text-gray-500 mx-4">→</span>
                                                                            <span className=" text-green-700">
                                                                                {parsedDoiTuongNew.sale + "%" || ""}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </p>
                                                            </div>
                                                        ) : null}
                                                        {entity.tableName === "FlashSale" ? (
                                                            <div className="pl-20 pt-2 gap-3 grid grid-cols-3">
                                                                <p>Tiêu đề: {parsedDoiTuongOld.title}</p>
                                                                <p>Thời gian bắt đầu: {new Date(parsedDoiTuongOld.dateStart).toLocaleString("vi-VN", {
                                                                    day: "2-digit",
                                                                    month: "2-digit",
                                                                    year: "numeric",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                    second: "2-digit",
                                                                    hour12: false, // Sử dụng định dạng 24 giờ
                                                                })}</p>
                                                                <p>Thời gian kết thúc: {new Date(parsedDoiTuongOld.dateEnd).toLocaleString("vi-VN", {
                                                                    day: "2-digit",
                                                                    month: "2-digit",
                                                                    year: "numeric",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                    second: "2-digit",
                                                                    hour12: false, // Sử dụng định dạng 24 giờ
                                                                })}</p>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })()
                                )
                            }
                        </>
                    ))}
                </tbody>
            </table >
            <Pagination
                pageNumber={currentPage}
                totalPages={data?.totalPages}
                totalElements={data?.totalElements}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                setPageNumber={setCurrentPage}
                size={data.size}></Pagination>

        </div>
    );
};

export default TableTwo;
