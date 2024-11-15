import React, { useEffect, useState } from 'react';
import { ChevronRightIcon, ChevronDownIcon, ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { ArrowPathIcon, TrashIcon, EyeIcon, ReceiptRefundIcon, ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Modal from "./ModalThongBao";
import SanPhamService from "../../../service/Seller/sanPhamService"
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { toast, ToastContainer } from 'react-toastify';
import CategoryService from "../../../service/Seller/categoryService";
import Pagination from './pagination';
import { storage, getDownloadURL, ref } from '../../../config/firebase';
const TableSanPham = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalSP, setIsOpenModalSP] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [search, setSearch] = useState('');
  const [isStatus, setIsStatus] = useState(false);
  const [productId, setProductId] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState(true);
  const [sortColumn, setSortColumn] = useState("id");
  const [dataProduct, setDataProduct] = useState({
    id: null,
    price: null,
    sale: null,
    weight: null,
    name: "",
    introduce: "",
    writerName: "",
    publishingCompany: "",
    isDelete: false,
    quantity: null,
    isActive: false,
    account: sessionStorage.getItem("id_account"),
    category: null,
    imageProducts: []
  });
  const [listDoanhMuc, setListDoanhMuc] = useState([]);
  const [listTheLoai, setListTheLoai] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [idCategory, setIdCategory] = useState(0);
  const [expandedRowId, setExpandedRowId] = useState(null);
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
  }, [search, pageNumber, sortBy, sortColumn]);

  const loadListDoanhMuc = async () => {
    try {
      const response = await CategoryService.getList();
      setListDoanhMuc(response.data.result);
      loadListTheLoai(response.data.result[0].id)
    } catch (error) {
      console.log(error);
    }
  }

  const loadListTheLoai = async (value) => {
    try {
      const response = await CategoryService.getListByIdParent(value);
      setListTheLoai(response.data.result);
      if (response.data.result && response.data.result.length > 0) {
        setDataProduct((prev) => ({
          ...prev,
          category: response.data.result[0].id
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const loadListProduct = async () => {
    try {
      const response = await SanPhamService.getAll(search, pageNumber, sortBy, sortColumn);
      setListProduct(response.data.result);
      setTotalPages(response.data.result.totalPages);
      setTotalElements(response.data.result.totalElements);
      loadListDoanhMuc();
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddFiles = (files) => {
    const selectedFiles = Array.from(files);
    const totalFiles = dataProduct.imageProducts.length + selectedFiles.length;

    if (totalFiles > 4) {
      setErrorMessage("Bạn chỉ được chọn tối đa 4 ảnh.");
      return;
    }

    if (selectedFiles.length < 1) {
      setErrorMessage("Bạn cần chọn ít nhất 1 ảnh.");
      return;
    }

    setErrorMessage("");

    setDataProduct(prevData => ({
      ...prevData,
      imageProducts: [...prevData.imageProducts, ...selectedFiles]
    }));
  };

  const editProduct = async (product_id) => {
    try {
      const response = await SanPhamService.edit(product_id);
      const product = response.data.result;
      console.log("Product", product);
      setDataProduct({
        id: product.id,
        price: product.price,
        sale: product.sale,
        weight: product.weight,
        name: product.name,
        introduce: product.introduce,
        writerName: product.writerName,
        publishingCompany: product.publishingCompany,
        isDelete: product.delete,
        quantity: product.quantity,
        isActive: product.active,
        account: sessionStorage.getItem("id_account"),
        category: product.category.id,
        imageProducts: []
      });

      setIdCategory(product.category.idParent);
      loadListTheLoai(product.category.idParent);
      if (product.imageProducts && product.imageProducts.length > 0) {
        for (const image of product.imageProducts) {
          await addImageFromFirebase(image.name);
        }
      }
      setIsOpenModalSP(true);
      console.log(dataProduct);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      const formData = new FormData();
      dataProduct.imageProducts.forEach((file, index) => {
        formData.append(`imageProducts`, file);
      });
      if (!isStatus) {
        console.log(dataProduct);
        response = await SanPhamService.create(dataProduct);
        const responseImg = await SanPhamService.createSaveImg(formData);
      } else {
        console.log(dataProduct);
        response = await SanPhamService.update(dataProduct);
        const responseImg = await SanPhamService.updateSaveImg(formData);
      }
      toast.success(response.data.message);
      loadListProduct();
      setIsOpenModalSP(false);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteProduct = async () => {
    try {
      const response = await SanPhamService.delete(productId);
      toast.success(response.data.message);
      loadListProduct();
    } catch (error) {
      console.error(error);
    }
  }

  const handleRemoveFile = (indexToRemove) => {
    setDataProduct((prevData) => ({
      ...prevData,
      imageProducts: prevData.imageProducts.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  }

  const handleDanhMuc = (e) => {
    const value = e.target.value;
    loadListTheLoai(value);
  }

  const handDataProduct = (e) => {
    const { name, value } = e.target;
    setDataProduct((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const addImageFromFirebase = async (imagePath) => {
    const imageRef = ref(storage, imagePath); // Đường dẫn tới ảnh trong Firebase Storage
    try {
      const url = await getDownloadURL(imageRef);
      const response = await fetch(url);

      // Kiểm tra dữ liệu trả về
      const blob = await response.blob();
      console.log(blob);  // Xem kiểu dữ liệu của blob

      setDataProduct((prevData) => ({
        ...prevData,
        imageProducts: [...prevData.imageProducts, { url, blob }]
      }));
    } catch (error) {
      console.error("Error fetching image from Firebase:", error);
    }
  };


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
            onClick={() => {
              setDataProduct({
                id: null,
                price: null,
                sale: null,
                weight: null,
                name: "",
                introduce: "",
                writerName: "",
                publishingCompany: "",
                isDelete: false,
                quantity: null,
                isActive: false,
                account: sessionStorage.getItem("id_account"),
                category: null,
                imageProducts: []
              })
              setIsOpenModalSP(true);
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
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "name" ? "text-black" : "text-gray-400"}`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "name" ? "text-black" : "text-gray-400"}`} />
              </div>
            </th>

            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("price");
              }}
            >
              <div className="flex items-center gap-1 hidden lg:flex">
                <span className="text-sm text-black dark:text-white">Giá</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "price" ? "text-black" : "text-gray-400"}`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "price" ? "text-black" : "text-gray-400"}`} />
              </div>
            </th>
            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("quantity");
              }}>
              <div className="flex items-center gap-1 hidden xl:flex">
                <span className="text-sm text-black dark:text-white">Số Lượng</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "quantity" ? "text-black" : "text-gray-400"}`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "quantity" ? "text-black" : "text-gray-400"}`} />
              </div>
            </th>
            <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium"
              onClick={() => {
                setSortBy(!sortBy);
                setSortColumn("isActive");
              }}>
              <div className="flex items-center gap-1 hidden lg:flex">
                <span className="text-sm text-black dark:text-white">Trạng Thái</span>
                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "isActive" ? "text-black" : "text-gray-400"}`} />
                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "isActive" ? "text-black" : "text-gray-400"}`} />
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
              <td colSpan="7" className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-center text-sm text-black dark:text-white">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            listProduct?.content?.map((item, index) => (
              <React.Fragment key={index}>
                <tr key={index} className="border-t border-stroke dark:border-strokedark" onClick={() => toggleRow(item.id)}>
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
                    <p className="text-sm text-black dark:text-white truncate w-24">{item.name}</p>
                  </td>

                  <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                    <div className="flex items-center gap-1 hidden lg:flex">
                      {(item.price - item.sale).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                    </div>
                  </td>
                  <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                    <div className="flex items-center gap-1 hidden xl:flex">
                      {item.quantity}
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
                      }}>
                        <TrashIcon className='w-5 h-5 text-black hover:text-red-600 dark:text-white' />
                      </button>
                      <button onClick={() => {
                        editProduct(item.id);
                        setIsStatus(true)
                      }}>
                        <ArrowPathIcon className='w-5 h-5 text-black hover:text-green-600 dark:text-white' />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRowId === item.id && (
                  <tr className="border-t border-stroke dark:border-strokedark bg-gray-50 dark:bg-gray-800">
                    <td colSpan={8} className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                      <div className="grid grid-cols-3 gap-x-8 gap-y-2">
                        <p><strong>Mã Sản Phẩm: </strong> {item.id || "Không có thông tin"}</p>
                        <p>
                          <strong>Tác Giả: </strong>
                          {item.writerName}
                        </p>

                        <p>
                          <strong>Nhà Cung Cấp: </strong>
                          {item.publishingCompany}
                        </p>

                        <p>
                          <strong>Thể Loại: </strong>
                          {item.category.name}
                        </p>

                        <p>
                          <strong>Giá Gốc: </strong>
                          {item.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                        </p>

                        <p>
                          <strong>Giảm Giá: </strong>
                          {item.sale.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
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

      <Dialog open={isOpenModalSP} onClose={() => setIsOpenModalSP(false)} className="relative z-999999">
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-semibold text-xl text-black dark:text-white">
                  Sản Phẩm
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
                        value={dataProduct.name}
                        onChange={handDataProduct}
                        placeholder="Tên sản phẩm..."
                        required
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
                        value={dataProduct.quantity}
                        onChange={handDataProduct}
                        placeholder="Số Lượng..."
                        required
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Tác Giả
                      </label>
                      <input
                        type="text"
                        name="writerName"
                        value={dataProduct.writerName}
                        onChange={handDataProduct}
                        placeholder="Tác giả..."
                        required
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Nhà Xuất Bản
                      </label>
                      <input
                        type="text"
                        name="publishingCompany"
                        value={dataProduct.publishingCompany}
                        onChange={handDataProduct}
                        placeholder="Nhà xuất bản..."
                        required
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="productImage" className="mb-2.5 block text-black dark:text-white">
                      Hình Ảnh Sản Phẩm
                      {errorMessage && <span style={{ color: "red" }}> {errorMessage}</span>}
                    </label>

                    <div className="flex space-x-4">
                      {/* Phần chọn ảnh */}
                      <div className="w-1/3 border border-gray-300 rounded-md p-4 bg-gray-50 flex flex-col items-center">
                        <label htmlFor="productImage" className="cursor-pointer flex flex-col items-center">
                          <ArrowUpTrayIcon className="h-10 w-10 mt-3 text-blue-400" />
                          <input
                            id="productImage"
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            required
                            onChange={(e) => handleAddFiles(e.target.files)}
                          />
                        </label>
                      </div>

                      {/* Phần hiển thị ảnh đã chọn */}
                      <div className="w-2/3 border border-gray-300 rounded-md p-2 flex justify-center items-center bg-white">
                        {dataProduct.imageProducts.length > 0 ? (
                          <div className="grid grid-cols-4 gap-2">
                            {dataProduct.imageProducts.map((file, index) => (
                              
                              <div key={index} className="relative w-full h-20">
                                <img
                                  key={index}
                                  src={file.blob ? URL.createObjectURL(file.blob) : URL.createObjectURL(file)} alt={`Product ${index}`}
                                  className="w-full h-full object-cover rounded-md"
                                />
                                <button
                                  onClick={() => handleRemoveFile(index)}
                                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                >
                                  <XMarkIcon className="h-2 w-2" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">Chưa có ảnh nào được chọn</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                    <div className="w-full xl:w-1/2">
                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Doanh Mục
                        </label>
                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                          <select
                            onChange={handleDanhMuc}
                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white`}
                          >
                            <option value="" disabled className="text-body dark:text-bodydark">
                              {'Chọn doanh mục'}
                            </option>
                            {listDoanhMuc?.map((option, index) => (
                              <option key={index} value={option.id} className="text-body dark:text-bodydark" selected={setIdCategory == option.id}>
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
                      <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Thể Loại
                        </label>
                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                          <select
                            name='category'
                            onChange={handDataProduct}
                            className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white `}
                          >
                            <option value="" disabled className="text-body dark:text-bodydark">
                              {'Chọn thể loại'}
                            </option>
                            {listTheLoai?.map((option, index) => (
                              <option key={index} value={option.id} className="text-body dark:text-bodydark" selected={option.id == dataProduct.category}>
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
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Giá
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={dataProduct.price}
                        onChange={handDataProduct}
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
                        value={dataProduct.sale}
                        onChange={handDataProduct}
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
                      name='introduce'
                      value={dataProduct.introduce}
                      onChange={handDataProduct}
                      placeholder="Mô tả..."
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

export default TableSanPham;
