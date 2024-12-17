import React, { useState, useEffect } from 'react';
import { ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { TrashIcon, ReceiptRefundIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import Modal from "./Modal_ThongBao_NotMail";
import permission from '../../../service/admin/Permission';
import rolePermission from '../../../service/admin/PermissionDetails';
import { toast, ToastContainer } from 'react-toastify';
import { ExportExcel } from '../../../service/admin/ExportExcel';
import Pagination from './Pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TableTwo = () => {
    const location = useLocation();  // Dùng useLocation để lấy thông tin URL hiện tại
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    // const [option, setOption] = useState('ADMINV1');
    const [searchItem, setSearchItem] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortBy, setSortBy] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [entityRolePermission, setentityRolePermission] = useState([]);
    const [isOpen, setIsOpen] = useState(false);



    const searchParams = new URLSearchParams(location.search);
    const role = searchParams.get('role');

    const handleGoBack = () => {
        navigate(-1);  // "-1" để quay lại trang trước đó
    };

    const findAllPermission = async () => {
        try {
            if (role == "ADMIN" || role == "ADMINV1" || role == "SELLER" || role == "USER") {
                toast.warn("Bạn hông có quyền này");
                setData([]);
                setCurrentPage(0);
            } else {
                const response = await permission.findAllByRole({ page: currentPage, size: 10, role, searchItem, sortColumn, sortBy });
                console.log("content: " + response.data.result.content);
                setData(response.data.result);
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    const deleteRolePermission = async () => {
        try {
            const response = await rolePermission.delete({ id: entityRolePermission.id });
            findAllPermission();
            if (response.data.code === 1000) {
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error: " + error);
        }
    };

    const handleConfirm = () => {
        setIsOpen(false);
        deleteRolePermission();
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
        findAllPermission();
    }, [searchItem, role, currentPage, sortBy, sortColumn]);

    const handleExport = async () => {
        const sheetNames = ['Danh Sách Quyền'];
        try {
            console.log("totalElements: " + data.totalElements);
            const response = await permission.findAllByRole({ page: currentPage, size: data.totalElements === 0 ? 5 : data.totalElements, role, searchItem, sortColumn, sortBy });
            if (!response || response.data.result.totalElements === 0) {
                toast.error("Không có dữ liệu");
            } else {
                return ExportExcel("Danh Sách Quyền.xlsx", sheetNames, [response.data.result.content]);
            }
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
                    <div className="relative pt-3">

                        <input
                            value={searchItem}
                            onChange={(e) => {
                                setSearchItem(e.target.value);
                                setCurrentPage(0);
                            }}
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-50" />

                    </div>
                </form>
                <form onSubmit={handleSubmit}
                    className="flex items-center space-x-2">
                   
                    <Link to={`/admin/quanLy/phanquyen/notpermission?role=${role}`} >
                        <button
                            className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
                        >
                            Thêm
                        </button>
                    </Link>
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
                                setSortColumn("v.permission.cotSlug");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1">
                                <span className="text-sm text-black dark:text-white">Tên quyền </span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "v.permission.cotSlug" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "v.permission.cotSlug" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("v.permission.description");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white ">Mô tả</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "v.permission.description" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "v.permission.description" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>
                        <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <span className="text-sm text-black dark:text-white truncate w-24">Hàng động</span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {data?.content?.map((entity, index) => (
                        <tr key={index} className="border-t border-stroke dark:border-strokedark">
                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                {data.pageable.pageNumber * data.size + index + 1}
                            </td>
         
                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                <div className="flex items-center gap-1 hidden xl:flex">
                                    {entity.permission.cotSlug}
                                </div>
                            </td>
                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                <div className="flex items-center gap-1 hidden xl:flex">
                                    {entity.permission.description}
                                </div>
                            </td>

                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                                <div className="flex space-x-3.5">
                                    <button onClick={() => {
                                        setentityRolePermission(entity);
                                        setIsOpen(true);
                                    }}>
                                        {!entity.delete ? (<TrashIcon className='w-5 h-5 text-black hover:text-red-600  dark:text-white' />) : (<ReceiptRefundIcon className='w-5 h-5 text-black hover:text-yellow-600  dark:text-white' />)}
                                    </button>
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
                title={'Xóa quyền'}
                message={'Bạn chắc chắn muốn xóa quyền này không?'}
                onConfirm={handleConfirm}
                confirmText={'Xác Nhận'}
                cancelText="Thoát"
                icon={
                    <TrashIcon className="h-6 w-6 text-red-600" />
                }
                iconBgColor={'bg-red-100'}
                buttonBgColor={'bg-red-600'} />
        </div >
    );
};

export default TableTwo;
