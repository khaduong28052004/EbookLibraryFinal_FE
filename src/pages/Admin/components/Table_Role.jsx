import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ArrowLongDownIcon, ArrowLongUpIcon, EyeIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import { NoSymbolIcon } from '@heroicons/react/24/outline'
import Modal from "./Modal_ThongBao_NotMail";
import ModalQuyen from './ModalQuyen';
import roleService from '../../../service/admin/Role';
import { ExportExcel } from '../../../service/admin/ExportExcel';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

const TableTwo = () => {
    const [data, setData] = useState([]);
    const [entity, setEntity] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortBy, setSortBy] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const [post, setPost] = useState(null);
    const [status, setStatus] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModalSP, setIsOpenModalSP] = useState(false);
    const [expandedRowId, setExpandedRowId] = useState(null);

    const handleConfirm = () => {
        deleteRole(entity.id);
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

    const deleteRole = async (id) => {
        try {
            const response = await roleService.delete({ id });
            toast.success(response.data.message);
            findAllRoleNhanVien();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error: " + error);
        }
    }

    const findAllRoleNhanVien = async () => {
        try {
            const response = await roleService.findAllRoleNhanVien({ page: currentPage, size: 10, searchItem, sortColumn, sortBy });
            console.log("content: " + response.data.result.content);
            setData(response.data.result);
            toast.success(response.data.message);
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    const handleExport = async () => {
        const sheetNames = ['Danh sách quyền nhân viên'];
        try {
            console.log("data.totalElements: " + data.totalElements);
            const response = await roleService.findAllRoleNhanVien({ page: currentPage, size: data.totalElements === 0 ? 5 : data.totalElements, searchItem, sortColumn, sortBy });
            if (!response || response.data.result.totalElements === 0) {
                toast.error("Không có dữ liệu");
            } else {
                return ExportExcel("Danh Sách Quyền Nhân Viên.xlsx", sheetNames, [response.data.result.content]);
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

    useEffect(() => {
        findAllRoleNhanVien();
    }, [searchItem, currentPage, sortBy, sortColumn, status]);


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
                    {/* <button
                        onClick={handleExport}
                        type="button"
                        className="inline-flex items-center justify-center rounded-md bg-gray-600 py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
                    >
                        Excel
                    </button> */}
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
                                <span className="text-sm text-black dark:text-white">Tên quyền </span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "name" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "name" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("description");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1">
                                <span className="text-sm text-black dark:text-white">Mô tả </span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "description" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "description" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("accounts.fullname");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white ">Nhân viên</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "accounts.fullname" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "accounts.fullname" ? "text-black" : "text-gray-500"} text-black`} />
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
                                    setEntity(entity);
                                    toggleRow(entity.id)
                                }}>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                    {data.pageable.pageNumber * data.size + index + 1}
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                    <p className="text-sm text-black dark:text-white truncate w-24">{entity.name}</p>
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white  ">
                                    <p className="text-sm text-black dark:text-white truncate w-24">{entity.description}</p>
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {entity.accounts && entity.accounts[0] && entity.accounts[0].fullname
                                            ? <p>{entity.accounts[0].fullname}</p>
                                            : <p>Chưa có người dùng</p>
                                        }
                                    </div>
                                </td>

                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                                    <div className="flex space-x-3.5">
                                        <button onClick={(event) => {
                                            event.stopPropagation();
                                            setEntity(entity);
                                            setIsOpen(true);
                                        }}>
                                            <NoSymbolIcon className='w-5 h-5 text-black hover:text-red-600  dark:text-white' />
                                        </button>
                                        <button onClick={(event) => {
                                            event.stopPropagation();
                                            setPost(false);
                                            setEntity(entity);
                                            setIsOpenModalSP(true);
                                        }}>
                                            <ArrowPathIcon className='w-5 h-5 text-black hover:text-green-600  dark:text-white' />
                                        </button>
                                        <button>
                                            <Link to={`/admin/quanLy/quyenchitiet?role=${entity.name}`}>
                                                <EyeIcon className='w-5 h-5 text-black hover:text-blue-600 dark:text-white' />
                                            </Link>
                                        </button>
                                    </div>
                                </td>
                            </tr>
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
                title={'Xóa quyền'}
                message={'Bạn chắc chắn muốn xóa quyền này không?'}
                onConfirm={handleConfirm}
                confirmText={'Xác Nhận'}
                cancelText="Thoát"
                icon={<NoSymbolIcon className="h-6 w-6 text-red-600" />}
                iconBgColor={'bg-red-100'}
                buttonBgColor={'bg-red-600'} />

            <ModalQuyen
                entity={post ? null : entity}
                status={status}
                setStatus={setStatus}
                open={isOpenModalSP}
                setOpen={setIsOpenModalSP}
                title={post ? 'Thêm quyền' : 'Cập nhật quyền'}
                confirmText="Lưu"
                cancelText="Hủy" />
        </div>
    );
};

export default TableTwo;
