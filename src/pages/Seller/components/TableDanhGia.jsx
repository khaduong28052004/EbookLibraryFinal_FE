import React, { useEffect, useState } from 'react';
import { ArrowLongDownIcon, ArrowLongUpIcon, StarIcon } from '@heroicons/react/24/solid'
import { ArrowPathIcon, TrashIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import Modal from "./ModalThongBao";
import ModalSanPham from './ModalDanhGia';
import DanhGiaService from '../../../service/Seller/danhGiaService';
import { toast, ToastContainer } from 'react-toastify';

const TableTwo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [statusProduct, setStatusProduct] = useState(false);
  const [isOpenModalSP, setIsOpenModalSP] = useState(false);
  const [listDanhGia, setListDanhGia] = useState([]);
  const [search, setSearch] = useState("");
  const [dataPhanHoi, setDataPhanHoi] = useState({
    idParent: null,
    content: '',
    account: null,
    product: null
  });
  const [isStatus, setIsStatus] = useState(false);

  useEffect(() => {
    getList();
  }, [search]);
  useEffect(() => {
    if (isStatus) {
      getList();
      toast.success("Phản Hồi Đánh Giá Thành Công");
    }
  }, [search, isStatus]);

  const getList = async () => {
    const response = await DanhGiaService.getData(search);
    console.log(response);
    setListDanhGia(response.data.result.content);
  }
  const handleConfirm = () => {
    setIsOpen(false);
  };
  const handSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  }

  const openModal = (danhGia) => {
    setDataPhanHoi({
      id: danhGia.id,
      content: '',
      account: danhGia.account.id,
      product: danhGia.product.id
    });
    setIsOpenModalSP(true);
    setIsStatus(false);
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
              placeholder="Tìm kiếm..."
              onChange={handSearch}
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
        </div>
      </div>

      <table className="w-full border-collapse border border-stroke dark:border-strokedark">
        <thead>
          <tr className="border-t border-stroke dark:border-strokedark">
            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">#</th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <div className="flex items-center gap-1">
                <span className="text-sm text-black dark:text-white">Khách Hàng</span>
                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <div className="flex items-center gap-1 hidden xl:flex">
                <span className="text-sm text-black dark:text-white ">Sản Phẩm</span>
                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <div className="flex items-center gap-1 hidden xl:flex">
                <span className="text-sm text-black dark:text-white">Hình Ảnh Đánh Giá</span>
                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
              </div>
            </th>
            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <div className="flex items-center gap-1 hidden xl:flex">
                <span className="text-sm text-black dark:text-white">Nội Dung Đánh Giá</span>
                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <div className="flex items-center gap-1 hidden lg:flex">
                <span className="text-sm text-black dark:text-white">Số Sao</span>
                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <span className="text-sm text-black dark:text-white truncate w-24"></span>
            </th>
          </tr>
        </thead>

        <tbody>
          {listDanhGia.map((danhGia, index) => (
            <tr key={index} className="border-t border-stroke dark:border-strokedark">

              <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                {index + 1}
              </td>
              <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                <p className="text-sm text-black dark:text-white truncate w-24">{danhGia.account.fullname}</p>
              </td>
              <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                <div className="flex items-center gap-1 hidden xl:flex">
                  {danhGia.product.name}
                </div>
              </td>
              <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                <div className="flex items-center gap-1 hidden xl:flex">
                  {danhGia.imageEvalues.map((image) => {
                    <img className="h-12.5 w-15 rounded-md" src={image.name} alt="Evalue" />
                  })}
                </div>
              </td>
              <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                <div className="flex items-center gap-1 hidden xl:flex">
                  {danhGia.content}
                </div>
              </td>
              <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                <div className="flex items-center gap-1 hidden lg:flex">
                  {danhGia.star}/5 <StarIcon className='w-5 h-5 text-yellow-500' />
                </div>
              </td>
              <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                <div className="flex space-x-3.5">
                  <button onClick={() => openModal(danhGia)}>
                    <ArrowPathIcon className='w-5 h-5 text-black hover:text-green-600  dark:text-white' />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="py-6 flex border-t border-stroke  dark:border-strokedark  px-4 md:px-6 xl:px-7.5">
        {/* <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"> */}
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

      <Modal
        open={isOpen}
        setOpen={setIsOpen}
        title={
          statusProduct
            ? 'Ngừng Hoạt Động'
            : 'Khôi Phục'
        }
        message={
          statusProduct
            ? 'Bạn chắc chắn muốn ngừng hoạt động sản phẩm này không?'
            : 'Bạn có chắc muốn khôi phục sản phẩm này không?'
        }
        onConfirm={handleConfirm}
        confirmText={
          statusProduct ? 'Xác Nhận' : 'Khôi Phục'
        }
        cancelText="Thoát"
        icon={
          statusProduct ? (
            <TrashIcon className="h-6 w-6 text-red-600" />
          ) : (
            <ReceiptRefundIcon className="h-6 w-6 text-yellow-600" />
          )
        }
        iconBgColor={statusProduct ? 'bg-red-100' : 'bg-yellow-100'}
        buttonBgColor={statusProduct ? 'bg-red-600' : 'bg-yellow-600'}
      />

      <ModalSanPham
        open={isOpenModalSP}
        setOpen={setIsOpenModalSP}
        title="Phản Hồi Khách Hàng"
        confirmText="Gửi"
        cancelText="Hủy"
        data={dataPhanHoi}
        status={isStatus}
        setStatus={setIsStatus}
      />
    </div>
  );
};

export default TableTwo;
