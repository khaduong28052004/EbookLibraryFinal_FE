import React, { useEffect, useState } from 'react';
import { ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import VoucherService from "../../../service/Seller/voucherService"
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../../Seller/components/pagination';
import { ExportExcel } from "../../../service/admin/ExportExcel"

const TableVoucher = () => {
  const [listVoucherDetail, setListVoucherDetail] = useState([]);
  const [search, setSearch] = useState('');
  const location = useLocation();  // Dùng useLocation để lấy thông tin URL hiện tại
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState(true);
  const [sortColumn, setSortColumn] = useState("id");
  const [size, setSize] = useState(5);

  // Lấy voucher_id từ query parameters
  const searchParams = new URLSearchParams(location.search);
  const voucher_id = searchParams.get('voucher_id');

  const handleGoBack = () => {
    navigate(-1);  // "-1" để quay lại trang trước đó
  };
  useEffect(() => {
    loadListVoucherDetail();
  }, [search, pageNumber, sortBy, sortColumn]);

  const handlePrevious = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };
  const handleExport = async () => {
    const sheetNames = ['Danh Sách Voucher Chi Tiết'];
    try {
      const response = await VoucherService.getDetail(voucher_id, search, pageNumber, sortBy, sortColumn, size === 0 ? 5 : size);
      if (!response || response.data.result.totalElements === 0) {
        toast.error("Không có dữ liệu");
      } else {
        return ExportExcel("Danh Sách Voucher Chi Tiết.xlsx", sheetNames, [response.data.result.content]);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi xuất Excel:", error);
      toast.error("Có lỗi xảy ra khi xuất dữ liệu");
    }
  }
  const handleNext = () => {
    if (pageNumber < totalPages - 1) {
      setPageNumber(pageNumber + 1);
    }
  };

  const loadListVoucherDetail = async () => {
    try {
      const response = await VoucherService.getDetail(voucher_id, search, pageNumber, sortBy, sortColumn, size);
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
            onClick={handleExport}
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

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("voucher.name");
              }}
            >
              <div className="flex items-center gap-1">
                <span className="text-sm text-black dark:text-white">Tên</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "voucher.name" ? "text-black" : "text-gray-500"} text-black`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "voucher.name" ? "text-black" : "text-gray-500"} text-black`} />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("account.fullname");
              }}
            >
              <div className="flex items-center gap-1">
                <span className="text-sm text-black dark:text-white ">Khách Hàng</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "account.fullname" ? "text-black" : "text-gray-500"} text-black`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "account.fullname" ? "text-black" : "text-gray-500"} text-black`} />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("voucher.totalPriceOrder");
              }}
            >
              <div className="flex items-center gap-1 hidden xl:flex">
                <span className="text-sm text-black dark:text-white">Điều Kiện</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "voucher.totalPriceOrder" ? "text-black" : "text-gray-500"} text-black`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "voucher.totalPriceOrder" ? "text-black" : "text-gray-500"} text-black`} />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("voucher.sale");
              }}
            >
              <div className="flex items-center gap-1 hidden lg:flex">
                <span className="text-sm text-black dark:text-white">Giảm Giá</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "voucher.sale" ? "text-black" : "text-gray-500"} text-black`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "voucher.sale" ? "text-black" : "text-gray-500"} text-black`} />
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
                  {item.account.fullname}
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

      <Pagination
        pageNumber={pageNumber}
        totalElements={totalElements}
        totalPages={totalPages}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

export default TableVoucher;
