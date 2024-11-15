import React, { useState, useEffect } from 'react';
import { ArrowLongDownIcon, ArrowPathIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { TrashIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import flashSale from '../../../service/admin/FlashSale';
import flashSaleDetails from '../../../service/admin/FlashSaleDetails';
import ModalFlashSale from "./Model_FlashSaleCTInsert";
import Modal from "./ModalThongBao";

const Modal_FlashSaleCT = ({
    statusFillAll,
    setStatusFillAll,
    entityFlashSale,
    open,
    setOpen,
    title
}) => {
    const initialFormData = {
        id: '',
        dateStart: '',
        dateEnd: '',
        account: '',
    };
    const [formData, setFormData] = useState(initialFormData);
    const [dataProduct, setdataProduct] = useState([]);
    const [Product, setProduct] = useState([]);
    const [sortColumn, setSortColumn] = useState('');
    const [sortBy, setSortBy] = useState(true);
    const [currentPage, setCurrentPage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [statusentity, setStatusentity] = useState(false);
    const [status, setStatus] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            id: entityFlashSale.id,
            account: sessionStorage.getItem("id_account"),
        }));
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < dataProduct.totalPages) {
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
    const getPagesToShow = () => {
        const totalPages = dataProduct?.totalPages || 0;
        const current = currentPage ?? 0;
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

    const findListNotFalshSale = async () => {
        try {
            const response = await flashSaleDetails.findListNotFalshSale({ id: entityFlashSale.id, page: currentPage, size: 2, sortColumn, sortBy });
            console.log("entityFlashSale.id: " + entityFlashSale.id);
            setdataProduct(response.data.result);
            setCurrentPage(response.data.result.pageable.pageNumber);
            console.log(dataProduct);
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    const findListByFlashSale = async () => {
        try {
            const response = await flashSaleDetails.findListNotFalshSale({ id: entityFlashSale.id, page: currentPage, size: 2, sortColumn, sortBy });
            // console.log("content: " + response.data.result.content);
            setdataProduct(response.data.result);
            setCurrentPage(response.data.result.pageable.pageNumber);
            console.log(dataProduct);
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    const deleteFlashSaleDetails = async (id) => {
        try {
            const response = await flashSaleDetails.delete({ id });
            console.log("Code: " + response.data.result.code);
            console.log("Data: " + response.data.result.content);
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    const putFlashSale = async () => {
        try {
            const response = await flashSale.put({ data: formData });
            setStatusFillAll(!statusFillAll);
            console.log("Code: " + response.data.result.code);
            console.log("Data: " + response.data.result.content);
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    const handleConfirm = () => {
        setIsOpen(false);
        deleteFlashSaleDetails(Product.id);
    };

    const handleSubmit = (e) => {
        putFlashSale();
        setFormData(initialFormData);
        e.preventDefault(); // Chặn hành vi reload trang khi submit form
        setOpen(false); // Đóng modal sau khi submit
    };

    useEffect(() => {
        findListNotFalshSale();
        console.log("currentPage: " + currentPage);
    }, [entityFlashSale, currentPage, formData.dateStart, formData.dateEnd, status]);

    const formatToDateTimeLocal = (dateString) => {
        if (!dateString) return "";

        // Chia chuỗi theo định dạng "dd/MM/yyyy HH:mm:ss"
        const [datePart, timePart] = dateString.split(" ");
        const [day, month, year] = datePart.split("/");
        const [hours, minutes] = timePart.split(":");

        // Ghép thành định dạng "yyyy-MM-ddTHH:mm"
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    useEffect(() => {
        console.log("entityFlashSale.dateStart: " + entityFlashSale.dateStart);
        console.log("entityFlashSale.dateEnd: " + entityFlashSale.dateEnd);
        setFormData({
            dateStart: formatToDateTimeLocal(entityFlashSale.dateStart),
            dateEnd: formatToDateTimeLocal(entityFlashSale.dateEnd),
            account: entityFlashSale.id || "",
        });
    }, [entityFlashSale]);

    const formatNumber = (number, decimals = 2) => {
        if (number === null || number === undefined || isNaN(number)) {
            return '0.00';
        }
        return number.toFixed(decimals);
    };
    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-999999">
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-6xl h-150 sm:h-3/4">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-semibold text-xl text-black dark:text-white">
                                {title}
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Ngày bắt đầu
                                        </label>
                                        <input
                                            name="dateStart"
                                            value={formData.dateStart}
                                            onChange={handleChange}
                                            type="datetime-local"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Ngày kết thúc
                                        </label>
                                        <input
                                            name="dateEnd"
                                            value={formData.dateEnd}
                                            onChange={handleChange}
                                            type="datetime-local"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                                >
                                    Cập nhật
                                </button>
                            </div>

                        </form>
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
                                            <span className="text-sm text-black dark:text-white">Sản phẩm </span>
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
                                            <span className="text-sm text-black dark:text-white ">Giá ban đầu</span>
                                            <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                            <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                                        </div>
                                    </th>

                                    <th
                                        onClick={() => {
                                            setSortColumn("sale");
                                            setSortBy(!sortBy);
                                        }}
                                        className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                        <div className="flex items-center gap-1 hidden xl:flex">
                                            <span className="text-sm text-black dark:text-white">Sale</span>
                                            <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                            <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                                        </div>
                                    </th>

                                    <th
                                        onClick={() => {
                                            setSortColumn("quantity");
                                            setSortBy(!sortBy);
                                        }}
                                        className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                        <div className="flex items-center gap-1 hidden xl:flex">
                                            <span className="text-sm text-black dark:text-white">Số lượng kho</span>
                                            <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                            <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                                        </div>
                                    </th>
                                    <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                        <span className="text-sm text-black dark:text-white truncate w-24">Actions</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataProduct?.content?.map((entity, index) => (
                                    <tr key={index} className="border-t border-stroke dark:border-strokedark">
                                        <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                            {index + 1}
                                        </td>
                                        <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                                            <p className="text-sm text-black dark:text-white truncate w-24">{entity.name}</p>
                                        </td>
                                        <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                            <div className="flex items-center gap-1 hidden xl:flex">
                                                {`${formatNumber(entity.price)} VNĐ`}
                                            </div>
                                        </td>
                                        <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                            <div className="flex items-center gap-1 hidden xl:flex">
                                                {`${formatNumber(entity.sale)} VNĐ`}
                                            </div>
                                        </td>
                                        <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                            <div className="flex items-center gap-1 hidden xl:flex">
                                                {entity.quantity}
                                            </div>
                                        </td>

                                        <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                                            <div className="flex space-x-3.5">
                                                <button onClick={() => {
                                                    setProduct(entity);
                                                    setIsOpen(true);
                                                    setStatusentity(!entity.delete);
                                                }}>
                                                    <ArrowPathIcon className='w-5 h-5 text-black hover:text-green-600  dark:text-white' />
                                                </button>
                                                <button onClick={() => {
                                                    setProduct(entity);
                                                    setIsOpenDelete(true);
                                                }}>
                                                    {!entity.delete ? (<TrashIcon className='w-5 h-5 text-black hover:text-red-600  dark:text-white' />) : (<ReceiptRefundIcon className='w-5 h-5 text-black hover:text-yellow-600  dark:text-white' />)}
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="py-3 flex border-t border-stroke  dark:border-strokedark  px-4 md:px-6 xl:px-7.5">
                            <div className="flex flex-1 justify-between sm:hidden">
                                <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                                <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700 dark:text-white ">
                                        Showing
                                        <span className="font-medium"> {dataProduct?.pageable?.pageNumber * dataProduct.size + 1} </span>
                                        to
                                        <span className="font-medium"> {dataProduct.totalElements > (dataProduct.size * currentPage) ? ((dataProduct?.pageable?.pageNumber + 1) * dataProduct.size < dataProduct.totalElements ? (dataProduct?.pageable?.pageNumber + 1) * dataProduct.size : dataProduct.totalElements) : dataProduct.totalElements} </span>
                                        of
                                        <span className="font-medium"> {dataProduct.totalElements} </span>
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
                                            disabled={currentPage === dataProduct.totalPages - 1}
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
                        <ModalFlashSale
                            product={Product}
                            flashSaleId={entityFlashSale.id}
                            open={isOpen}
                            setOpen={setIsOpen}
                            title={statusentity
                                ? 'Ngừng Hoạt Động'
                                : 'Khôi Phục'}
                            message={statusentity
                                ? 'Bạn chắc chắn muốn ngừng hoạt động sản phẩm này không?'
                                : 'Bạn có chắc muốn khôi phục sản phẩm này không?'}
                            // onConfirm={handleConfirm}
                            confirmText={statusentity ? 'Xác Nhận' : 'Khôi Phục'}
                            cancelText="Thoát"
                            icon={statusentity ? (
                                <TrashIcon className="h-6 w-6 text-red-600" />
                            ) : (
                                <ReceiptRefundIcon className="h-6 w-6 text-yellow-600" />
                            )}
                            iconBgColor={statusentity ? 'bg-red-100' : 'bg-yellow-100'}
                            buttonBgColor={statusentity ? 'bg-red-600' : 'bg-yellow-600'}
                            status={status}
                            setStatus={setStatus} />
                        <Modal
                            open={isOpenDelete}
                            setOpen={setIsOpenDelete}
                            title={'Ngừng Hoạt Động'}
                            message={'Bạn chắc chắn muốn ngừng hoạt động sản phẩm này không?'}
                            onConfirm={handleConfirm}
                            confirmText={'Xác Nhận'}
                            cancelText="Thoát"
                            icon={
                                <TrashIcon className="h-6 w-6 text-red-600" />
                            }
                            iconBgColor={'bg-red-100'}
                            buttonBgColor={'bg-red-600'} />
                    </DialogPanel>
                </div>
            </div>
        </Dialog >
    );
};

export default Modal_FlashSaleCT;
