import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ArrowLongDownIcon, ArrowLongUpIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import { TrashIcon } from '@heroicons/react/24/outline'
import Modal from "./Modal_ThongBao_NotMail";
import ModalChietKhau from './Modal_ChietKhau';
import chietKhauService from '../../../service/admin/DisscountRate';
import { ExportExcel } from '../../../service/admin/ExportExcel';
import Pagination from './Pagination';

const TableTwo = () => {
    const [data, setData] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [sortColumn, setSortColumn] = useState('');
    const [sortBy, setSortBy] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const [post, setPost] = useState(null);
    const [entityChietKhau, setEntityChietKhau] = useState('');
    const [status, setStatus] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModalSP, setIsOpenModalSP] = useState(false);
    const handleConfirm = () => {
        deleteChietKhau();
        setIsOpen(false);
    };
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < data.totalPages) {
            setCurrentPage(newPage);
            console.log("currentPage: " + newPage);
        }
    };

    const handlePrevious = () => {
        handlePageChange(currentPage - 1);
    };

    const handleNext = () => {
        handlePageChange(currentPage + 1);
    };

    const deleteChietKhau = async () => {
        try {
            const response = await chietKhauService.delete(entityChietKhau.id);
            console.log("xóa: " + response.data.message);
            if (response.data.code === 1000) {
                toast.success(response.data.message);
            }
            findAllChietKhau();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error: " + error);
        }
    }

    const findAllChietKhau = async () => {
        try {
            const response = await chietKhauService.findAllChietKhau(currentPage, 10, searchItem, sortColumn, sortBy);
            console.log("content: " + response.data.result.content);
            setData(response.data.result);
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    useEffect(() => {
        findAllChietKhau();
    }, [searchItem, currentPage, sortBy, sortColumn, status]);
    ;
    const handleExport = async () => {
        const sheetNames = ['Danh Sách Chiết Khấu'];
        try {
            console.log("data.totalElements: " + data.totalElements);
            const response = await chietKhauService.findAllChietKhau(currentPage, data.totalElements === 0 ? 5 : data.totalElements, searchItem, sortColumn, sortBy);

            if (!response || response.data.result.totalElements === 0) {
                toast.error("Không có dữ liệu");
            } else {
                return ExportExcel("Danh Sách Chiết Khấu.xlsx", sheetNames, [response.data.result.content]);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xuất dữ liệu");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <ToastContainer />
            <div className="py-6 flex justify-between px-4 md:px-6 xl:px-7.5">
                <form onSubmit={handleSubmit}
                    className="ml-auto mr-3 items-center space-x-2">
                    <button
                        onClick={handleExport}
                        type="button"
                        className="inline-flex items-center justify-center rounded-md bg-gray-600 py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
                    >
                        Excel
                    </button>
                    <button
                        onClick={() => {
                            setIsOpenModalSP(true); setPost(true);
                        }}
                        className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
                    >
                        Thêm
                    </button>
                </form>



            </div>
            <table className="w-full border-collapse border border-stroke dark:border-strokedark">
                <thead>
                    <tr className="border-t border-stroke dark:border-strokedark">
                        <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">#</th>

                        <th
                            onClick={() => {
                                setSortColumn("discount");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white">Chiết khấu</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "discount" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "discount" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>
                        <th
                            onClick={() => {
                                setSortColumn("dateInsert");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1">
                                <span className="text-sm text-black dark:text-white">Ngày tạo </span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "dateInsert" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "dateInsert" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("dateStart");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white ">Ngày áp dụng</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "dateStart" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "dateStart" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("dateDelete");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Ngày xóa</span>
                                <ArrowLongDownIcon className={`h-4 w-4 dark:text-white ${sortBy == true && sortColumn == "dateDelete" ? "text-black" : "text-gray-500"} text-black`} />
                                <ArrowLongUpIcon className={`h-4 w-4 dark:text-white ${sortBy == false && sortColumn == "dateDelete" ? "text-black" : "text-gray-500"} text-black`} />
                            </div>
                        </th>
                        <th className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Trạng Thái</span>
                            </div>
                        </th>
                        <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <span className="text-sm text-black dark:text-white truncate w-24">Hành động</span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {data?.content?.map((entity, index) => (
                        <tr key={index} className="border-t border-stroke dark:border-strokedark">
                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                {data.pageable.pageNumber * data.size + index + 1}
                            </td>
                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                <div className="flex items-center gap-1 hidden xl:flex">
                                    {entity.discount} %
                                </div>
                            </td>
                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                                <p className="text-sm text-black dark:text-white">
                                    {/* {new Date(entity.dateInsert).toLocaleString("en-GB")} */}
                                    {new Date(entity.dateInsert).toLocaleString("vi-VN", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: false, // Sử dụng định dạng 24 giờ
                                    }) || ""}
                                </p>
                            </td>

                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                <div className="flex items-center gap-1 hidden xl:flex">
                                    {/* {new Date(entity.dateStart).toLocaleString("en-GB")} */}
                                    {new Date(entity.dateStart).toLocaleString("vi-VN", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: false, // Sử dụng định dạng 24 giờ
                                    }) || ""}
                                </div>
                            </td>

                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                <div className="flex items-center gap-1 hidden xl:flex">
                                    {entity.dateDelete == null ? 'Chưa có' : new Date(entity.dateDelete).toLocaleString("en-GB")}
                                </div>
                            </td>
                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 ">
                                <div className="flex items-center gap-1 hidden lg:flex">
                                    <span className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${entity.dateDelete == null ? (new Date(entity.dateStart).getTime() > new Date().getTime() ? 'bg-blue-600 text-blue-600' : 'bg-success text-success') : 'bg-danger text-danger'}`}>
                                        {entity.dateDelete == null ? (new Date(entity.dateStart).getTime() > new Date().getTime() ? 'Đang đợi' : 'Hoạt động') : 'Đã Ngừng'}
                                    </span>
                                </div>
                            </td>
                            <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                                <div className="flex space-x-3.5">
                                    {entity.dateDelete == null ? (
                                        <>
                                            <button onClick={() => {
                                                setEntityChietKhau(entity);
                                                setIsOpen(true);
                                            }}>
                                                <TrashIcon className='w-5 h-5 text-black hover:text-red-600  dark:text-white' />
                                            </button>
                                            {new Date(entity.dateStart).getTime() > new Date().getTime() ? (
                                                <button onClick={() => {
                                                    setPost(false);
                                                    setEntityChietKhau(entity);
                                                    setIsOpenModalSP(true);
                                                }}>
                                                    <ArrowPathIcon className='w-5 h-5 text-black hover:text-green-600  dark:text-white' />
                                                </button>
                                            ) : (<></>)}
                                        </>
                                    ) : (<></>)}

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                pageNumber={currentPage}
                totalPages={data?.totalPages}
                totalElements={data?.totalElements}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                setPageNumber={setCurrentPage}
                size={data.size}></Pagination>

            <Modal
                open={isOpen}
                setOpen={setIsOpen}
                title={'Xóa chiết khấu'}
                message={'Bạn chắc chắn muốn xóa chiết khấu này không?'}
                onConfirm={handleConfirm}
                confirmText={'Xác Nhận'}
                cancelText="Thoát"
                icon={<TrashIcon className="h-6 w-6 text-red-600" />}
                iconBgColor={'bg-red-100'}
                buttonBgColor={'bg-red-600'} />

            <ModalChietKhau
                status={status}
                entity={post ? null : entityChietKhau}
                setStatus={setStatus}
                open={isOpenModalSP}
                setOpen={setIsOpenModalSP}
                title={post ? 'Thêm chiết khấu' : 'Cập nhật chiết khấu'}
                confirmText="Lưu"
                cancelText="Hủy" />
        </div >
    );
};

export default TableTwo;
