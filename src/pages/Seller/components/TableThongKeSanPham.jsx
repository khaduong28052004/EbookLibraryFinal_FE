import React, { useEffect, useState } from 'react';

import { ChevronRightIcon, ChevronDownIcon, ArrowLongDownIcon, ArrowLongUpIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import { ArrowPathIcon, TrashIcon, EyeIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import ThongKeService from '../../../service/Seller/thongKeService';
import Pagination from './pagination';

const TableThongKeDonHang = ({ list, setSearch, pageSize, pageNumber, totalElements, totalPages, handlePrevious, handleNext, setPageNumber, setSortBy, setSortColumn, sortBy, sortColumn }) => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 flex flex-col md:flex-row justify-between px-4 md:px-6 xl:px-7.5 space-y-4 md:space-y-0">
        <form>
          <div className="relative pt-3 flex items-center space-x-4">
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

            {/* Input Start Date */}
            <input
              type="text"
              placeholder="Tìm kiếm..."
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
            />

          </div>
        </form>
        <div className="flex items-center justify-between space-x-4">
          <button
            className="inline-flex items-center justify-center rounded-md  py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 w-1/2 md:w-1/3 lg:w-2/4  md:mb-0"
          >

          </button>
          <button
            className="inline-flex items-center justify-center rounded-md bg-gray-600 py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 w-1/2 md:w-1/3 lg:w-2/4 md:mb-0"
          >
            Excel
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
                setSortColumn("nameSP");
              }}
            >
              <div className="flex items-center gap-1">
                <span className="text-sm text-black dark:text-white">Tên Sản Phẩm</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "nameSP" ? "text-black" : "text-gray-500"}`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "nameSP" ? "text-black" : "text-gray-500"}`} />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("theLoai");
              }}
            >
              <div className="flex items-center gap-1 hidden xl:flex">
                <span className="text-sm text-black dark:text-white ">Thể Loại</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "theLoai" ? "text-black" : "text-gray-500"}`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "theLoai" ? "text-black" : "text-gray-500"}`} />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("luotBan");
              }}
            >
              <div className="flex items-center gap-1 hidden xl:flex">
                <span className="text-sm text-black dark:text-white ">Lượt Bán</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "luotBan" ? "text-black" : "text-gray-500"}`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "luotBan" ? "text-black" : "text-gray-500"}`} />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("luotDanhGia");
              }}
            >
              <div className="flex items-center gap-1 hidden xl:flex">
                <span className="text-sm text-black dark:text-white">Lượt Đánh Giá</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "luotDanhGia" ? "text-black" : "text-gray-500"}`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "luotDanhGia" ? "text-black" : "text-gray-500"}`} />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
             onClick={() => {
              setSortBy(!sortBy);
              setSortColumn("trungBinhDanhGia");
            }}
            >
              <div className="flex items-center gap-1 hidden lg:flex">
                <span className="text-sm text-black dark:text-white">Trung Bình Lượt Đánh Giá</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "trungBinhDanhGia" ? "text-black" : "text-gray-500"}`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "trungBinhDanhGia" ? "text-black" : "text-gray-500"}`} />
              </div>
            </th>


            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("luotYeuThich");
              }}
              >
              <div className="flex items-center gap-1 hidden lg:flex">
                <span className="text-sm text-black dark:text-white">Lượt Yêu Thích</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "luotYeuThich" ? "text-black" : "text-gray-500"}`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "luotYeuThich" ? "text-black" : "text-gray-500"}`} />
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {list?.content?.map((item, index) => (
            <React.Fragment key={index}>
              <tr className="border-t border-stroke dark:border-strokedark">
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                  {index + 1 + pageNumber * pageSize}
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                  <p className="text-sm text-black dark:text-white truncate w-24">{item.name}</p>
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                  <div className="flex items-center gap-1 hidden xl:flex">
                    {item.theLoai}
                  </div>
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                  <div className="flex items-center gap-1 hidden xl:flex">
                    {item.luotBan}
                  </div>
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                  <div className="flex items-center gap-1 hidden xl:flex">
                    {item.luotDanhGia}
                  </div>
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                  <div className="flex items-center gap-1 hidden lg:flex">
                    <span className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium">
                      {`${item.trungBinhDanhGia}/5`}
                    </span>
                  </div>
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                  <div className="flex items-center gap-1 hidden lg:flex">
                    <span className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium">
                      {item.luotYeuThich}
                    </span>
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
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

export default TableThongKeDonHang;
