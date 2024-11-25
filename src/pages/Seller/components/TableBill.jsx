import React, { useEffect, useState } from 'react';
import { ChevronRightIcon, ChevronDownIcon, ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { ArrowPathIcon, TrashIcon, EyeIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import Modal from "./ModalThongBao";
import BillService from "../../../service/Seller/billSevice";
import { toast, ToastContainer } from 'react-toastify';
import Pagination from './pagination';
import { ExportExcel } from "./ExportExcel"

const TableTwo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [orderStatusId, setOrderStatusId] = useState(true);
  const [dataBill, setDataBill] = useState({
    id: null,
    orderStatus: null
  })
  const [search, setSearch] = useState("")
  const [listBill, setListBill] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState(true);
  const [sortColumn, setSortColumn] = useState("id");
  const [size, setSize] = useState(5);
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
    loadListBill();
  }, [search, pageNumber, sortBy, sortColumn]);

  const loadListBill = async () => {
    try {
      const response = await BillService.getAll(search, pageNumber, sortBy, sortColumn, size);
      setListBill(response.data.result);
      setTotalPages(response.data.result.totalPages);
      setTotalElements(response.data.result.totalElements);
    } catch (error) {
      console.log(error);
    }
  }
  const handleExport = async () => {
    const sheetNames = ['Danh Sách Đơn Hàng'];
    try {
      const response = await BillService.getAll(search, pageNumber, sortBy, sortColumn, totalElements);
      return ExportExcel("Danh Sách Đơn Hàng.xlsx", sheetNames, [response.data.result.content]);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi xuất Excel:", error);
      toast.error("Có lỗi xảy ra khi xuất dữ liệu");
    }
  }
  const handleUpdateOrderStatus = async () => {
    try {
      const response = await BillService.updateOrderStatus(dataBill);
      toast.success(response.data.message);
      console.log(response);
      loadListBill();
    } catch (error) {
      console.log(error);
    }
  }

  const handleHuy = async () => {
    try {
      const response = await BillService.huy(dataBill, content);
      toast.success(response.data.message);
      loadListBill();
      setContent("");
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPageNumber(0);
  }
  const toggleRow = (id) => {
    if (expandedRowId === id) {
      setExpandedRowId(null);
    } else {
      setExpandedRowId(id);
    }
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
              onChange={handleSearch}
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
                setSortColumn("account.fullname")
              }}
            >
              <div className="flex items-center gap-1">
                <span className="text-sm text-black dark:text-white">Khách Hàng</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "account.fullname" ? "text-black" : "text-gray-500"} text-black`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "account.fullname" ? "text-black" : "text-gray-500"} text-black`} />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium" onClick={() => {
              setSortBy(!sortBy);
              setSortColumn("createAt");
            }}>
              <div className="flex items-center gap-1 hidden xl:flex">
                <span className="text-sm text-black dark:text-white ">Ngày Mua</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "createAt" ? "text-black" : "text-gray-500"} text-black`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "createAt" ? "text-black" : "text-gray-500"} text-black`} />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("totalQuantity");
              }}
            >
              <div className="flex items-center gap-1 hidden xl:flex">
                <span className="text-sm text-black dark:text-white">Số Lượng</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "totalQuantity" ? "text-black" : "text-gray-500"} text-black`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "totalQuantity" ? "text-black" : "text-gray-500"} text-black`} />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("totalPrice");
              }}
            >
              <div className="flex items-center gap-1 hidden lg:flex">
                <span className="text-sm text-black dark:text-white">Tổng Tiền</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "totalPrice" ? "text-black" : "text-gray-500"} text-black`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "totalPrices" ? "text-black" : "text-gray-500"} text-black`} />
              </div>
            </th>
            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <div className="flex items-center gap-1 hidden lg:flex"
                onClick={() => {
                  setSortBy(!sortBy);
                  setSortColumn("orderStatus.id");
                }}
              >
                <span className="text-sm text-black dark:text-white">Trạng Thái</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "orderStatus.id" ? "text-black" : "text-gray-500"} text-black`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "orderStatus.id" ? "text-black" : "text-gray-500"} text-black`} />
              </div>
            </th>


            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <span className="text-sm text-black dark:text-white truncate w-24"></span>
            </th>
          </tr>
        </thead>

        <tbody>
          {listBill?.content?.map((item, index) => (
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
                  <p className="text-sm text-black dark:text-white truncate w-24">{item.account.fullname}</p>
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
                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                  <div className="flex space-x-3.5">
                    <button>
                      {item.orderStatus.id < 4 && (
                        <ArrowPathIcon
                          className="w-5 h-5 text-black hover:text-green-600 dark:text-white"
                          onClick={() => {
                            setDataBill({ id: item.id, orderStatus: item.orderStatus.id });
                            setOrderStatusId(true);
                            setIsOpen(true);
                          }}
                        />
                      )}
                    </button>
                    <button>
                      {item.orderStatus.id <= 2 && (
                        <TrashIcon
                          className="w-5 h-5 text-black hover:text-red-600 dark:text-white"
                          onClick={() => {
                            setDataBill({ id: item.id, orderStatus: item.orderStatus.id });
                            setOrderStatusId(false);
                            setIsOpen(true);
                          }}
                        />
                      )}
                    </button>
                  </div>
                </td>
              </tr>

              {expandedRowId === item.id && (
                <tr className="border-t border-stroke dark:border-strokedark bg-gray-50 dark:bg-gray-800">
                  <td colSpan={8} className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                      <p><strong>Mã Đơn Hàng:</strong> {item.id || "Không có thông tin"}</p>

                      <p>
                        <strong>Số Điện Thoại:</strong>
                        {item.address && item.address.phone ? item.address.phone : " Không có số điện thoại"}
                      </p>

                      <p>
                        <strong>Phương Thức Thanh Toán:</strong>
                        {item.paymentMethod && item.paymentMethod.name ? item.paymentMethod.name : " Không xác định"}
                      </p>

                      <p>
                        <strong>Ngày Hoàn Thành:</strong>
                        {item.finishAt
                          ? new Date(item.finishAt).toLocaleDateString("en-GB")
                          : "Chưa Hoàn Thành"}
                      </p>

                      <p>
                        <strong>Sản Phẩm:</strong>
                        {item.billDetails && item.billDetails.length > 0
                          ? item.billDetails.map((detail) => detail.product && detail.product.name ? detail.product.name : " Sản phẩm không xác định").join(', ')
                          : " Không có sản phẩm"}
                      </p>

                      <p>
                        <strong>Địa Chỉ:</strong>
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
      />
      <Modal
        open={isOpen}
        setOpen={setIsOpen}
        title={
          !orderStatusId
            ? 'Hủy Đơn Hàng'
            : 'Cập Nhật Trạng Thái Đơn Hàng'
        }
        message={
          !orderStatusId
            ? 'Bạn chắc chắn muốn hủy đơn hàng này không? Vui lòng nêu lý do hủy!!'
            : 'Bạn chắn chắn muốn cập nhật trạng thái đơn hàng này không?'
        }
        onConfirm={orderStatusId ? (handleUpdateOrderStatus) : (handleHuy)}
        confirmText={
          'Xác Nhận'
        }
        cancelText="Thoát"
        icon={
          !orderStatusId ? (
            <TrashIcon className="h-6 w-6 text-red-600" />
          ) : (
            <ReceiptRefundIcon className="h-6 w-6 text-green-600" />
          )
        }
        iconBgColor={!orderStatusId ? 'bg-red-100' : 'bg-green-100'}
        buttonBgColor={!orderStatusId ? 'bg-red-600' : 'bg-green-600'}
        status={orderStatusId}
        content={content}
        setContent={setContent}
      />
    </div>
  );
};

export default TableTwo;
