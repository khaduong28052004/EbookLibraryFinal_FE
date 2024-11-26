import React, { useState, useEffect } from 'react';
import { ArrowLongDownIcon, TrashIcon, ArrowPathIcon, ArrowLongUpIcon, PlusIcon} from '@heroicons/react/24/solid'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import permission from '../../../service/admin/Permission';
import rolePermission from '../../../service/admin/PermissionDetails';
import Modal from "./ModalThongBao";
import { toast, ToastContainer } from 'react-toastify';
import Pagination from './Pagination';

const Table_NotPermission = ({
    status,
    setStatus,
    optionRole,
    open,
    setOpen,
    title
}) => {
    const [entityPermission, setEntityPermission] = useState([]);
    const [data, setData] = useState([]);
    const [sortColumn, setSortColumn] = useState('');
    const [sortBy, setSortBy] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const [isOpen, setIsOpen] = useState(false);

    const findlAllNotRole = async () => {
        try {
            const response = await permission.findlAllNotRole({ page: currentPage, size: 5, role: optionRole, sortColumn, sortBy });
            console.log("content: " + response.data.result.content);
            setData(response.data.result);
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
            permission: entityPermission.id,
            role: optionRole,
        };
        console.log("form - permission : " + form.permission);

        try {
            const response = await rolePermission.create({ data: form });
            if (response.data.code === 1000) {
                toast.success(response.data.message);
            } 
            findlAllNotRole();
            setStatus(!status);
        } catch (error) {
            toast.error("Lỗi hệ thống");
            console.log("Error: " + error);
        }
    };

    const handleConfirm = () => {
        createRolePermission();
        setIsOpen(false);
    };
    useEffect(() => {
        findlAllNotRole();
    }, [currentPage, optionRole, open, sortBy, sortColumn]);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-999999">
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <ToastContainer></ToastContainer>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-6xl h-150 sm:h-3/4">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-semibold text-xl text-black dark:text-white">
                                {title}
                            </h3>
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
                                            <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                            <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
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
                                            <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                            <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
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
                                                <button onClick={() => {
                                                    setEntityPermission(entity);
                                                    setIsOpen(true);
                                                }}>
                                                    <PlusIcon className='w-5 h-5 text-black hover:text-success  dark:text-white' />
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
                            size={data.size}></Pagination>
                        <Modal
                            open={isOpen}
                            setOpen={setIsOpen}
                            title={'Thêm quyền'}
                            message={'Bạn chắc chắn muốn thêm quyền này không?'}
                            onConfirm={handleConfirm}
                            confirmText={'Xác Nhận'}
                            cancelText="Thoát"
                            icon={
                                <TrashIcon className="h-6 w-6 text-white" />
                            }
                            iconBgColor={'bg-success'}
                            buttonBgColor={'bg-success'} />
                    </DialogPanel>
                </div>
            </div>
        </Dialog >
    );
};

export default Table_NotPermission;
