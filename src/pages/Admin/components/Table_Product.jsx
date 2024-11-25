import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ChevronRightIcon, ArrowRightIcon, ChevronDownIcon, ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { TrashIcon, ReceiptRefundIcon,ArrowPathIcon } from '@heroicons/react/24/outline'
import { ExportExcel } from '../../../service/admin/ExportExcel';
import product from '../../../service/admin/Product';
import Modal from "./ModalThongBao";
import ModalDuyet from "./Modal_DuyetProduct";
import Pagination from './Pagination';

const TableTwo = () => {
    const [data, setData] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [option, setOption] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortBy, setSortBy] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const [expandedRowId, setExpandedRowId] = useState(null);
    const [entityProduct, setEntityProduct] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [statusentity, setStatusentity] = useState(false);
    const [status, setStatus] = useState(null);

    const [active, setActive] = useState(null);
    const findAllProduct = async () => {
        try {
            const response = await product.findAllProduct({ searchItem, option, page: currentPage, size: 2, sortColumn, sortBy });
            setData(response.data.result);
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    // const putActive = async (id, status) => {
    //     try {
    //         const response = await product.putActive({ id, status });
    //         if (response.data.code === 1000) {
    //             toast.success(response.data.message);
    //         }
    //         findAllProduct();
    //     } catch (error) {
    //         toast.error("Lỗi hệ thống");
    //         console.log("Error: " + error);
    //     }
    // }
    const putStatus = async (id) => {
        try {
            const response = await product.putStatus({ id });
            if (response.data.code === 1000) {
                toast.success(response.data.message);
            }
            findAllProduct();
        } catch (error) {
            toast.error("Lỗi hệ thống");
            console.log("Error: " + error);
        }
    }

    const handleConfirm = () => {
        putStatus(entityProduct.id);
        findAllProduct();
        setIsOpen(false);
    };

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

    useEffect(() => {
        findAllProduct(option, searchItem, currentPage, sortBy, sortColumn);
    }, [searchItem, currentPage, sortBy, sortColumn, option, status]);

    const toggleRow = (id) => {
        if (expandedRowId === id) {
            setExpandedRowId(null); // Nếu đã mở thì click lại sẽ đóng
        } else {
            setExpandedRowId(id); // Mở hàng chi tiết
        }
    };

    const handleExport = async () => {
        const sheetNames = ['Danh Sách Sản Phẩm'];
        try {
            console.log("totalElements: " + data.totalElements);
            const response = await product.findAllProduct({ searchItem, option, page: currentPage, size: data.totalElements, sortColumn, sortBy });
            return ExportExcel("Danh Sách Sản Phẩm.xlsx", sheetNames, [response.data.result.content]);
        } catch (error) {
            console.error("Đã xảy ra lỗi khi xuất Excel:", error.response ? error.response.data : error.message);
            toast.error("Có lỗi xảy ra khi xuất dữ liệu");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <ToastContainer></ToastContainer>
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

                        <input
                            value={searchItem}
                            onChange={(e) => {
                                setSearchItem(e.target.value);
                                setCurrentPage(0);
                            }}
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-50" />
                        {/* Dropdown Option */}
                        <select
                            value={option}
                            onChange={(e) => {
                                setOption(e.target.value);
                                setCurrentPage(0);
                            }}
                            className="w-70 bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white"
                        >
                            <option value="choduyet" disabled>Lọc theo</option>
                            <option value="tatca">Tất cả</option>
                            <option value="daduyet">Đã duyệt</option>
                            <option value="choduyet">Chờ duyệt</option>
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
                                setSortColumn("name");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1">
                                <span className="text-sm text-black dark:text-white">Sản phẩm</span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("price");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white">Giá</span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("publishingCompany");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Nhà xuất bản</span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("writerName");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Tác giả</span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>
                        <th className=" py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Trạng thái</span>
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
                                    <img className="h-12.5 w-15 rounded-md" src={entity.imageProducts[0]} alt="entity" />
                                    <p className="text-sm text-black dark:text-white truncate w-24">{entity.name}</p>
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {entity.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                    </div>
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {entity.publishingCompany}
                                    </div>
                                </td>

                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {entity.writerName}
                                    </div>
                                </td>

                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 ">
                                    <div className="flex items-center gap-1 hidden lg:flex">
                                        {entity.active ? (
                                            <span className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${entity.delete == false ? 'bg-success text-success' : 'bg-danger text-danger'}`}>
                                                {entity.delete == false ? 'Hoạt Động' : 'Đã Ngừng'}
                                            </span>)
                                            :
                                            (
                                                <span className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium bg-yellow-300 text-yellow-700`}>
                                                    {entity.delete == false ? 'Chờ duyệt' : ''}
                                                </span>)}
                                    </div>
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                                    <div className="flex space-x-3.5">
                                        <button onClick={() => {
                                            setEntityProduct(entity);
                                            setIsOpen(true);
                                            setStatusentity(!entity.delete);
                                            setActive(entity.active ? false : true)
                                        }}>
                                            {entity.delete == false ? (<ArrowPathIcon className='w-5 h-5 text-black hover:text-yellow-500  dark:text-white' />) : (<></>)}
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
                                                <p>Mã sản phẩm: {entity.id}</p>
                                                <p>Thể loại: {entity.category.name}</p>
                                                <p>Shop: {entity.account.shopName}</p>
                                                <p>Họ tên chủ shop: {entity.account.fullname}</p>
                                                <p>Email: {entity.account.email}</p>
                                                <p>Số điện thoại: {entity.account.phone}</p>
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
                size={data?.size}></Pagination>

            {!active ? (
                <Modal
                    open={isOpen}
                    setOpen={setIsOpen}
                    title={statusentity ? 'Ngừng Hoạt Động' : 'Khôi Phục'}
                    message={statusentity
                        ? 'Bạn chắc chắn muốn ngừng hoạt động sản phẩm này không?'
                        : 'Bạn có chắc muốn khôi phục sản phẩm này không?'}
                    onConfirm={handleConfirm}
                    confirmText={statusentity ? 'Xác Nhận' : 'Khôi Phục'}
                    cancelText="Thoát"
                    icon={statusentity ? (
                        <TrashIcon className="h-6 w-6 text-red-600" />
                    ) : (
                        <ReceiptRefundIcon className="h-6 w-6 text-yellow-600" />
                    )}
                    iconBgColor={statusentity ? 'bg-red-100' : 'bg-yellow-100'}
                    buttonBgColor={statusentity ? 'bg-red-600' : 'bg-yellow-600'} />
            ) : (
                <ModalDuyet
                    id={entityProduct.id}
                    status={status}
                    setStatus={setStatus}
                    open={isOpen}
                    setOpen={setIsOpen}
                    title={ 'Duyệt Sản Phẩm' }
                    message={'Bạn có chắc muốn duyệt sản phẩm này không?'}
                    confirmText={'Duyệt'}
                    cancelText={"Hủy"}
                    icon={statusentity ? (
                        <ArrowPathIcon className="h-6 w-6 text-yellow-600" />
                    ) : (
                        <ReceiptRefundIcon className="h-6 w-6 text-yellow-600" />
                    )}
                    iconBgColor={statusentity ? 'bg-yellow-100' : 'bg-yellow-100'}
                    buttonBgColor={statusentity ? 'bg-blue-600' : 'bg-yellow-600'} />
            )}
        </div>
    );
};

export default TableTwo;
