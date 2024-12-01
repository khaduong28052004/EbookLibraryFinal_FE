import React, { useState, useEffect } from 'react';
import { ArrowLongDownIcon, NoSymbolIcon, ArrowLongUpIcon, PlusIcon } from '@heroicons/react/24/solid'
import permission from '../../../service/admin/Permission';
import rolePermission from '../../../service/admin/PermissionDetails';
import Modal from "./Modal_ThongBao_NotMail";
import { toast, ToastContainer } from 'react-toastify';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
const Table_NotPermission = () => {
    const [entityPermission, setEntityPermission] = useState([]);
    const [data, setData] = useState([]);

    const [sortColumn, setSortColumn] = useState('');
    const [sortBy, setSortBy] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchItem, setSearchItem] = useState('');
    const navigate = useNavigate();
    const [selectAll, setSelectAll] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const searchParams = new URLSearchParams(location.search);
    const role = searchParams.get('role');

    const findlAllNotRole = async () => {
        try {
            if (role == "ADMIN" || role == "ADMINV1" || role == "SELLER" || role == "USER") {
                toast.warn("Bạn hông có quyền này");
                setData([]);
                setCurrentPage(0);
            } else {
                const response = await permission.findlAllNotRole({ page: currentPage, size: 10, role, searchItem, sortColumn, sortBy });
                console.log("content: " + response.data.result.content);
                setData(response.data.result);
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < data.totalPages) {
            setCurrentPage(newPage);
            console.log("newPage: " + newPage);
        }
    };

    const handlePrevious = () => {
        handlePageChange(currentPage - 1);
    };

    const handleNext = () => {
        handlePageChange(currentPage + 1);
    };

    const createRolePermission = async () => {
        const form = {
            permission: entityPermission,
            role: role,
        };
        console.log("form - permission : " + form.permission);

        try {
            const response = await rolePermission.create({ data: form });
            if (response.data.code === 1000) {
                toast.success(response.data.message);
            }
            findlAllNotRole();
            setEntityPermission([]);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error: " + error);
        }
    };

    const handleConfirm = () => {
        createRolePermission();
        setIsOpen(false);
    };
    useEffect(() => {
        findlAllNotRole();
        console.log("entityPermission: " + entityPermission);

    }, [currentPage, searchItem, role, sortBy, sortColumn, entityPermission]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleExport = async () => {
        const sheetNames = ['Danh Sách chi tiết quyền của quyền ' + role];
        try {
            console.log("data.totalElements: " + data.totalElements);
            const response = await permission.findlAllNotRole({ page: currentPage, size: data.totalElements, role, searchItem, sortColumn, sortBy });
            return ExportExcel("Danh Sách nhân viên.xlsx", sheetNames, [response.data.result.content]);
        } catch (error) {
            console.error("Đã xảy ra lỗi khi xuất Excel:", error.response ? error.response.data : error.message);
            toast.error("Có lỗi xảy ra khi xuất dữ liệu");
        }
    }
    const handleGoBack = () => {
        navigate(-1);
    };
    const handleCheckboxChange = (id, isChecked) => {
        setEntityPermission((prev) => {
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
        const response = await permission.findlAllNotRole({ page: currentPage, size: data.totalElements, role, searchItem, sortColumn, sortBy });
        if (isChecked) {
            const allIds = response.data.result.content.map((entity) => entity.id);
            setEntityPermission(allIds);
        } else {
            setEntityPermission([]);
        }
    };
    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <ToastContainer />
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-semibold text-xl text-black dark:text-white">
                    Thêm Danh Sách Quyền Mới
                </h3>
            </div>
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
                            setIsOpen(true);
                        }}
                        className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
                    >
                        Thêm
                    </button>
                    <button onClick={handleGoBack}
                        className="inline-flex items-center justify-center rounded-md bg-gray-600 py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
                    >
                        Quay Lại
                    </button>
                </form>



            </div>
            <table className="w-full border-collapse border border-stroke dark:border-strokedark">
                <thead>
                    <tr className="border-t border-stroke dark:border-strokedark">
                        <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">#</th>
                        <th
                            onClick={() => {
                                setSortColumn("id");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1">
                                <span className="text-sm text-black dark:text-white">Mã </span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "id" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "id" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("cotSlug");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white ">Quyền</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "cotSlug" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "cotSlug" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("description");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white">Mô tả</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "description" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "description" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>
                        <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={(e) => handleSelectAll(e.target.checked)}
                                className=" w-4 h-4 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 "

                            />
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {data?.content?.map((entity, index) => (
                        <tr key={index} className="border-t border-stroke dark:border-strokedark">
                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                {index + 1}
                            </td>
                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                                <p className="text-sm text-black dark:text-white truncate w-24">{entity.id}</p>
                            </td>
                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                <div className="flex items-center gap-1 hidden xl:flex">
                                    {entity.cotSlug}
                                </div>
                            </td>
                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                <div className="flex items-center gap-1 hidden xl:flex">
                                    {entity.description}
                                </div>
                            </td>

                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 ">
                                <div className="flex space-x-3.5">
                                    <input
                                        type="checkbox"
                                        checked={entityPermission.includes(entity.id)}
                                        onChange={(e) => handleCheckboxChange(entity.id, e.target.checked)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                pageNumber={currentPage || 0}
                totalPages={data?.totalPages || 0}
                totalElements={data?.totalElements || 0}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                setPageNumber={setCurrentPage}
                size={data.size || 0}></Pagination>
            <Modal
                open={isOpen}
                setOpen={setIsOpen}
                title={'Thêm quyền'}
                message={'Bạn chắc chắn muốn thêm quyền này không?'}
                onConfirm={handleConfirm}
                confirmText={'Xác Nhận'}
                cancelText="Thoát"
                icon={
                    <NoSymbolIcon className="h-6 w-6 text-white" />
                }
                iconBgColor={'bg-success'}
                buttonBgColor={'bg-success'} />
        </div>
    );
};

export default Table_NotPermission;
