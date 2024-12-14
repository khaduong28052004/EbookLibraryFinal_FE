import React, { useState } from 'react';
import { ChevronRightIcon, ChevronDownIcon, ArrowLongDownIcon, ArrowLongUpIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import ThongKeService from '../../../service/Seller/thongKeService';
import Pagination from './pagination';
import { ExportExcel } from "./ExportExcel"
import { toast, ToastContainer } from 'react-toastify';

const TableThongKeDonHang = ({ list, dateStart, dateEnd, setDateStart, setDateEnd, pageSize, pageNumber, totalElements, totalPages, handlePrevious, handleNext, setPageNumber, handleSearch, sortBy, sortColumn, setSortBy, setSortColumn }) => {

  const handleExport = async () => {
    const sheetNames = ['Danh Sách Thống Kê Đơn Hàng'];
    try {
      const response = await ThongKeService.bill(dateStart, dateEnd, pageNumber, sortBy, sortColumn, totalElements === 0 ? 5 : totalElements);
      if (!response || response.data.result.bill.totalElements === 0) {
        toast.error("Không có dữ liệu");
      } else {
        const formattedData = response.data.result.bill.content.flatMap(bill => {
          return bill.billDetails.map(detail => ({
            'Mã Đơn Hàng': bill.id,
            'Ngày Đặt': new Date(bill.createAt).toLocaleDateString("en-GB"),
            'Khách Hàng': bill.account.fullname,
            'Số Điện Thoại': bill.address.phone,
            'Địa Chỉ': bill.address.fullNameAddress,
            'Trạng Thái': bill.orderStatus.name,
            'Tên Sản Phẩm': detail.product.name,
            'Số Lượng': detail.quantity,
            'Giá': detail.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
            'Tổng Tiền Sản Phẩm': detail.quantity * detail.price,
            "Ngày Hoàn Thành:": bill.finishAt == null ? "Chưa Hoàn Thành" : new Date(bill.finishAt).toLocaleDateString("en-GB")
          }));
        });

        return ExportExcel("Danh Sách Thống Kê Đơn Hàng.xlsx", sheetNames, [formattedData]);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi xuất Excel:", error);
      toast.error("Có lỗi xảy ra khi xuất dữ liệu");
    }
  }

  const [expandedRowId, setExpandedRowId] = useState(null);
  const toggleRow = (id) => {
    if (expandedRowId === id) {
      setExpandedRowId(null);
    } else {
      setExpandedRowId(id);
    }
  }

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <ToastContainer />
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
              type="date"
              placeholder="Start Date"
              name="startDate"
              onChange={(e) => setDateStart(e.target.value)}
              className="w-45 bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white"
            />

            {/* Arrow Icon from Heroicons */}
            <ArrowRightIcon className="w-5 h-5 text-black dark:text-white" />

            {/* Input End Date */}
            <input
              type="date"
              placeholder="End Date"
              name="endDate"
              onChange={(e) => setDateEnd(e.target.value)}
              className="w-45 bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white"
            />
          </div>
        </form>
        <div className="flex items-center justify-between space-x-4">
          <button
            className="inline-flex items-center justify-center rounded-md bg-blue-600 py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 w-1/2 md:w-1/3 lg:w-2/4  md:mb-0"
            onClick={handleSearch}
          >
            Lọc
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center rounded-md bg-gray-600 py-3 px-5 text-center font-medium text-white hover:bg-opacity-90 w-1/2 md:w-1/3 lg:w-2/4 md:mb-0"
          >
            Excel
          </button>
        </div>
      </div>

      <table className="w-full border-collapse border border-stroke dark:border-strokedark">
        <thead>
          <tr className="border-t border-stroke dark:border-strokedark">
            <th className="py-4.5 px-4 md:px-6 2xl:px-2.5"></th>
            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">#</th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("account.fullname");
              }}
            >
              <div className="flex items-center gap-1">
                <span className="text-sm text-black dark:text-white">Khách Hàng</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "account.fullname" ? "text-black" : "text-gray-500"}`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "account.fullname" ? "text-black" : "text-gray-500"}`} />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("createAt");
              }}>
              <div className="flex items-center gap-1 hidden xl:flex">
                <span className="text-sm text-black dark:text-white ">Ngày Mua</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "createAt" ? "text-black" : "text-gray-500"}`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "createAt" ? "text-black" : "text-gray-500"}`} />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("totalQuantity");
              }}>
              <div className="flex items-center gap-1 hidden xl:flex">
                <span className="text-sm text-black dark:text-white">Số Lượng</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "totalQuantity" ? "text-black" : "text-gray-500"}`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "totalQuantity" ? "text-black" : "text-gray-500"}`} />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("totalPrice");
              }}>
              <div className="flex items-center gap-1 hidden lg:flex">
                <span className="text-sm text-black dark:text-white">Tổng Tiền</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "totalPrice" ? "text-black" : "text-gray-500"}`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "totalPrice" ? "text-black" : "text-gray-500"}`} />
              </div>
            </th>
            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("orderStatus.id");
              }}>
              <div className="flex items-center gap-1 hidden lg:flex">
                <span className="text-sm text-black dark:text-white">Trạng Thái</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "orderStatus.id" ? "text-black" : "text-gray-500"}`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "orderStatus.id" ? "text-black" : "text-gray-500"}`} />
              </div>
            </th>
            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <span className="text-sm text-black dark:text-white truncate w-24"></span>
            </th>
          </tr>
        </thead>

        <tbody>
          {list?.content?.map((item, index) => (
            <React.Fragment key={index}>
              <tr className="border-t border-stroke dark:border-strokedark" onClick={() => toggleRow(item.id)}>
                <td className="py-4.5 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white" >
                  {expandedRowId !== item.id ? (
                    <ChevronRightIcon className="text-sm h-5 w-5 text-gray-400 dark:text-white ml-auto" />
                  ) : (
                    <ChevronDownIcon className="text-sm h-5 w-5 text-black dark:text-white ml-auto" />
                  )}
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                  {index + 1 + pageNumber * pageSize}
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                  <p className="text-sm text-black dark:text-white truncate w-24">{item?.account?.fullname}</p>
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                  <div className="flex items-center gap-1 hidden xl:flex">
                    {new Date(item.createAt).toLocaleDateString("en-GB")}
                  </div>
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                  <div className="flex items-center gap-1 hidden xl:flex">
                    {item.totalQuantity}
                  </div>
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                  <div className="flex items-center gap-1 hidden xl:flex">
                    {item.totalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                  </div>
                </td>
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                  <div className="flex items-center gap-1 hidden lg:flex">
                    <span className="inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium">
                      {item.orderStatus.name}
                    </span>
                  </div>
                </td>
              </tr>

              {expandedRowId === item.id && (
                <tr className="border-t border-stroke dark:border-strokedark bg-gray-50 dark:bg-gray-800">
                  <td colSpan={8} className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                      <p><strong>Mã Đơn Hàng: </strong> {item.id || "Không có thông tin"}</p>
                      <p>
                        <strong>Số Điện Thoại: </strong>
                        {item.address && item.address.phone ? item.address.phone : " Không có số điện thoại"}
                      </p>

                      <p>
                        <strong>Phương Thức Thanh Toán: </strong>
                        {item.paymentMethod && item.paymentMethod.name ? item.paymentMethod.name : " Không xác định"}
                      </p>

                      <p>
                        <strong>Phí Vận Chuyển: </strong>
                        <span>
                          {item.priceShipping
                            ? item.priceShipping.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
                            : "Không Có"}
                        </span>
                      </p>
                      <p>
                        <strong>Voucher: </strong>
                        {item.voucherDetails && item.voucherDetails.length > 0 ? (
                          item.voucherDetails.map((voucherDetails) => {
                            if (voucherDetails.voucher.typeVoucher.id === 1) {
                              return (<span key={voucherDetails.id}>Giảm {voucherDetails.voucher.sale}%</span>
                              )
                            }
                            return null;
                          })
                        ) : (
                          <span>Không có voucher</span>
                        )
                        }

                      </p>
                      <p>
                        <strong>Ngày Hoàn Thành: </strong>
                        {item.finishAt
                          ? new Date(item.finishAt).toLocaleDateString("en-GB")
                          : "Chưa Hoàn Thành"}
                      </p>

                      <p>
                        <strong>Sản Phẩm: </strong>
                        {item.billDetails && item.billDetails.length > 0
                          ? item.billDetails.map((detail) => detail.product && detail.product.name ? detail.product.name : " Sản phẩm không xác định").join(', ')
                          : " Không có sản phẩm"}
                      </p>

                      <p>
                        <strong>Địa Chỉ: </strong>
                        {item.address && item.address.fullNameAddress ? item.address.fullNameAddress : " Không có địa chỉ"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
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
        size={pageSize}
      />

    </div>
  );
};

export default TableThongKeDonHang;
