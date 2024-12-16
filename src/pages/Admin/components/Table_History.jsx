import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ArrowLongDownIcon, ArrowLongUpIcon, ChevronDownIcon, ChevronRightIcon, TrashIcon } from '@heroicons/react/24/solid';
import Modal from "./Modal_ThongBao_NotMail";
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
    const [isOpen, setIsOpen] = useState(false);

    const [entityList, setEntityList] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

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
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    useEffect(() => {
        findAllHistory();
    }, [searchItem, currentPage, sortBy, sortColumn]);
    ;

    const deleteHistory = async () => {
        try {
            const response = await historyService.deleteList({ id: entityList });
            console.log("xóa: " + response.data.message);
            if (response.data.code === 1000) {
                toast.success(response.data.message);
            }
            findAllHistory();
            setEntityList([]);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error: " + error);
        }
    }

    const handleConfirm = () => {
        deleteHistory();
        setIsOpen(false);
    };

    const toggleRow = (id) => {
        if (expandedRowId === id) {
            setExpandedRowId(null); // Nếu đã mở thì click lại sẽ đóng
        } else {
            setExpandedRowId(id); // Mở hàng chi tiết
        }
    };

    const handleCheckboxChange = (id, isChecked) => {
        setEntityList((prev) => {
            if (isChecked) {
                // Nếu checkbox được check, thêm id vào mảng
                if (!prev.includes(id)) {
                    return [...prev, id];
                }
            } else {
                // Nếu checkbox không được check, xóa id khỏi mảng
                return prev.filter((item) => item !== id);
            }
            return prev;
        });
    };
    const handleSelectAll = async (isChecked) => {
        setSelectAll(isChecked);
        const AccountID = sessionStorage.getItem("id_account");
        const response = await historyService.findAllHistory({ searchItem, AccountID: AccountID, page: currentPage, size: data.totalElements, sortColumn, sortBy });
        if (isChecked) {
            const allIds = response.data.result.content.map((entity) => entity.id);
            setEntityList(allIds);
        } else {
            setEntityList([]);
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
                        <th className="py-4.5 md:px-6 text-left font-medium">
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={(e) => handleSelectAll(e.target.checked)}
                                className="flex justify-start  w-4 h-4 items-start bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 "

                            />
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
                                <td className="py-4.5 md:px-6 text-left font-medium ">
                                    {sessionStorage.getItem("id_account") === "1" ?
                                        <input
                                            type="checkbox"
                                            checked={entityList.includes(entity.id)}
                                            onChange={(e) => handleCheckboxChange(entity.id, e.target.checked)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        : <></>}
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
                                                            <>
                                                                <div className='pl-20 pt-2 grid grid-cols-3 pb-3'>
                                                                    <p>Tiêu đề: {parsedDoiTuongOld.flashSale.title}</p>
                                                                    <p>Thời gian bắt đầu: {new Date(parsedDoiTuongOld.flashSale.dateStart).toLocaleString("vi-VN", {
                                                                        day: "2-digit",
                                                                        month: "2-digit",
                                                                        year: "numeric",
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                        second: "2-digit",
                                                                        hour12: false, // Sử dụng định dạng 24 giờ
                                                                    })}</p>
                                                                    <p>Thời gian kết thúc: {new Date(parsedDoiTuongOld.flashSale.dateEnd).toLocaleString("vi-VN", {
                                                                        day: "2-digit",
                                                                        month: "2-digit",
                                                                        year: "numeric",
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                        second: "2-digit",
                                                                        hour12: false, // Sử dụng định dạng 24 giờ
                                                                    })}</p>
                                                                </div>
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
                                                                            {parsedDoiTuongOld?.quantity + " " || ""}
                                                                        </span>
                                                                        {parsedDoiTuongNew && (
                                                                            <>
                                                                                <span className="text-gray-500 mx-4">→</span>
                                                                                <span className=" text-green-700">
                                                                                    {parsedDoiTuongNew.quantity + " " || ""}
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
                                                            </>
                                                        ) : null}
                                                        {entity.tableName === "FlashSale" ? (
                                                            <div className={`pl-20 pt-2 gap-3 grid ${parsedDoiTuongNew ? 'grid-cols-1' : 'grid-cols-3'}`}>
                                                                <p>
                                                                    Tiêu đề:
                                                                    <span className=" text-gray-900 px-2">
                                                                        {parsedDoiTuongOld?.title || ""}
                                                                    </span>
                                                                    {parsedDoiTuongNew && (
                                                                        <>
                                                                            <span className="text-gray-500 mx-4">→</span>
                                                                            <span className=" text-green-700">
                                                                                {parsedDoiTuongNew?.title || ""}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </p>
                                                                <p>
                                                                    Thời gian bắt đầu:
                                                                    <span className=" text-gray-900 px-2">
                                                                        {new Date(parsedDoiTuongOld.dateStart).toLocaleString("vi-VN", {
                                                                            day: "2-digit",
                                                                            month: "2-digit",
                                                                            year: "numeric",
                                                                            hour: "2-digit",
                                                                            minute: "2-digit",
                                                                            second: "2-digit",
                                                                            hour12: false, // Sử dụng định dạng 24 giờ
                                                                        }) || ""}
                                                                    </span>
                                                                    {parsedDoiTuongNew && (
                                                                        <>
                                                                            <span className="text-gray-500 mx-4">→</span>
                                                                            <span className=" text-green-700">
                                                                                {new Date(parsedDoiTuongNew.dateStart).toLocaleString("vi-VN", {
                                                                                    day: "2-digit",
                                                                                    month: "2-digit",
                                                                                    year: "numeric",
                                                                                    hour: "2-digit",
                                                                                    minute: "2-digit",
                                                                                    second: "2-digit",
                                                                                    hour12: false, // Sử dụng định dạng 24 giờ
                                                                                }) || ""}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </p>
                                                                <p>
                                                                    Thời gian bắt đầu:
                                                                    <span className=" text-gray-900 px-2">
                                                                        {new Date(parsedDoiTuongOld.dateEnd).toLocaleString("vi-VN", {
                                                                            day: "2-digit",
                                                                            month: "2-digit",
                                                                            year: "numeric",
                                                                            hour: "2-digit",
                                                                            minute: "2-digit",
                                                                            second: "2-digit",
                                                                            hour12: false, // Sử dụng định dạng 24 giờ
                                                                        }) || ""}
                                                                    </span>
                                                                    {parsedDoiTuongNew && (
                                                                        <>
                                                                            <span className="text-gray-500 mx-4">→</span>
                                                                            <span className=" text-green-700">
                                                                                {new Date(parsedDoiTuongNew.dateEnd).toLocaleString("vi-VN", {
                                                                                    day: "2-digit",
                                                                                    month: "2-digit",
                                                                                    year: "numeric",
                                                                                    hour: "2-digit",
                                                                                    minute: "2-digit",
                                                                                    second: "2-digit",
                                                                                    hour12: false, // Sử dụng định dạng 24 giờ
                                                                                }) || ""}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </p>
                                                            </div>
                                                        ) : null}
                                                        {entity.tableName === "AccountReport" || entity.tableName === "ProductReport" ? (<>
                                                            <div className="pl-20 pt-2 gap-1 grid grid-cols-3">
                                                                <p>Tiêu đề: {parsedDoiTuongOld.title}</p>
                                                                <p>Thời gian tạo: {new Date(parsedDoiTuongOld.createAt).toLocaleString("vi-VN", {
                                                                    day: "2-digit",
                                                                    month: "2-digit",
                                                                    year: "numeric",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                    second: "2-digit",
                                                                    hour12: false, // Sử dụng định dạng 24 giờ
                                                                })}</p>
                                                                {entity.tableName === "AccountReport" ?
                                                                    <p>Shop bị báo cáo: {parsedDoiTuongOld.shop.shopName}</p> :
                                                                    <p>Sản phẩm bị báo cáo: {parsedDoiTuongOld.product.name}</p>}
                                                            </div>
                                                            <div className="pl-20 pt-2 grid grid-cols-1">
                                                                <p>Nội dung: <span className=' pl-2 text-gray-600'>{parsedDoiTuongOld.content}</span></p>
                                                            </div>
                                                        </>
                                                        ) : null}
                                                        {entity.tableName === "Role" ? (
                                                            <div className="pl-20 pt-2 gap-1 grid grid-cols-2">
                                                                <p>
                                                                    Tên quyền:
                                                                    <span className=" text-gray-900 px-2">
                                                                        {parsedDoiTuongOld?.name || ""}
                                                                    </span>
                                                                    {parsedDoiTuongNew && (
                                                                        <>
                                                                            <span className="text-gray-500 mx-4">→</span>
                                                                            <span className=" text-green-700">
                                                                                {parsedDoiTuongNew?.name || ""}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </p>
                                                                <p>
                                                                    Mô tả:
                                                                    <span className=" text-gray-900 px-2">
                                                                        {parsedDoiTuongOld?.description || ""}
                                                                    </span>
                                                                    {parsedDoiTuongNew && (
                                                                        <>
                                                                            <span className="text-gray-500 mx-4">→</span>
                                                                            <span className=" text-green-700">
                                                                                {parsedDoiTuongNew?.description || ""}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </p>
                                                            </div>
                                                        ) : null}
                                                        {entity.tableName === "RolePermission" ? (
                                                            <div className="pl-20 pt-2 gap-1 grid grid-cols-2">
                                                                <p>Tên quyền: {parsedDoiTuongOld.role.name}</p>
                                                                <p>Mô tả: {parsedDoiTuongOld.role.description}</p>
                                                                <p>Tên chi tiết quyền: {parsedDoiTuongOld.permission.cotSlug}</p>
                                                                <p>Mô tả: {parsedDoiTuongOld.permission.description}</p>
                                                            </div>
                                                        ) : null}
                                                        {entity.tableName === "Category" ? (
                                                            <div className="pl-20 pt-2 gap-1 grid grid-cols-2">
                                                                <p>
                                                                    Tên thể loại:
                                                                    <span className=" text-gray-900 px-2">
                                                                        {parsedDoiTuongOld?.name || ""}
                                                                    </span>
                                                                    {parsedDoiTuongNew && (
                                                                        <>
                                                                            <span className="text-gray-500 mx-4">→</span>
                                                                            <span className=" text-green-700">
                                                                                {parsedDoiTuongNew?.name || ""}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </p>
                                                            </div>
                                                        ) : null}
                                                        {entity.tableName === "DiscountRate" ? (
                                                            <div className={`pl-20 pt-2 gap-1 grid  ${parsedDoiTuongNew ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                                                <p>
                                                                    Mức chiết khấu:
                                                                    <span className=" text-gray-900 px-2">
                                                                        {parsedDoiTuongOld?.discount || ""}
                                                                    </span>
                                                                    {parsedDoiTuongNew && (
                                                                        <>
                                                                            <span className="text-gray-500 mx-4">→</span>
                                                                            <span className=" text-green-700">
                                                                                {parsedDoiTuongNew?.discount || ""}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </p>
                                                                <p>
                                                                    Ngày bắt đầu áp dụng:
                                                                    <span className=" text-gray-900 px-2">
                                                                        {new Date(parsedDoiTuongOld.dateStart).toLocaleString("vi-VN", {
                                                                            day: "2-digit",
                                                                            month: "2-digit",
                                                                            year: "numeric",
                                                                            hour: "2-digit",
                                                                            minute: "2-digit",
                                                                            second: "2-digit",
                                                                            hour12: false, // Sử dụng định dạng 24 giờ
                                                                        }) || ""}
                                                                    </span>
                                                                    {parsedDoiTuongNew && (
                                                                        <>
                                                                            <span className="text-gray-500 mx-4">→</span>
                                                                            <span className=" text-green-700">
                                                                                {new Date(parsedDoiTuongNew.dateStart).toLocaleString("vi-VN", {
                                                                                    day: "2-digit",
                                                                                    month: "2-digit",
                                                                                    year: "numeric",
                                                                                    hour: "2-digit",
                                                                                    minute: "2-digit",
                                                                                    second: "2-digit",
                                                                                    hour12: false, // Sử dụng định dạng 24 giờ
                                                                                }) || ""}                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </p>
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
            <div className='flex justify-end mr-5'>
                <button
                    onClick={() => {
                        if (entityList.length === 0) {
                            setIsOpen(false);
                        } else {
                            setIsOpen(true);
                        }
                    }}
                    className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
                >
                    Xóa
                </button>
            </div>
            <Pagination
                pageNumber={currentPage}
                totalPages={data?.totalPages}
                totalElements={data?.totalElements}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                setPageNumber={setCurrentPage}
                size={data.size}></Pagination>
            <Modal
                open={isOpen}
                setOpen={setIsOpen}
                title={'Xóa lịch sử'}
                message={'Bạn chắc chắn muốn xóa lịch sử này không?'}
                onConfirm={handleConfirm}
                confirmText={'Xác Nhận'}
                cancelText="Thoát"
                icon={<TrashIcon className="h-6 w-6 text-red-600" />}
                iconBgColor={'bg-red-100'}
                buttonBgColor={'bg-red-600'} />
        </div>
    );
};

export default TableTwo;
