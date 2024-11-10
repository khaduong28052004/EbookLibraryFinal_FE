import React, { useEffect, useState } from 'react';
import { ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { ArrowPathIcon, TrashIcon, EyeIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import Modal from "./ModalThongBao";
import VoucherService from "../../../service/Seller/voucherService"
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { format, parse } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
const TableVoucher = () => {
  const [listVoucherDetail, setListVoucherDetail] = useState([]);
  const [search, setSearch] = useState('');
  const location = useLocation();  // Dùng useLocation để lấy thông tin URL hiện tại
  const navigate = useNavigate();

  // Lấy voucher_id từ query parameters
  const searchParams = new URLSearchParams(location.search);
  const voucher_id = searchParams.get('voucher_id');

  const handleGoBack = () => {
    navigate(-1);  // "-1" để quay lại trang trước đó
  };
  useEffect(() => {
    loadListVoucherDetail();
  }, [search]);

  const loadListVoucherDetail = async () => {
    try {
      const response = await VoucherService.getDetail(voucher_id, search);
      setListVoucherDetail(response.data.result);
      console.log("SUCCESSFULLY LOAD LIST VOUCHER DETAIL", response.data.result);
    } catch (error) {
      console.log("ERROR LOAD LIST VOUCHER DETAIL", error);
    }
  }

  const handSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  }

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
          <button onClick={handleGoBack}
            className="inline-flex items-center justify-center rounded-md bg-gray-600 py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
          >
            Quay Lại
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
                <span className="text-sm text-black dark:text-white ">Khách Hàng</span>
                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <div className="flex items-center gap-1 hidden xl:flex">
                <span className="text-sm text-black dark:text-white">Điều Kiện</span>
                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <div className="flex items-center gap-1 hidden lg:flex">
                <span className="text-sm text-black dark:text-white">Giảm Giá</span>
                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {
            listVoucherDetail?.content?.length === 0 ? (
              <tr className="border-t border-stroke dark:border-strokedark">
                <td colSpan="5" className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-center text-sm text-black dark:text-white ">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (listVoucherDetail?.content?.map((item, index) => (
              <tr key={index} className="border-t border-stroke dark:border-strokedark">
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                  {index + 1}
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                  <p className="text-sm text-black dark:text-white truncate w-24">{item.voucher.name}</p>
                </td>

                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                  <div className="flex items-center gap-1 hidden xl:flex">

                    {item.account.fullname}
                  </div>
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                  <div className="flex items-center gap-1 hidden xl:flex">
                    {item.totalPriceOrder}
                  </div>
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                  <div className="flex items-center gap-1 hidden xl:flex">
                    {item.sale}
                  </div>
                </td>
              </tr>
            )))}
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
              <span className="font-medium"> 1 </span>
              to
              <span className="font-medium"> 10 </span>
              of
              <span className="font-medium"> 97 </span>
              results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm " aria-label="Pagination">
              <a href="#" className="relative  inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                </svg>
              </a>
              <a href="#" aria-current="page" className="relative dark:text-white z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
              <a href="#" className="relative dark:text-white inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
              <a href="#" className="relative dark:text-white hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
              <span className="relative dark:text-white inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
              <a href="#" className="relative dark:text-white hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
              <a href="#" className="relative dark:text-white inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">9</a>
              <a href="#" className="relative dark:text-white inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
              <a href="#" className="relative dark:text-white inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                  <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableVoucher;
