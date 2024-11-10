import React, { useState, useEffect } from 'react';
import { ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { TrashIcon, ReceiptRefundIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import Modal from "./ModalThongBao";
import ModalFlashSale from './ModalFlaseSale';
import flashSale from '../../../service/admin/FlashSale';
import { ExportExcel } from '../../../service/admin/ExportExcel';
// import { usePDF } from 'react-to-pdf';

const TableTwo = ({ onPageChange, onIdChange, entityData }) => {
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortBy, setSortBy] = useState(true);
    const currentPage = entityData?.pageable?.pageNumber == undefined ? 0 : entityData?.pageable?.pageNumber;
    const [isOpenModalSP, setIsOpenModalSP] = useState(false);

    const [id, setId] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [statusentity, setStatusentity] = useState(false);
    const handleConfirm = () => {
        setIsOpen(false);
        onIdChange(id);
    };
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < entityData.totalPages) {
            onPageChange(dateStart, dateEnd, newPage, sortBy, sortColumn);
            console.log("currentPage: " + newPage);
        }
    };

    const handlePrevious = () => {
        handlePageChange(entityData?.pageable?.pageNumber - 1);
    };

    const handleNext = () => {
        handlePageChange(entityData?.pageable?.pageNumber + 1);
    };
    const getPagesToShow = () => {
        const totalPages = entityData?.totalPages || 0;
        const current = entityData?.pageable?.pageNumber ?? 0;
        const pages = [];
        const maxPagesToShow = 5;

        let start = Math.max(0, current - Math.floor(maxPagesToShow / 2));
        let end = Math.min(totalPages - 1, start + maxPagesToShow - 1);

        if (end - start + 1 < maxPagesToShow) {
            start = Math.max(0, end - maxPagesToShow + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    useEffect(() => {
        onPageChange(dateStart, dateEnd, currentPage, sortBy, sortColumn);
    }, [dateStart, dateEnd, currentPage, sortBy, sortColumn]);
    ;
    const handleExport = async () => {
        const sheetNames = ['Danh Sách FlashSale'];
        try {
            console.log("totalElements: " + entityData.totalElements);
            const response = await flashSale.findAllFlashSale({ dateStart, dateEnd, currentPage, size: entityData.totalElements, sortColumn, sortBy });
            return ExportExcel("Danh Sách FlashSale.xlsx", sheetNames, [response.data.result.content]);
        } catch (error) {
            console.error("Đã xảy ra lỗi khi xuất Excel:", error.response ? error.response.data : error.message);
            toast.error("Có lỗi xảy ra khi xuất dữ liệu");
        }
    }
    // const { toPDF, targetRef } = usePDF({ filename: 'Thống kê doanh thu admin.pdf' });

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="py-6 flex justify-between px-4 md:px-6 xl:px-7.5">
                <form action="https://formbold.com/s/unique_form_id" method="POST">
                    <div className="relative pt-3">
                        <input
                            value={dateStart}
                            onChange={(e) => {
                                setDateStart(e.target.value);
                            }}
                            type="date"
                            placeholder="Tìm kiếm..."
                            className="w-1/2 bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-100" />
                        <input
                            value={dateEnd}
                            onChange={(e) => {
                                setDateEnd(e.target.value);
                            }}
                            type="date"
                            placeholder="Tìm kiếm..."
                            className="w-1/2 bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-100" />
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
                        onClick={() => setIsOpenModalSP(true)}
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
                                setSortColumn("account.fullname");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1">
                                <span className="text-sm text-black dark:text-white">Người tạo </span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("dateStart");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white ">Ngày bắt đầu</span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("dateEnd");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white">Ngày kết thúc</span>
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
                            <span className="text-sm text-black dark:text-white truncate w-24">Actions</span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {entityData?.content?.map((entity, index) => (
                        <tr key={index} className="border-t border-stroke dark:border-strokedark">
                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                {entityData.pageable.pageNumber * entityData.size + index + 1}
                            </td>
                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                                <p className="text-sm text-black dark:text-white truncate w-24">{entity.account.fullname}</p>
                            </td>
                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                <div className="flex items-center gap-1 hidden xl:flex">
                                    {entity.dateStart}
                                </div>
                            </td>
                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                <div className="flex items-center gap-1 hidden xl:flex">
                                    {entity.dateEnd}
                                </div>
                            </td>

                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 ">
                                <div className="flex items-center gap-1 hidden lg:flex">
                                    <span className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${!entity.delete ? 'bg-success text-success' : 'bg-danger text-danger'}`}>
                                        {!entity.delete ? 'Hoạt Động' : 'Đã Ngừng'}
                                    </span>
                                </div>
                            </td>
                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                                <div className="flex space-x-3.5">
                                    <button onClick={() => { setId(entity.id); setIsOpen(true); setStatusentity(!entity.delete); }}>
                                        {!entity.delete ? (<TrashIcon className='w-5 h-5 text-black hover:text-red-600  dark:text-white' />) : (<ReceiptRefundIcon className='w-5 h-5 text-black hover:text-yellow-600  dark:text-white' />)}
                                    </button>
                                    <button onClick={() => {
                                        setIsOpenModalSP(true);
                                        setId(entity.id);
                                    }}>
                                        <ArrowPathIcon className='w-5 h-5 text-black hover:text-green-600  dark:text-white' />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="py-6 flex border-t border-stroke  dark:border-strokedark  px-4 md:px-6 xl:px-7.5">
                <div className="flex flex-1 justify-between sm:hidden">
                    <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                    <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700 dark:text-white ">
                            Showing
                            <span className="font-medium"> {entityData?.pageable?.pageNumber * entityData.size + 1} </span>
                            to
                            <span className="font-medium"> {entityData.totalElements > (entityData.size * currentPage) ? ((entityData?.pageable?.pageNumber + 1) * entityData.size < entityData.totalElements ? (entityData?.pageable?.pageNumber + 1) * entityData.size : entityData.totalElements) : entityData.totalElements} </span>
                            of
                            <span className="font-medium"> {entityData.totalElements} </span>
                            results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm " aria-label="Pagination">
                            <button
                                onClick={handlePrevious} disabled={currentPage === 0}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                <span className="sr-only">Previous</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                                </svg>
                            </button>
                            {/* Pagination buttons */}
                            {getPagesToShow().map((page) => (
                                <button key={page} onClick={() => handlePageChange(page)}
                                    className="relative dark:text-white hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                                >
                                    {page + 1}
                                </button>
                            ))}


                            <button
                                onClick={handleNext}
                                disabled={currentPage === entityData.totalPages - 1}
                                className="relative dark:text-white inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                <span className="sr-only">Next</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>

            <Modal
                id={id}
                open={isOpen}
                setOpen={setIsOpen}
                title={statusentity
                    ? 'Ngừng Hoạt Động'
                    : 'Khôi Phục'}
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
            <ModalFlashSale
                open={isOpenModalSP}
                setOpen={setIsOpenModalSP}
                title="Thêm Sản Phẩm Mới"
                confirmText="Lưu"
                cancelText="Hủy"
            />
        </div>
    );
};

export default TableTwo;
