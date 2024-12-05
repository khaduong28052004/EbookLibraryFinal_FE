import React, { useState, useEffect } from 'react';
<<<<<<< Updated upstream
import { ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { ReceiptRefundIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import Modal from "./Modal_ThongBao_NotMail";
import flashSale from '../../../service/admin/FlashSale';
import Pagination from './Pagination';

const TableTwo = () => {
    const initialFormData = {
        dateStart: entityFlashSale.dateStart || '',
        dateEnd: entityFlashSale.dateEnd || '',
        id: entityFlashSale.id || '',
        account: sessionStorage.getItem("id_account")
    };
    const [formData, setFormData] = useState(initialFormData);
    const [Product, setProduct] = useState([]);
=======
import { ArrowLongDownIcon, ArrowPathIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { TrashIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import flashSale from '../../../service/admin/FlashSale';
import flashSaleDetails from '../../../service/admin/FlashSaleDetails';
import ModalFlashSaleDetails from "./Model_FlashSaleCTInsert";
import Modal from "./Modal_ThongBao_NotMail";
import Pagination from './Pagination';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const TableTwo = () => {

    const [Product, setProduct] = useState([]);
    const [entityFlashSale, setEntityFlashSale] = useState([]);

>>>>>>> Stashed changes
    const [entityFlashSaleDetails, setEntityFlashSaleDetailst] = useState([]);
    const [dataProduct, setdataProduct] = useState([]);
    const [sortColumnProduct, setSortColumnProduct] = useState('');
    const [sortByProduct, setSortByProduct] = useState(true);
    const [currentPageProduct, setCurrentPageProduct] = useState(0);

    const [ProductNotProduct, setProductNotProduct] = useState([]);
    const [dataProductNotFS, setdataProductNotFS] = useState([]);
    const [sortColumnNotProduct, setSortColumnNotProduct] = useState('');
    const [sortByNotProduct, setSortByNotProduct] = useState(true);
    const [currentPageNotProduct, setCurrentPageNotProduct] = useState(0);

    const [post, setPost] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [status, setStatus] = useState(true);

<<<<<<< Updated upstream
=======
    const [formData, setFormData] = useState('');

    const location = useLocation();  // Dùng useLocation để lấy thông tin URL hiện tại
    const navigate = useNavigate();

    // Lấy voucher_id từ query parameters
    const searchParams = new URLSearchParams(location.search);
    const flashsale_id = searchParams.get('flashsale_id');


    const handleGoBack = () => {
        navigate(-1);  // "-1" để quay lại trang trước đó
    };

>>>>>>> Stashed changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
<<<<<<< Updated upstream
            id: entityFlashSale.id || '',
=======
            id: flashsale_id || '',
>>>>>>> Stashed changes
            account: sessionStorage.getItem("id_account")
        }));
    };

    const handlePageChangeProduct = (newPage) => {
        if (newPage >= 0 && newPage < dataProduct.totalPages) {
            setCurrentPageProduct(newPage);
            console.log("setCurrentPageProduct: " + newPage);
        }
    };

    const handlePreviousProduct = () => {
        handlePageChangeProduct(currentPageProduct - 1);
    };

    const handleNextProduct = () => {
        handlePageChangeProduct(currentPageProduct + 1);
    };
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < dataProductNotFS.totalPages) {
            setCurrentPageNotProduct(newPage);
            console.log("newPage: " + newPage);
        }
    };

    const handlePrevious = () => {
        handlePageChange(currentPageNotProduct - 1);
    };

    const handleNext = () => {
        handlePageChange(currentPageNotProduct + 1);
    };

<<<<<<< Updated upstream

    const findListNotFalshSale = async () => {
        try {
            const response = await flashSaleDetails.findListNotFalshSale({ id: entityFlashSale.id, page: currentPageNotProduct, size: 2, sortColumn: sortColumnNotProduct, sortBy: sortByNotProduct });
            console.log("entityFlashSale.id: " + entityFlashSale.id);
=======
    const findFalshSaleById = async () => {
        try {
            const response = await flashSale.findById({ id: flashsale_id });
            const flashSaleData = response.data.result;
            setEntityFlashSale(flashSaleData);
            setFormData({
                dateStart: formatToDateTimeLocal(flashSaleData.dateStart) || '',
                dateEnd: formatToDateTimeLocal(flashSaleData.dateEnd) || '',
                id: flashSaleData.id || '',
                account: sessionStorage.getItem("id_account")
            });

            console.log(flashSaleData);
        } catch (error) {
            console.log("Error: " + error);
        }
    };



    const findListNotFalshSale = async () => {
        try {
            const response = await flashSaleDetails.findListNotFalshSale({ id: flashsale_id, page: currentPageNotProduct, size: 2, sortColumn: sortColumnNotProduct, sortBy: sortByNotProduct });
>>>>>>> Stashed changes
            setdataProductNotFS(response.data.result);
            setCurrentPageNotProduct(response.data.result.pageable.pageNumber);
            console.log(dataProductNotFS);
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    const findListByFlashSale = async () => {
        try {
<<<<<<< Updated upstream
            const response = await flashSaleDetails.findListByFlashSale({ id: entityFlashSale.id, page: currentPageProduct, size: 2, sortColumn: sortColumnProduct, sortBy: sortByProduct });
=======
            const response = await flashSaleDetails.findListByFlashSale({ id: flashsale_id, page: currentPageProduct, size: 2, sortColumn: sortColumnProduct, sortBy: sortByProduct });
>>>>>>> Stashed changes
            setdataProduct(response.data.result);
            setCurrentPageProduct(response.data.result.pageable.pageNumber);
            console.log("setCurrentPageProduct" + currentPageProduct);
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    const deleteFlashSaleDetails = async (id) => {
        try {
            const response = await flashSaleDetails.delete({ id });
            toast.success("Xóa sản phẩm thành công");
            setStatus(!status);
<<<<<<< Updated upstream
            setIsOpen(false);
=======
>>>>>>> Stashed changes
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error: " + error);
        }
    }

    const putFlashSale = async () => {
        try {
            const response = await flashSale.put({ data: formData });
<<<<<<< Updated upstream
            setStatusFillAll(!statusFillAll);
            toast.success(response.data.message);
            setOpen(false);
=======
            toast.success(response.data.message);
>>>>>>> Stashed changes
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error: " + error);
        }
    }

    const handleConfirm = () => {
        deleteFlashSaleDetails(Product.id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (new Date(formData.dateStart) >= new Date(formData.dateEnd)) {
            toast.error("Ngày bắt đầu phải trước ngày kết thúc.");
            return;
        }
        putFlashSale();
    };

    useEffect(() => {
        findListNotFalshSale();
        findListByFlashSale();
<<<<<<< Updated upstream
    }, [entityFlashSale, currentPageProduct, currentPageNotProduct, sortByProduct, sortColumnProduct, sortByNotProduct, sortColumnNotProduct, status]);
=======
    }, [currentPageProduct, currentPageNotProduct, sortByProduct, sortColumnProduct, sortByNotProduct, sortColumnNotProduct, status]);
>>>>>>> Stashed changes

    const formatToDateTimeLocal = (dateString) => {
        if (!dateString) return "";

        // Chia chuỗi theo định dạng "dd/MM/yyyy HH:mm:ss"
        const [datePart, timePart] = dateString.split(" ");
        const [day, month, year] = datePart.split("/");
        const [hours, minutes] = timePart.split(":");

        // Ghép thành định dạng "yyyy-MM-ddTHH:mm"
<<<<<<< Updated upstream
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    useEffect(() => {
        setFormData({
            dateStart: formatToDateTimeLocal(entityFlashSale.dateStart),
            dateEnd: formatToDateTimeLocal(entityFlashSale.dateEnd),
            id: entityFlashSale.id || '',
            account: sessionStorage.getItem("id_account")
        });
    }, [entityFlashSale]);

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="py-6 flex justify-between px-4 md:px-6 xl:px-7.5">
                <form onSubmit={handleSubmit}>
                    <div className="p-6.5">
                        <div className="mb-4.5 grid gap-6 grid-cols-12">
                            <div className="col-span-5">
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

                            <div className="col-span-5">
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
                            <button
                                type="submit"
                                className="inline-flex mt-10 col-span-2 h-10 w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                            >
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='flex'>
                <div>
                    <table className="w-full border-collapse border border-stroke dark:border-strokedark">
                        <thead>
                            <tr className="border-t border-stroke dark:border-strokedark">
                                <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">#</th>
                                <th
                                    onClick={() => {
                                        setSortColumnNotProduct("name");
                                        setSortByNotProduct(!sortByNotProduct);
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
                                        setSortColumnNotProduct("price");
                                        setSortByNotProduct(!sortByNotProduct);
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
                                        setSortColumnNotProduct("sale");
                                        setSortByNotProduct(!sortByNotProduct);
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
                                        setSortColumnNotProduct("quantity");
                                        setSortByNotProduct(!sortByNotProduct);
                                    }}
                                    className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        <span className="text-sm text-black dark:text-white">Số lượng kho</span>
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
                            {dataProductNotFS?.content?.map((entity, index) => (
                                <tr key={index} className="border-t border-stroke dark:border-strokedark">
                                    <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                        {index + 1}
                                    </td>
                                    <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                                        <p className="text-sm text-black dark:text-white truncate w-24">{entity.name}</p>
                                    </td>
                                    <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                        <div className="flex items-center gap-1 hidden xl:flex">
                                            {entity.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                        </div>
                                    </td>
                                    <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                        <div className="flex items-center gap-1 hidden xl:flex">
                                            {entity.sale} %
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
                                                setProductNotProduct(entity);
                                                setIsOpen(true);
                                                setPost(true);
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
                        pageNumber={currentPageNotProduct || 0}
                        totalPages={dataProductNotFS?.totalPages || 0}
                        totalElements={dataProductNotFS?.totalElements || 0}
                        handlePrevious={handlePrevious}
                        handleNext={handleNext}
                        setPageNumber={setCurrentPageNotProduct}
                        size={dataProductNotFS.size}></Pagination>
                </div>
                <div>
=======
        console.log("dateformat: " + dateString)
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const formatDateStringToDate = (dateString1) => {
        console.log("dateforma222t: " + dateString1);

        const [datePart, timePart] = dateString1.split(" ");
        const [day, month, year] = datePart.split("/");
        const [hours, minutes, seconds] = timePart.split(":");

        // Tạo đối tượng Date từ các thành phần ngày, tháng, năm, giờ, phút, giây
        return new Date(year, month - 1, day, hours, minutes, seconds);
    };

    useEffect(() => {
        findFalshSaleById();
    }, []);

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <ToastContainer />
            <div className=" grid grid-cols-12 py-6  px-4 md:px-6 xl:px-7.5">
                <div className='col-span-12 mr-1 ml-auto flex pb-5'>
                    <button onClick={handleGoBack}
                        className="items-center flex justify-end rounded-md bg-gray-600 py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
                    >
                        Quay Lại
                    </button>
                </div>
                {/* {entityFlashSale.delete ? */}
                {entityFlashSale && entityFlashSale.dateStart && (entityFlashSale.delete || formatDateStringToDate(entityFlashSale.dateStart).getTime() <= new Date().getTime()) ?

                    (<></>) : (<>
                        <form onSubmit={handleSubmit} className='col-span-12'>
                            <div className="px-6.5">
                                <div className="mb-4.5 grid gap-6 grid-cols-12">
                                    <div className="col-span-5">
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

                                    <div className="col-span-5">
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
                                    <button
                                        type="submit"
                                        className="inline-flex mt-10 col-span-2 h-10 w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                                    >
                                        Cập nhật
                                    </button>

                                </div>
                            </div>
                        </form>
                        <div className='col-span-12'>
                            <table className="w-full border-collapse border border-stroke dark:border-strokedark">
                                <thead>
                                    <tr className="border-t border-stroke dark:border-strokedark">
                                        <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">#</th>
                                        <th
                                            onClick={() => {
                                                setSortColumnNotProduct("name");
                                                setSortByNotProduct(!sortByNotProduct);
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
                                                setSortColumnNotProduct("price");
                                                setSortByNotProduct(!sortByNotProduct);
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
                                                setSortColumnNotProduct("sale");
                                                setSortByNotProduct(!sortByNotProduct);
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
                                                setSortColumnNotProduct("quantity");
                                                setSortByNotProduct(!sortByNotProduct);
                                            }}
                                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                            <div className="flex items-center gap-1 hidden xl:flex">
                                                <span className="text-sm text-black dark:text-white">Số lượng kho</span>
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
                                    {dataProductNotFS?.content?.map((entity, index) => (
                                        <tr key={index} className="border-t border-stroke dark:border-strokedark">
                                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                                {index + 1}
                                            </td>
                                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                                                <p className="text-sm text-black dark:text-white truncate w-24">{entity.name}</p>
                                            </td>
                                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                                <div className="flex items-center gap-1 hidden xl:flex">
                                                    {entity.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                                </div>
                                            </td>
                                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                                <div className="flex items-center gap-1 hidden xl:flex">
                                                    {entity.sale} %
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
                                                        setProductNotProduct(entity);
                                                        setIsOpen(true);
                                                        setPost(true);
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
                                pageNumber={currentPageNotProduct || 0}
                                totalPages={dataProductNotFS?.totalPages || 0}
                                totalElements={dataProductNotFS?.totalElements || 0}
                                handlePrevious={handlePrevious}
                                handleNext={handleNext}
                                setPageNumber={setCurrentPageNotProduct}
                                size={dataProductNotFS.size}></Pagination>

                        </div>
                    </>)}
                <div className='col-span-12'>
>>>>>>> Stashed changes
                    <table className="w-full border-collapse border border-stroke dark:border-strokedark">
                        <thead>
                            <tr className="border-t border-stroke dark:border-strokedark">
                                <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">#</th>
                                <th
                                    onClick={() => {
                                        setSortColumnProduct("product.name");
                                        setSortByProduct(!sortByProduct);
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
                                        setSortColumnProduct("product.price");
                                        setSortByProduct(!sortByProduct);
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
                                        setSortColumnProduct("sale");
                                        setSortByProduct(!sortByProduct);
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
                                        setSortColumnProduct("quantity");
                                        setSortByProduct(!sortByProduct);
                                    }}
                                    className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                    <div className="flex items-center gap-1 hidden xl:flex">
<<<<<<< Updated upstream
                                        <span className="text-sm text-black dark:text-white">Số lượng sale</span>
=======
                                        <span className="text-sm text-black dark:text-white">
                                            {entityFlashSale.delete ? 'Số lượng còn lại' : 'Số lượng sale'}
                                        </span>
>>>>>>> Stashed changes
                                        <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                        <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                                    </div>
                                </th>
<<<<<<< Updated upstream
                                <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                    <span className="text-sm text-black dark:text-white truncate w-24">Hành động</span>
                                </th>
=======
                                {entityFlashSale && entityFlashSale.dateStart && (entityFlashSale.delete || formatDateStringToDate(entityFlashSale.dateStart).getTime() <= new Date().getTime()) ?
                                    (<></>) : (<>
                                        <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                            <span className="text-sm text-black dark:text-white truncate w-24">Hành động</span>
                                        </th>
                                    </>)}
>>>>>>> Stashed changes
                            </tr>
                        </thead>

                        <tbody>
                            {dataProduct?.content?.map((entity, index) => (
                                <tr key={index} className="border-t border-stroke dark:border-strokedark">
                                    <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                        {index + 1}
                                    </td>
                                    <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                                        <p className="text-sm text-black dark:text-white truncate w-24">{entity.product.name}</p>
                                    </td>
                                    <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                        <div className="flex items-center gap-1 hidden xl:flex">
                                            {(entity.product.price - (entity.product.price * entity.product.sale / 100)).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                        </div>
                                    </td>
                                    <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                        <div className="flex items-center gap-1 hidden xl:flex">
                                            {entity.sale} %
                                        </div>
                                    </td>
                                    <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                        <div className="flex items-center gap-1 hidden xl:flex">
<<<<<<< Updated upstream
                                            {entity.quantity}
                                        </div>
                                    </td>

                                    <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                                        <div className="flex space-x-3.5">
                                            <button onClick={() => {
                                                setProduct(entity);
                                                setIsOpenDelete(true);
                                            }}>
                                                {!entity.delete ? (<TrashIcon className='w-5 h-5 text-black hover:text-red-600  dark:text-white' />) : (<ReceiptRefundIcon className='w-5 h-5 text-black hover:text-yellow-600  dark:text-white' />)}
                                            </button>
                                            <button onClick={() => {
                                                setEntityFlashSaleDetailst(entity);
                                                setIsOpen(true);
                                                setPost(false);
                                            }}>
                                                <ArrowPathIcon className='w-5 h-5 text-black hover:text-green-600  dark:text-white' />
                                            </button>
                                        </div>
                                    </td>
=======
                                            {entity.quantity === 0 ? 'Đã hết' : entity.quantity}
                                        </div>
                                    </td>
                                    {entityFlashSale && entityFlashSale.dateStart && (entityFlashSale.delete || formatDateStringToDate(entityFlashSale.dateStart).getTime() <= new Date().getTime()) ?
                                        (<></>) : (<>
                                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">

                                                <div className="flex space-x-3.5">
                                                    <button onClick={() => {
                                                        setProduct(entity);
                                                        setIsOpenDelete(true);
                                                    }}>
                                                        {!entity.delete ? (<TrashIcon className='w-5 h-5 text-black hover:text-red-600  dark:text-white' />) : (<ReceiptRefundIcon className='w-5 h-5 text-black hover:text-yellow-600  dark:text-white' />)}
                                                    </button>
                                                    <button onClick={() => {
                                                        setEntityFlashSaleDetailst(entity);
                                                        setIsOpen(true);
                                                        setPost(false);
                                                    }}>
                                                        <ArrowPathIcon className='w-5 h-5 text-black hover:text-green-600  dark:text-white' />
                                                    </button>
                                                </div>
                                            </td>
                                        </>)}
>>>>>>> Stashed changes
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        pageNumber={currentPageProduct || 0}
                        totalPages={dataProduct?.totalPages || 0}
                        totalElements={dataProduct?.totalElements || 0}
                        handlePrevious={handlePreviousProduct}
                        handleNext={handleNextProduct}
                        setPageNumber={setCurrentPageProduct}
                        size={dataProduct.size}></Pagination>
                </div>
<<<<<<< Updated upstream
            </div>

            <ModalFlashSaleDetails
                product={ProductNotProduct}
                flashSaleId={entityFlashSale.id}
                entity={post ? null : entityFlashSaleDetails}
                open={isOpen}
                setOpen={setIsOpen}
                title={post ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm'}
                message={post ? 'Bạn chắc chắn muốn thêm sản phẩm này không?' : 'Bạn chắc chắn muốn cập nhật sản phẩm này không?'}
                confirmText={'Xác Nhận'}
                cancelText="Thoát"
                status={status}
                setStatus={setStatus} />
            <Modal
                open={isOpenDelete}
                setOpen={setIsOpenDelete}
                title={'Xóa Sản Phẩm'}
                message={'Bạn chắc chắn xóa sản phẩm này không?'}
                onConfirm={handleConfirm}
                confirmText={'Xác Nhận'}
                cancelText="Thoát"
                icon={
                    <TrashIcon className="h-6 w-6 text-red-600" />
                }
                iconBgColor={'bg-red-100'}
                buttonBgColor={'bg-red-600'} />
=======

                <ModalFlashSaleDetails
                    product={ProductNotProduct}
                    flashSaleId={flashsale_id}
                    entity={post ? null : entityFlashSaleDetails}
                    open={isOpen}
                    setOpen={setIsOpen}
                    title={post ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm'}
                    message={post ? 'Bạn chắc chắn muốn thêm sản phẩm này không?' : 'Bạn chắc chắn muốn cập nhật sản phẩm này không?'}
                    confirmText={'Xác Nhận'}
                    cancelText="Thoát"
                    status={status}
                    setStatus={setStatus} />
                <Modal
                    open={isOpenDelete}
                    setOpen={setIsOpenDelete}
                    title={'Xóa Sản Phẩm'}
                    message={'Bạn chắc chắn xóa sản phẩm này không?'}
                    onConfirm={handleConfirm}
                    confirmText={'Xác Nhận'}
                    cancelText="Thoát"
                    icon={
                        <TrashIcon className="h-6 w-6 text-red-600" />
                    }
                    iconBgColor={'bg-red-100'}
                    buttonBgColor={'bg-red-600'} />
            </div>
>>>>>>> Stashed changes
        </div>
    );
};

export default TableTwo;