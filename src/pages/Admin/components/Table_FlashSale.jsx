import React, { useState, useEffect } from 'react';
import { ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { TrashIcon, ReceiptRefundIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import Modal from "./ModalThongBao";
import ModalFlashSale from './ModalFlaseSale';
import ModalFlashSaleCT from './Modal_FlashSaleCT';
import flashSale from '../../../service/admin/FlashSale';
import { ExportExcel } from '../../../service/admin/ExportExcel';
import Pagination from './Pagination';

const TableTwo = ({ onPageChange, onIdChange, entityData, status,
    setStatus }) => {
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortBy, setSortBy] = useState(true);
    const [currentPage, setCurrentPage] = useState(entityData?.pageable?.pageNumber == undefined ? 0 : entityData?.pageable?.pageNumber);
    const [isOpenModalSP, setIsOpenModalSP] = useState(false);
    const [isOpenModalCT, setIsOpenModalCT] = useState(false);
    const [entityFlashSale, setEntityFlashSale] = useState([]);

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
        setCurrentPage(currentPage - 1);
        handlePageChange(currentPage);
    };

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
        handlePageChange(currentPage);
    };

    useEffect(() => {
        onPageChange(dateStart, dateEnd, currentPage, sortBy, sortColumn);
        console.log("pageNumber: " + currentPage);
        console.log("totalPages: " + entityData?.totalPages);
        console.log("totalElements: " + entityData?.totalElements);
        console.log("setPageNumber: " + currentPage);
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

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="py-6 flex justify-between px-4 md:px-6 xl:px-7.5">
                <form method="POST">
                    <div className="relative pt-3">
                        <input
                            value={dateStart}
                            onChange={(e) => {
                                setDateStart(e.target.value);
                                setCurrentPage(0);
                            }}
                            type="date"
                            placeholder="Tìm kiếm..."
                            className="w-1/2 bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-100" />
                        <input
                            value={dateEnd}
                            onChange={(e) => {
                                setDateEnd(e.target.value);
                                setCurrentPage(0);
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
                            <span className="text-sm text-black dark:text-white truncate w-24">Hành động</span>
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
                                    <button onClick={() => {
                                        setId(entity.id);
                                        setIsOpen(true);
                                        setStatusentity(!entity.delete);
                                    }}>
                                        {!entity.delete ? (<TrashIcon className='w-5 h-5 text-black hover:text-red-600  dark:text-white' />) : (<ReceiptRefundIcon className='w-5 h-5 text-black hover:text-yellow-600  dark:text-white' />)}
                                    </button>
                                    <button onClick={() => {
                                        setEntityFlashSale(entity);
                                        setIsOpenModalCT(true);
                                        // setId(entity.id);
                                    }}>
                                        <ArrowPathIcon className='w-5 h-5 text-black hover:text-green-600  dark:text-white' />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                pageNumber={currentPage}
                totalPages={entityData?.totalPages}
                totalElements={entityData?.totalElements}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                setPageNumber={setCurrentPage}
                size={entityData.size}></Pagination>

            <Modal
                open={isOpen}
                setOpen={setIsOpen}
                title={'Xóa'}
                message={'Bạn chắc chắn muốn xóa Flashsale này không?'}
                onConfirm={handleConfirm}
                confirmText={'Xác Nhận'}
                cancelText="Thoát"
                icon={<TrashIcon className="h-6 w-6 text-red-600" />}
                iconBgColor={'bg-red-100'}
                buttonBgColor={'bg-red-600'} />
            <ModalFlashSale
                status={status}
                setStatus={setStatus}
                open={isOpenModalSP}
                setOpen={setIsOpenModalSP}
                title="Thêm Sản Phẩm Mới"
                confirmText="Lưu"
                cancelText="Hủy"
            />
            <ModalFlashSaleCT
                statusFillAll={status}
                setStatusFillAll={setStatus}
                entityFlashSale={entityFlashSale}
                open={isOpenModalCT}
                setOpen={setIsOpenModalCT}
                title="Cập nhật Flash sale"
            />
        </div>
    );
};

export default TableTwo;
