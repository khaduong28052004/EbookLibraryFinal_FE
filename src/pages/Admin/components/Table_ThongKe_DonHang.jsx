import React, { useState, useEffect } from 'react';
import { ChevronRightIcon, ArrowRightIcon, ChevronDownIcon, ArrowLongDownIcon, ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { ExportExcel } from '../../../service/admin/ExportExcel';
import Thongke from '../../../service/admin/ThongKe';
import Pagination from './Pagination';
import { toast, ToastContainer } from 'react-toastify';

const TableTwo = ({ onPageChange, entityData }) => {
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [orderStatusId, setOrderStatusId] = useState('');

    const [sortColumn, setSortColumn] = useState('');
    const [sortBy, setSortBy] = useState(true);
    const [currentPage, setCurrentPage] = useState(entityData?.pageable?.pageNumber == undefined ? 0 : entityData?.pageable?.pageNumber);
    const [expandedRowId, setExpandedRowId] = useState(null);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < entityData.totalPages) {
            onPageChange(dateStart, dateEnd, orderStatusId, newPage, sortBy, sortColumn);
        }
    };

    const handlePrevious = () => {
        handlePageChange(entityData?.pageable?.pageNumber - 1);
    };

    const handleNext = () => {
        handlePageChange(entityData?.pageable?.pageNumber + 1);
    };

    useEffect(() => {
        onPageChange(dateStart, dateEnd, orderStatusId, currentPage, sortBy, sortColumn);
    }, [dateStart, dateEnd, orderStatusId, currentPage, sortBy, sortColumn]);


    const handleExport = async () => {
        const sheetNames = ['Danh Sách Thống Kê Đơn Hàng'];
        try {
            console.log("totalElements: " + entityData.totalElements);
            const response = await Thongke.bill({ dateStart, dateEnd, orderStatusId, currentPage, size: entityData.totalElements === 0 ? 5 : entityData.totalElements, sortColumn, sortBy });
            if (!response || response.data.result.thongke.totalElements === 0) {
                toast.error("Không có dữ liệu");
            } else {
                return ExportExcel("Danh Sách Thống Kê Đơn Hàng.xlsx", sheetNames, [response.data.result.thongke.content]);
            }
        } catch (error) {
            console.error("Đã xảy ra lỗi khi xuất Excel:", error.response ? error.response.data : error.message);
            toast.error("Có lỗi xảy ra khi xuất dữ liệu");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const toggleRow =
        (id) => {
            if (expandedRowId === id) {
                setExpandedRowId(null); // Nếu đã mở thì click lại sẽ đóng
            } else {
                setExpandedRowId(id); // Mở hàng chi tiết
            }
        };
    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <ToastContainer />
            <div className="py-6 flex justify-between px-4 md:px-6 xl:px-7.5">
                <form method="POST">
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
                        {orderStatusId === "macdinh" ? (<></>) : (
                            <>
                                <input
                                    value={dateStart}
                                    onChange={(e) => {
                                        setDateStart(e.target.value);
                                    }}
                                    type="date"
                                    placeholder="Start Date"
                                    name="startDate"
                                    className="w-45 bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white"
                                />
                                <ArrowRightIcon className="w-5 h-5 text-black dark:text-white" />
                                <input
                                    value={dateEnd}
                                    onChange={(e) => {
                                        setDateEnd(e.target.value);
                                    }}
                                    type="date"
                                    placeholder="End Date"
                                    name="endDate"
                                    className="w-45 bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white"
                                />
                            </>
                        )}
                        <select
                            value={orderStatusId}
                            onChange={(e) => setOrderStatusId(e.target.value)}
                            className="xl:w-125 bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white"
                        >
                            <option value="" disabled>Lọc theo</option>
                            <option value="macdinh">Tất cả</option>
                            <option value="1">Chờ xử lý</option>
                            <option value="2">Đang xử lý</option>
                            <option value="3">Đang giao</option>
                            <option value="4">Đã giao</option>
                            <option value="5">Hoàn thành</option>
                            <option value="6">Đã hủy</option>
                        </select>
                    </div>
                </form>
                <form onSubmit={handleSubmit}
                    className="flex items-center space-x-2">
                    <button
                        onClick={handleExport}
                        type="button"
                        className="inline-flex items-center justify-center rounded-md bg-gray-600 py-2 px-3 text-center font-medium text-white hover:bg-opacity-90"
                    >
                        Excel
                    </button>

                </form>


            </div>
            <table className="w-full border-collapse border border-stroke dark:border-strokedark">
                <thead>
                    <tr className="border-t border-stroke dark:border-strokedark">
                        <th className="py-4.5 px-4 md:px-6 2xl:px-2.5"></th>
                        <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">#</th>
                        <th
                            onClick={() => {
                                setSortColumn("totalPrice");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1">
                                <span className="text-sm text-black dark:text-white">Tổng tiền</span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("discountPrice");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden xl:flex">
                                <span className="text-sm text-black dark:text-white">Giảm ship</span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("totalQuantity");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Sản phẩm</span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>

                        <th
                            onClick={() => {
                                setSortColumn("orderStatus.name");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Trạng thái</span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>
                        <th
                            onClick={() => {
                                setSortColumn("account.username");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Khách hàng</span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>
                        <th
                            onClick={() => {
                                setSortColumn("discountRate.discount");
                                setSortBy(!sortBy);
                            }}
                            className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                            <div className="flex items-center gap-1 hidden lg:flex">
                                <span className="text-sm text-black dark:text-white">Chiết khấu</span>
                                <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {entityData?.content?.map((entity, index) => (
                        <>
                            <tr key={index} className={`border-t border-stroke dark:border-strokedark ${expandedRowId === entity.id ? `bg-slate-100` : `bg-white`}`} onClick={() => toggleRow(entity.id)}>
                                <td
                                    className="py-4.5 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                    {expandedRowId === entity.id ? (
                                        <ChevronDownIcon className='text-sm h-5 w-5 text-black dark:text-white ml-auto' />
                                    ) : (
                                        <ChevronRightIcon className='text-sm h-5 w-5 text-black dark:text-white ml-auto' />
                                    )
                                    }
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                    {entityData.pageable.pageNumber * entityData.size + index + 1}
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                                    {/* <img className="h-12.5 w-15 rounded-md" src={entity.imageProducts[0]} alt="entity" /> */}
                                    <p className="text-sm text-black dark:text-white truncate w-24">{entity.totalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {entity.discountPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                    </div>
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {entity.totalQuantity}
                                    </div>
                                </td>

                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {entity.orderStatus.name}
                                    </div>
                                </td>

                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {entity.account.username}
                                    </div>
                                </td>
                                <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                    <div className="flex items-center gap-1 hidden xl:flex">
                                        {`${entity.discountRate.discount} %`}
                                    </div>
                                </td>
                                {/* <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 ">
                                <div className="flex items-center gap-1 hidden lg:flex">
                                    <span className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${entity.status ? 'bg-success text-success' : 'bg-danger text-danger'}`}>
                                        {entity.status ? 'Hoạt Động' : 'Đã Ngừng'}
                                    </span>
                                </div>
                            </td> */}

                            </tr>

                            {expandedRowId === entity.id && (
                                <tr className="border-t border-stroke dark:border-strokedark bg-gray-50 dark:bg-gray-800">
                                    <td colSpan={8} className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                                            <p><strong>Mã Đơn Hàng: </strong> {entity.id || "Không có thông tin"}</p>
                                            <p>
                                                <strong>Số Điện Thoại: </strong>
                                                {entity.address && entity.address.phone ? entity.address.phone : " Không có số điện thoại"}
                                            </p>

                                            <p>
                                                <strong>Phương Thức Thanh Toán: </strong>
                                                {entity.paymentMethod && entity.paymentMethod.name ? entity.paymentMethod.name : " Không xác định"}
                                            </p>

                                            <p>
                                                <strong>Phí Vận Chuyển: </strong>
                                                {
                                                    entity.voucherDetails.length > 0 ?
                                                        (<span> {entity.voucherDetails.map((voucherDetails) => {
                                                            if (voucherDetails.voucher.typeVoucher.id === 2) {
                                                                const finalPrice = entity.priceShipping - (entity.priceShipping * (voucherDetails.voucher.sale / 100));
                                                                return (
                                                                    <span key={voucherDetails.id}>
                                                                        {finalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                                                        <span style={{ textDecoration: "line-through", marginLeft: "8px", color: "gray" }}>
                                                                            {entity.priceShipping.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                                                        </span>
                                                                        <span style={{ marginLeft: "4px" }}>
                                                                            (Giảm {voucherDetails.voucher.sale}%)
                                                                        </span>
                                                                    </span>
                                                                );
                                                            }
                                                        }) || (
                                                                <span>
                                                                    {entity.priceShipping
                                                                        ? entity.priceShipping.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
                                                                        : "Không Có"}
                                                                </span>
                                                            )}</span>) :
                                                        (<span>{entity.priceShipping.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span>)
                                                }

                                            </p>
                                            <p>
                                                <strong>Voucher shop: </strong>
                                                {entity.voucherDetails && entity.voucherDetails.length > 0 ? (
                                                    entity.voucherDetails.map((voucherDetails) => {
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
                                                {entity.finishAt
                                                    ? entity.finishAt
                                                    : "Chưa Hoàn Thành"}
                                            </p>

                                            <p>
                                                <strong>Sản Phẩm: </strong>
                                                {entity.billDetails && entity.billDetails.length > 0
                                                    ? entity.billDetails.map((detail) => detail.product && detail.product.name ? detail.product.name : " Sản phẩm không xác định").join(', ')
                                                    : " Không có sản phẩm"}
                                            </p>

                                            <p>
                                                <strong>Địa Chỉ: </strong>
                                                {entity.address && entity.address.fullNameAddress ? entity.address.fullNameAddress : " Không có địa chỉ"}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
            <Pagination
                pageNumber={currentPage}
                totalPages={entityData?.totalPages}
                totalElements={entityData?.totalElements}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                setPageNumber={setCurrentPage}
                size={entityData.size}></Pagination>

        </div>
    );
};

export default TableTwo;
