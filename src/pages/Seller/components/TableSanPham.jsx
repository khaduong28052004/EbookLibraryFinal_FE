import React, { useEffect, useState } from 'react';
import { ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { ArrowPathIcon, TrashIcon, EyeIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import Modal from "./ModalThongBao";
import SanPhamService from "../../../service/Seller/sanPhamService"
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { format, parse } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
const TableSanPham = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [statusVoucher, setStatusVoucher] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [search, setSearch] = useState('');
  const [isStatus, setIsStatus] = useState(false);
  const [productId, setProductId] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const handlePrevious = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber < totalPages - 1) {
      setPageNumber(pageNumber + 1);
    }
  };


  useEffect(() => {
    loadListProduct();
  }, [search, pageNumber]);

  const loadListProduct = async () => {
    try {
      const response = await SanPhamService.getAll(search, pageNumber);
      setListProduct(response.data.result);
      setTotalPages(response.data.result.totalPages);
      setTotalElements(response.data.result.totalElements);
    } catch (error) {
      console.log('ERROR GET LIST PRODUCT', error);
    }
  }

  const editVoucher = async (voucher_id) => {
    try {
      const response = await VoucherService.edit(voucher_id);
      const voucher = response.data.result;
      // setDataVoucher({
      //   id: voucher.id,
      //   name: voucher.name,
      //   note: voucher.note,
      //   totalPriceOrder: voucher.totalPriceOrder,
      //   sale: voucher.sale,
      //   quantity: voucher.quantity,
      //   dateStart: voucher.dateStart,
      //   dateEnd: voucher.dateEnd,
      //   typeVoucher: voucher.typeVoucher.id,
      //   account: voucher.account.id
      // })
      setIsOpenModalSP(true);
      console.log("SUCCESSFULLY GET EDIT VOUCHER", response.data.result);
    } catch (error) {
      console.log("ERROR EDIT VOUCHER", error);

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      const formattedData = {
        ...dataVoucher,
        dateStart: formatDateForDisplay(dataVoucher.dateStart),
        dateEnd: formatDateForDisplay(dataVoucher.dateEnd),
      };
      console.log("DATA VOUCHER", formattedData);
      if (!isStatus) {
        response = await VoucherService.create(formattedData);
      } else {
        response = await VoucherService.update(formattedData);
      }
      toast.success(response.data.message);
      loadListVoucher();
      setIsOpenModalSP(false);
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  const deleteProduct = async () => {
    try {
      const response = await SanPhamService.delete(productId);
      toast.success(response.data.message);
      console.log("SUCCESSFULLY DELETE VOUCHER", response.data.result);
      loadListProduct();
    } catch (error) {
      console.log("ERROR DELETE VOUCHER", error);
    }
  }

  const handSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  }

  const handDataVoucher = (e) => {
    const { name, value } = e.target;
    const isDateField = name === 'dateStart' || name === 'dateEnd';
    setDataVoucher((prev) => ({
      ...prev,
      [name]: isDateField ? value : value, // Store date in 'yyyy-MM-dd' format for compatibility
    }));
  };

  const formatDateForDisplay = (dateString) => {
    return dateString ? format(parse(dateString, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '';
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <ToastContainer />
      <div className="py-6 flex justify-between px-4 md:px-6 xl:px-7.5">
        <form action="https://formbold.com/s/unique_form_id" method="POST">
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
              type="text"
              onChange={handSearch}
              placeholder="Tìm kiếm..."
              className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
            />
          </div>
        </form>
        <div className="flex items-center space-x-2">
          <button
            className="inline-flex items-center justify-center rounded-md bg-gray-600 py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
          >
            Excel
          </button>
          <button
            className="inline-flex items-center justify-center rounded-md bg-gray-600 py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
          >
            PDF
          </button>
          <button
            onClick={() => { setIsOpenModalSP(true); setIsStatus(false) }}
            className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
          >
            Thêm
          </button>
        </div>
      </div>

      <table className="w-full border-collapse border border-stroke dark:border-strokedark">
        <thead>
          <tr className="border-t border-stroke dark:border-strokedark">
            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">#</th>
            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <div className="flex items-center gap-1">
                <span className="text-sm text-black dark:text-white">Tên</span>
                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <div className="flex items-center gap-1 hidden xl:flex">
                <span className="text-sm text-black dark:text-white">Tác Giả</span>
                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <div className="flex items-center gap-1 hidden xl:flex">
                <span className="text-sm text-black dark:text-white">Thể Loại</span>
                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <div className="flex items-center gap-1 hidden lg:flex">
                <span className="text-sm text-black dark:text-white">Giá</span>
                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
              </div>
            </th>
            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <div className="flex items-center gap-1 hidden lg:flex">
                <span className="text-sm text-black dark:text-white">Số Lượng</span>
                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
              </div>
            </th>
            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <div className="flex items-center gap-1 hidden lg:flex">
                <span className="text-sm text-black dark:text-white">Trạng Thái</span>
                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
              </div>
            </th>
            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <span className="text-sm text-black dark:text-white truncate w-24"></span>
            </th>
          </tr>
        </thead>

        <tbody className="min-h-[400px]">
          {listProduct?.content?.length === 0 ? (
            <tr className="border-t border-stroke dark:border-strokedark">
              <td colSpan="7" className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-center text-sm text-black dark:text-white ">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            listProduct?.content?.map((item, index) => (
              <tr key={index} className="border-t border-stroke dark:border-strokedark">
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                  {index + 1 + pageNumber * pageSize}
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                  <p className="text-sm text-black dark:text-white truncate w-24">{item.name}</p>
                </td>

                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                  <div className="flex items-center gap-1 hidden xl:flex">
                    {item.writerName}
                  </div>
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                  <div className="flex items-center gap-1 hidden xl:flex">
                    {item.category.name}
                  </div>
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                  <div className="flex items-center gap-1 hidden xl:flex">
                    {item.quantity}
                  </div>
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                  <div className="flex items-center gap-1 hidden xl:flex">
                    {item.price}
                  </div>
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 ">
                  <div className="flex items-center gap-1 hidden lg:flex">
                    <span className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${item.isActive ? 'bg-success text-success' : 'bg-danger text-danger'}`}>
                      {item.isActive ? 'Đã Duyệt' : 'Chưa Duyệt'}
                    </span>
                  </div>
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                  <div className="flex space-x-3.5">
                    <button onClick={() => {
                      setIsOpen(true);
                      setProductId(item.id);
                      //  setStatusVoucher(voucher.delete) 
                    }}>
                      <TrashIcon className='w-5 h-5 text-black hover:text-red-600 dark:text-white' />
                    </button>
                    <button onClick={() => {
                      // editVoucher(voucher.id); setIsStatus(true)
                    }}>
                      <ArrowPathIcon className='w-5 h-5 text-black hover:text-green-600 dark:text-white' />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>



      <div className="py-6 flex border-t border-stroke dark:border-strokedark px-4 md:px-6 xl:px-7.5">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={handlePrevious}
            disabled={pageNumber === 0}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={pageNumber === totalPages - 1}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-white">
              Showing
              <span className="font-medium"> {pageNumber * 5 + 1} </span>
              to
              <span className="font-medium"> {Math.min((pageNumber + 1) * 5, totalElements)} </span>
              of
              <span className="font-medium"> {totalElements} </span>
              results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={handlePrevious}
                disabled={pageNumber === 0}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" />
                </svg>
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPageNumber(index)}
                  className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold ${index === pageNumber ? 'bg-indigo-600 text-white' : 'text-gray-900'
                    } ring-1 ring-inset ring-gray-300  focus:outline-offset-0`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={handleNext}
                disabled={pageNumber === totalPages - 1}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>

      <Modal
        open={isOpen}
        setOpen={setIsOpen}
        title={
          "Xoá Sản Phẩm"
        }
        message={'Bạn chắc chắn muốn xóa sản phẩm này không?'}
        onConfirm={deleteProduct}
        confirmText={
          'Xác Nhận'
        }
        cancelText="Thoát"
        icon={
          <TrashIcon className="h-6 w-6 text-red-600" />
        }
        iconBgColor={'bg-red-100'}
        buttonBgColor={'bg-red-600'}
      />
      {/* 
      <Dialog open={isOpenModalSP} onClose={() => setIsOpenModalSP(false)} className="relative z-999999">
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-semibold text-xl text-black dark:text-white">
                  Voucher
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Tên Sản Phẩm
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={dataVoucher.name}
                        onChange={handDataVoucher}
                        placeholder="Tên sản phẩm..."
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Số Lượng
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={dataVoucher.quantity}
                        onChange={handDataVoucher}
                        placeholder="Số lượng..."
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Ngày Bắt Đầu
                      </label>
                      <input
                        type="date"
                        name="dateStart"
                        value={dataVoucher.dateStart}
                        onChange={handDataVoucher}
                        placeholder="Ngày bắt đầu..."
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Ngày Kết Thúc
                      </label>
                      <input
                        type="date"
                        name="dateEnd"
                        value={dataVoucher.dateEnd}
                        onChange={handDataVoucher}
                        placeholder="Ngày kết thúc..."
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Điều Kiện
                      </label>
                      <input
                        type="number"
                        name="totalPriceOrder"
                        value={dataVoucher.totalPriceOrder}
                        onChange={handDataVoucher}
                        placeholder="Điều kiện..."
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Giảm Giá
                      </label>
                      <input
                        type="number"
                        name="sale"
                        value={dataVoucher.sale}
                        onChange={handDataVoucher}
                        placeholder="Giám giá..."
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Mô tả
                    </label>
                    <textarea
                      rows={4}
                      name='note'
                      value={dataVoucher.note}
                      onChange={handDataVoucher}
                      placeholder="Nội dung..."
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    ></textarea>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                  >
                    Xác Nhận
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpenModalSP(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog> */}
    </div>
  );
};

export default TableSanPham;
