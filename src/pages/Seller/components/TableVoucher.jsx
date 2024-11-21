import React, { useEffect, useState } from 'react';
import { ChevronRightIcon, ChevronDownIcon, ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { ArrowPathIcon, TrashIcon, EyeIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import Modal from "./ModalThongBao";
import VoucherService from "../../../service/Seller/voucherService"
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { format, parse } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import Pagination from './pagination';
import { ExportExcel } from "./ExportExcel"
const TableVoucher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [statusVoucher, setStatusVoucher] = useState(false);
  const [isOpenModalSP, setIsOpenModalSP] = useState(false);
  const [listVoucher, setListVoucher] = useState([]);
  const [dataVoucher, setDataVoucher] = useState({
    id: null,
    name: "",
    note: "",
    minOrder: null,
    totalPriceOrder: null,
    sale: null,
    quantity: null,
    dateStart: '',
    dateEnd: '',
    typeVoucher: 1,
    account: sessionStorage.getItem("id_account")
  });
  const [search, setSearch] = useState('');
  const [isStatus, setIsStatus] = useState(false);
  const [voucherId, setVoucherId] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState(true);
  const [sortColumn, setSortColumn] = useState("id");
  const [size, setSize] = useState(5);
  const [expandedRowId, setExpandedRowId] = useState(null);

  const toggleRow = (id) => {
    if (expandedRowId === id) {
      setExpandedRowId(null);
    } else {
      setExpandedRowId(id);
    }
  };

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
    loadListVoucher();
  }, [search, pageNumber, sortBy, sortColumn]);

  const loadListVoucher = async () => {
    try {
      const response = await VoucherService.getData(search, pageNumber, sortBy, sortColumn, size);
      setListVoucher(response.data.result);
      setTotalPages(response.data.result.totalPages);
      setTotalElements(response.data.result.totalElements);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  const handleExport = async () => {
    const sheetNames = ['Danh Sách Voucher'];
    try {
      const response = await VoucherService.getData(search, pageNumber, sortBy, sortColumn, totalElements);
      return ExportExcel("Danh Sách Voucher.xlsx", sheetNames, [response.data.result.content]);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi xuất Excel:", error);
      toast.error("Có lỗi xảy ra khi xuất dữ liệu");
    }
  }

  const editVoucher = async (voucher_id) => {
    try {
      const response = await VoucherService.edit(voucher_id);
      const voucher = response.data.result;
      setDataVoucher({
        id: voucher.id,
        name: voucher.name,
        note: voucher.note,
        minOrder: voucher.minOrder,
        totalPriceOrder: voucher.totalPriceOrder,
        sale: voucher.sale,
        quantity: voucher.quantity,
        dateStart: voucher.dateStart,
        dateEnd: voucher.dateEnd,
        typeVoucher: voucher.typeVoucher.id,
        account: voucher.account.id
      })
      setIsOpenModalSP(true);
    } catch (error) {
      toast.success(error?.response?.data?.message);

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
      if (!isStatus) {
        response = await VoucherService.create(formattedData);
      } else {
        response = await VoucherService.update(formattedData);
      }
      toast.success(response.data.message);
      loadListVoucher();
      setIsOpenModalSP(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  const deleteVoucher = async () => {
    try {
      const response = await VoucherService.delete(voucherId);
      toast.success(response.data.message);
      loadListVoucher();
    } catch (error) {
      toast.error(error?.response?.data?.message);
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
      [name]: isDateField ? value : value,
    }));
  };

  const formatDateForDisplay = (dateString) => {
    return dateString ? format(parse(dateString, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '';
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <ToastContainer className={'z-999999'}/>
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
          <button
            onClick={() => {
              setDataVoucher({
                id: null,
                name: "",
                note: "",
                minOrder: null,
                totalPriceOrder: null,
                sale: null,
                quantity: null,
                dateStart: '',
                dateEnd: '',
                typeVoucher: 1,
                account: sessionStorage.getItem("id_account")
              });
              setIsOpenModalSP(true);
              setIsStatus(false);
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
          >
            Thêm
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
                setSortColumn("name");
              }}>
              <div className="flex items-center gap-1">
                <span className="text-sm text-black dark:text-white">Tên</span>
                <ArrowLongDownIcon className={`h-4 w-4  dark:text-white ${sortBy == false && sortColumn == "name" ? "text-black" : "text-gray-500"}`} />
                <ArrowLongUpIcon className={`h-4 w-4  dark:text-white ${sortBy == true && sortColumn == "name" ? "text-black" : "text-gray-500"}`} />
              </div>
            </th>
            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("sale");
              }}>
              <div className="flex items-center gap-1 hidden xl:flex">
                <span className="text-sm text-black dark:text-white">Giảm Giá</span>
                <ArrowLongDownIcon className={`h-4 w-4  dark:text-white ${sortBy == false && sortColumn == "sale" ? "text-black" : "text-gray-500"}`} />
                <ArrowLongUpIcon className={`h-4 w-4  dark:text-white ${sortBy == true && sortColumn == "sale" ? "text-black" : "text-gray-500"}`} />
              </div>
            </th>
            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("dateStart");
              }}>
              <div className="flex items-center gap-1 hidden lg:flex">
                <span className="text-sm text-black dark:text-white">Ngày Bắt Đầu</span>
                <ArrowLongDownIcon className={`h-4 w-4  dark:text-white ${sortBy == false && sortColumn == "dateStart" ? "text-black" : "text-gray-500"}`} />
                <ArrowLongUpIcon className={`h-4 w-4  dark:text-white ${sortBy == true && sortColumn == "dateStart" ? "text-black" : "text-gray-500"}`} />
              </div>
            </th>
            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("dateEnd");
              }}>
              <div className="flex items-center gap-1 hidden lg:flex">
                <span className="text-sm text-black dark:text-white">Ngày Kết Thúc</span>
                <ArrowLongDownIcon className={`h-4 w-4  dark:text-white ${sortBy == false && sortColumn == "dateEnd" ? "text-black" : "text-gray-500"}`} />
                <ArrowLongUpIcon className={`h-4 w-4  dark:text-white ${sortBy == true && sortColumn == "dateEnd" ? "text-black" : "text-gray-500"}`} />
              </div>
            </th>
            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("isDelete");
              }}>
              <div className="flex items-center gap-1 hidden lg:flex">
                <span className="text-sm text-black dark:text-white">Trạng Thái</span>
                <ArrowLongDownIcon className={`h-4 w-4  dark:text-white ${sortBy == false && sortColumn == "isDelete" ? "text-black" : "text-gray-500"}`} />
                <ArrowLongUpIcon className={`h-4 w-4  dark:text-white ${sortBy == true && sortColumn == "isDelete" ? "text-black" : "text-gray-500"}`} />
              </div>
            </th>
            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <span className="text-sm text-black dark:text-white truncate w-24"></span>
            </th>
          </tr>
        </thead>

        <tbody className="min-h-[400px]"> {/* Set minimum height for the table body */}
          {listVoucher?.content?.length === 0 ? (
            <tr className="border-t border-stroke dark:border-strokedark">
              <td colSpan="7" className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-center text-sm text-black dark:text-white ">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            listVoucher?.content?.map((voucher, index) => (
              <React.Fragment key={index}>
                <tr className="border-t border-stroke dark:border-strokedark" onClick={() => toggleRow(voucher.id)}>
                  <td className="py-4.5 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white" >
                    {expandedRowId !== voucher.id ? (
                      <ChevronRightIcon className="text-sm h-5 w-5 text-gray-400 dark:text-white ml-auto" />
                    ) : (
                      <ChevronDownIcon className="text-sm h-5 w-5 text-black dark:text-white ml-auto" />
                    )}
                  </td>
                  <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                    {index + 1 + pageNumber * pageSize}
                  </td>
                  <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                    <p className="text-sm text-black dark:text-white truncate w-24">{voucher.name}</p>
                  </td>
                  <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                    <div className="flex items-center gap-1 hidden xl:flex">
                      {`${voucher.sale}%`}
                    </div>
                  </td>
                  <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                    <div className="flex items-center gap-1 hidden xl:flex">
                      {new Date(voucher.dateStart).toLocaleDateString("en-GB")}
                    </div>
                  </td>
                  <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                    <div className="flex items-center gap-1 hidden xl:flex">
                      {new Date(voucher.dateEnd).toLocaleDateString("en-GB")}
                    </div>
                  </td>
                  <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 ">
                    <div className="flex items-center gap-1 hidden lg:flex">
                      <span className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${!voucher.delete ? 'bg-success text-success' : 'bg-danger text-danger'}`}>
                        {!voucher.delete ? 'Hoạt Động' : 'Đã Ngừng'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                    <div className="flex space-x-3.5">
                      <button>
                        <Link to={`/seller/quanLy/voucherDetail?voucher_id=${voucher.id}`}><EyeIcon className='w-5 h-5 text-black hover:text-blue-600 dark:text-white' /></Link>
                      </button>
                      <button onClick={(event) => {
                        event.stopPropagation();
                        setIsOpen(true);
                        setVoucherId(voucher.id);
                        setStatusVoucher(voucher.delete)
                      }}>
                        {!voucher.delete ? (<TrashIcon className='w-5 h-5 text-black hover:text-red-600 dark:text-white' />) : (<ReceiptRefundIcon className='w-5 h-5 text-black hover:text-yellow-600 dark:text-white' />)}
                      </button>
                      <button onClick={(event) => {
                        event.stopPropagation();
                        editVoucher(voucher.id);
                        setIsStatus(true)
                      }}>
                        <ArrowPathIcon className='w-5 h-5 text-black hover:text-green-600 dark:text-white' />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRowId === voucher.id && (
                  <tr className="border-t border-stroke dark:border-strokedark bg-gray-50 dark:bg-gray-800">
                    <td colSpan={8} className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                      <div className="grid grid-cols-3 gap-x-8 gap-y-2">
                        <p><strong>Điều Kiện:</strong>
                          {(voucher.minOrder || 0).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                        </p>

                        <p>
                          <strong>Giá Giảm Tối Đa:</strong>
                          {(voucher.totalPriceOrder || 0).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                        </p>

                        <p>
                          <strong>Số Lượng:</strong>
                          {voucher.quantity}
                        </p>

                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
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
          !statusVoucher ? "Khôi Phục Hoạt Động" :
            'Ngừng Hoạt Động'
        }
        message={!statusVoucher ? 'Bạn chắc chắn muốn ngừng hoạt động voucher này không?' : 'Bạn chắc chắn muốn khôi phục hoạt động voucher này không?'}
        onConfirm={deleteVoucher}
        confirmText={
          'Xác Nhận'
        }
        cancelText="Thoát"
        icon={
          statusVoucher ?
            <TrashIcon className="h-6 w-6 text-red-600" />
            :
            <ReceiptRefundIcon className="h-6 w-6 text-green-600" />
        }
        iconBgColor={!statusVoucher ? 'bg-green-100' : 'bg-red-100'}
        buttonBgColor={!statusVoucher ? 'bg-green-600' : 'bg-red-600'}
      />

      <Dialog open={isOpenModalSP} onClose={() => setIsOpenModalSP(false)} className="relative z-9999">
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
                        Loại Voucher
                      </label>
                      <select name="tyVoucher" id=""
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"

                      >
                        <option value="">Giảm Tổng Hóa Đơn</option>
                      </select>
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Điều Kiện
                      </label>
                      <input
                        type="number"
                        name="minOrder"
                        value={dataVoucher.minOrder}
                        onChange={handDataVoucher}
                        min={0}
                        placeholder="Giám giá..."
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Giá Tối Đa Được Giảm
                      </label>
                      <input
                        type="number"
                        min={0}
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
                        min={0}
                        max={100}
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
      </Dialog>
    </div>
  );
};

export default TableVoucher;
