import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ArrowLongDownIcon, ArrowLongUpIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import { TrashIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import Modal from "./ModalThongBao";
import ModalCategory from './Modal_Category';
import category from '../../../service/admin/Category';
import { ExportExcel } from '../../../service/admin/ExportExcel';
import Pagination from './Pagination';

const TableTwo = () => {
    const [data, setData] = useState([]);
    const [dataByIdParent, setDataByIdParent] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortBy, setSortBy] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const [post, setPost] = useState(null);
    const [entityCategory, setEntityCategory] = useState(null);
    const [status, setStatus] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModalSP, setIsOpenModalSP] = useState(false);
    const [expandedRowId, setExpandedRowId] = useState(null);

    const handleConfirm = () => {
        deleteCategory(entityCategory.id);
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

    const deleteCategory = async (id) => {
        try {
            const response = await category.delete({ id });
            if (response.data.code === 1000) {
                toast.success(response.data.message);
            } else{
                toast.error(response.data.message);
            }
            findAllCategory();
        } catch (error) {
            toast.error("Lỗi hệ thống");
            console.log("Error: " + error);
        }
    }

    const findAllCategory = async () => {
        try {
            const response = await category.findAllCategory({ page: currentPage, size: 2, searchItem, sortColumn, sortBy });
            console.log("content: " + response.data.result.content);
            setData(response.data.result);
            toast.success(response.data.message);

        } catch (error) {
            console.log("Error: " + error);
        }
    };

    const findAllCategoryByIdParent = async () => {
        try {
            const response = await category.findAllCategoryByIdParent({ idParent: entityCategory.id });
            console.log("content: " + response.data.result.content);
            setDataByIdParent(response.data.result);
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    const handleExport = async () => {
        const sheetNames = ['Danh Sách nhân viên'];
        try {
            console.log("data.totalElements: " + data.totalElements);
            const response = await category.findAllCategory({ page: currentPage, size: data.totalElements, searchItem, sortColumn, sortBy });
            return ExportExcel("Danh Sách nhân viên.xlsx", sheetNames, [response.data.result.content]);
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

    useEffect(() => {
        findAllCategory();
        findAllCategoryByIdParent();
    }, [searchItem, currentPage, sortBy, sortColumn, status, entityCategory]);


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
                <form onSubmit={handleSubmit}
                    className="flex items-center space-x-2">
                    <button
                        onClick={handleExport}
                        type="button"
                        className="inline-flex items-center justify-center rounded-md bg-gray-600 py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
                    >
                        Excel
                    </button>
                    <button
                        onClick={() => {
                            setIsOpenModalSP(true); setPost(true);
                        }}
                        className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
                    >
                        Thêm
                    </button>
                </form>



            </div>
            <table className="w-full border-collapse border border-stroke dark:border-strokedark">
                <thead>
                    <tr className="border-t border-stroke dark:border-strokedark">
                        <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">#</th>
                        <th
                            onClick={() => {
                                setSortColumn("name");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1">
                                <span className="text-sm text-black dark:text-white">Tên danh mục </span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("account.fullname");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white ">Người tạo</span>
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
                    {data?.content?.map((entity, index) => (
                        <>
                            <tr key={index} className={`border-t border-stroke dark:border-strokedark ${expandedRowId === entity.id ? `bg-slate-100` : `bg-white`}`}
                                onClick={() => {
                                    setEntityCategory(entity);
                                    toggleRow(entity.id)
                                }}>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                    {data.pageable.pageNumber * data.size + index + 1}
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                                    <p className="text-sm text-black dark:text-white truncate w-24">{entity.name}</p>
                                </td>

                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                    <div className="flex items-center gap-1 hidden xl:flex">

                                        {entity.account.fullname}
                                    </div>
                                </td>

                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                                    <div className="flex space-x-3.5">
                                        <button onClick={() => {
                                            setEntityCategory(entity);
                                            setIsOpen(true);
                                        }}>
                                            <TrashIcon className='w-5 h-5 text-black hover:text-red-600  dark:text-white' />
                                        </button>
                                        <button onClick={() => {
                                            setPost(false);
                                            setEntityCategory(entity);
                                            setIsOpenModalSP(true);
                                        }}>
                                            <ArrowPathIcon className='w-5 h-5 text-black hover:text-green-600  dark:text-white' />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            {expandedRowId === entity.id && (
                                <tr>
                                    <td colSpan="9">
                                        <div className="p-5 border border-gray-100 hover:bg-slate-100">
                                            {dataByIdParent.length > 0 ? (
                                                <>
                                                    <p><strong>Các thể loại:</strong></p>
                                                    {dataByIdParent.map((entityIdParent, index) => (
                                                        <div key={index} className="pl-20 pt-2 gap-1 grid grid-cols-2">
                                                            <p>Tên danh mục: {entityIdParent.name}</p>
                                                            <p>Người tạo: {entityIdParent.account?.fullname || 'Không xác định'}</p>
                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                <p className="text-gray-500 pl-20 text-center">Không có danh mục con</p>
                                            )}
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

            <Modal
                open={isOpen}
                setOpen={setIsOpen}
                title={'Ngừng Hoạt Động'}
                message={'Bạn chắc chắn muốn ngừng hoạt động sản phẩm này không?'}
                onConfirm={handleConfirm}
                confirmText={'Xác Nhận'}
                cancelText="Thoát"
                icon={<TrashIcon className="h-6 w-6 text-red-600" />}
                iconBgColor={'bg-red-100'}
                buttonBgColor={'bg-red-600'} />

            <ModalCategory
                entity={post ? null : entityCategory}
                status={status}
                setStatus={setStatus}
                open={isOpenModalSP}
                setOpen={setIsOpenModalSP}
                title="Thêm Sản Phẩm Mới"
                confirmText="Lưu"
                cancelText="Hủy" />
        </div>
    );
};

export default TableTwo;
