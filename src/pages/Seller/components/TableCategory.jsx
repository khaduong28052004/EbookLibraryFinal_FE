import React, { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { ChevronRightIcon, ChevronDownIcon, ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { ArrowPathIcon, TrashIcon, EyeIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline'
import Modal from "./ModalThongBao";
import ModalSanPham from './ModalSanPham';
import CategoryService from '../../../service/Seller/categoryService';
import Pagination from './pagination';
import { toast, ToastContainer } from 'react-toastify';
import { data } from 'autoprefixer';


const TableCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalSP, setIsOpenModalSP] = useState(false);
  const [search, setSearch] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [idCategory, setIdCategory] = useState(null);
  const [dataCategory, setDataCategory] = useState({
    id: null,
    name: '',
    idParent: null
  });
  const [status, setStatus] = useState(true);
  const [listDoanhMuc, setListDoanhMuc] = useState([]);
  const [idParent, setidParent] = useState(null);
  const [sortBy, setSortBy] = useState(true);
  const [sortColumn, setSortColumn] = useState("id");

  const handleConfirm = () => {
    setIsOpen(false);
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
    loadTable();
  }, [search, pageNumber, sortBy, sortColumn])

  const loadTable = async () => {
    try {
      const response = await CategoryService.getAllSeller(search, pageNumber, sortBy, sortColumn);
      setListCategory(response.data.result);
      setTotalPages(response.data.result.totalPages);
      setTotalElements(response.data.result.totalElements);
      loadListDoanhMuc();
    } catch (error) {
      console.log(error);
    }
  }
  const loadListDoanhMuc = async () => {
    try {
      const response = await CategoryService.getList();
      setListDoanhMuc(response.data.result);
    } catch (error) {
      console.log(error);
    }
  }
  const deleteCategory = async () => {
    try {
      const response = await CategoryService.delete(idCategory);
      toast.success(response.data.message);
      loadTable();
    } catch (error) {
      console.log(error);
    }
  }

  const saveCategory = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (status) {
        response = await CategoryService.create(dataCategory);

      } else {
        response = await CategoryService.update(dataCategory);
      }
      toast.success(response.data.message);
      setIsOpenModalSP(false);
      loadTable();
    } catch (error) {
      console.log(error);
    }
  }
  const reset = async () => {
    setDataCategory({
      id: null,
      name: '',
      idParent: null
    })
    loadListDoanhMuc();

  }
  const editCategory = async (category_id) => {
    try {
      const response = await CategoryService.edit(category_id);
      const category = response.data.result;
      console.log("Category", category);
      setDataCategory({
        id: category.id,
        name: category.name,
        idParent: category.idParent
      })
      setidParent(category.idParent);
      setIsOpenModalSP(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  const handleDanhMuc = (e) => {
    const value = e.target.value;
    loadListTheLoai(value);
  }
  const handleCategory = (e) => {
    const { name, value } = e.target;
    setDataCategory((prev) => ({
      ...prev,
      [name]: value
    }))
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
              onChange={handleSearch}
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
            onClick={() => { reset(); setIsOpenModalSP(true); setStatus(true) }}
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

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("name");
              }}
            >
              <div className="flex items-center gap-1">
                <span className="text-sm text-black dark:text-white">Thể Loại</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "name" ? "text-black" : "text-gray-500"}`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "name" ? "text-black" : "text-gray-500"}`} />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("parentName");
              }}
            >
              <div className="flex items-center gap-1 hidden xl:flex">
                <span className="text-sm text-black dark:text-white ">Danh Mục</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "parentName" ? "text-black" : "text-gray-500"}`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "parentName" ? "text-black" : "text-gray-500"}`} />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
              <span className="text-sm text-black dark:text-white truncate w-24"></span>
            </th>
          </tr>
        </thead>

        <tbody>
          {listCategory?.content?.map((item, index) => (
            <tr key={index} className="border-t border-stroke dark:border-strokedark">
              <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                {index + 1 + pageNumber * pageSize}
              </td>
              <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                <p className="text-sm text-black dark:text-white truncate ">{item.name}</p>
              </td>
              <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                <div className="flex items-center gap-1 hidden xl:flex">
                  {item.nameDanhMuc}
                </div>
              </td>

              <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                <div className="flex space-x-3.5">
                  <button onClick={() => { setIsOpen(true); setIdCategory(item.id) }}>
                    {!item.hasProducts ? (<TrashIcon className='w-5 h-5 text-black hover:text-red-600  dark:text-white' />) : (<></>)}
                  </button>
                  <button onClick={() => { editCategory(item.id); setStatus(false) }}>
                    <ArrowPathIcon className='w-5 h-5 text-black hover:text-green-600  dark:text-white' />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        open={isOpen}
        setOpen={setIsOpen}
        title={
          'Xóa loai sản phẩm'

        }
        message={
          'Bạn chắc chắn muốn xóa loại sản phẩm này không?'
        }
        onConfirm={deleteCategory}
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

      <Dialog open={isOpenModalSP} onClose={() => setIsOpenModalSP(false)} className="relative z-999999">
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-semibold text-xl text-black dark:text-white">
                  Thể Loại Sản Phẩm
                </h3>
              </div>
              <form onSubmit={saveCategory}>
                <div className="p-6.5">
                  <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                    <div className="w-full xl:w-1/2">
                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Doanh Mục
                        </label>
                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                          <select
                            onChange={handleCategory}
                            name='idParent'
                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white`}
                          >
                            <option value="" disabled className="text-body dark:text-bodydark">
                              {'Chọn doanh mục'}
                            </option>
                            {listDoanhMuc?.map((option, index) => (
                              <option key={index} value={option.id} className="text-body dark:text-bodydark" selected={option.id == idParent}>
                                {option.name}
                              </option>
                            ))}
                          </select>

                          <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                            <svg
                              className="fill-current"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                  fill=""
                                ></path>
                              </g>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Tên Loại
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={dataCategory.name}
                        onChange={handleCategory}
                        placeholder="Tên loại ..."
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
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

export default TableCategory;
