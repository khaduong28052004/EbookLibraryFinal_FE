import React, { Dispatch, SetStateAction, ReactNode, FormEvent, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import flashSale from '../../../service/admin/FlashSale';

const ModalFlashSale = ({
    id,
    open,
    setOpen,
    title,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
}) => {
    const initialFormData = {
        dateStart: '',
        dateEnd: '',
        account: '',
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const postFlashSale = async () => {
        try {
            const response = await flashSale.post({ data: formData });
            console.log("Code: " + response.data.result.code);
            console.log("Data: " + response.data.result.content);
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    const handleSubmit = (e) => {
        postFlashSale(formData);
        setFormData(initialFormData);
        e.preventDefault(); // Chặn hành vi reload trang khi submit form
        setOpen(false); // Đóng modal sau khi submit
    };
    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-999999">
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-semibold text-xl text-black dark:text-white">
                                {title}
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Ngày bắt đầu
                                        </label>
                                        <input
                                            name="dateStart"
                                            value={formData.dateStart}
                                            onChange={handleChange}
                                            type="datetime-local"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Ngày kết thúc
                                        </label>
                                        <input
                                            name="dateEnd"
                                            value={formData.dateEnd}
                                            onChange={handleChange}
                                            type="datetime-local"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex w-full ml-auto mr-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                                >
                                    {confirmText}
                                </button>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="submit"
                                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                                >
                                    {confirmText}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                        {/* <table className="w-full border-collapse border border-stroke dark:border-strokedark">
                            <thead>
                                <tr className="border-t border-stroke dark:border-strokedark">
                                    <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">#</th>
                                    <th
                                        onClick={() => {
                                            setSortColumn("account.fullname");
                                            setSortBy(!sortBy);
                                        }}
                                        className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm text-black dark:text-white">Người tạo </span>
                                            <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                            <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                                        </div>
                                    </th>

                                    <th
                                        onClick={() => {
                                            setSortColumn("dateStart");
                                            setSortBy(!sortBy);
                                        }}
                                        className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                        <div className="flex items-center gap-1 hidden xl:flex">
                                            <span className="text-sm text-black dark:text-white ">Ngày bắt đầu</span>
                                            <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                            <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                                        </div>
                                    </th>

                                    <th
                                        onClick={() => {
                                            setSortColumn("dateEnd");
                                            setSortBy(!sortBy);
                                        }}
                                        className="cursor-pointer py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                        <div className="flex items-center gap-1 hidden xl:flex">
                                            <span className="text-sm text-black dark:text-white">Ngày kết thúc</span>
                                            <ArrowLongDownIcon className="h-4 w-4 text-black dark:text-white" />
                                            <ArrowLongUpIcon className="h-4 w-4 text-black dark:text-white" />
                                        </div>
                                    </th>

                                    <th className=" py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                        <div className="flex items-center gap-1 hidden lg:flex">
                                            <span className="text-sm text-black dark:text-white">Trạng thái</span>
                                        </div>
                                    </th>
                                    <th className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-left font-medium">
                                        <span className="text-sm text-black dark:text-white truncate w-24">Actions</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {entityData?.content?.map((entity, index) => (
                                    <tr key={index} className="border-t border-stroke dark:border-strokedark">
                                        <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                            {index + 1}
                                        </td>
                                        <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                                            <p className="text-sm text-black dark:text-white truncate w-24">{entity.account.fullname}</p>
                                        </td>
                                        <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white">
                                            <div className="flex items-center gap-1 hidden xl:flex">
                                                {entity.dateStart}
                                            </div>
                                        </td>
                                        <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 text-sm text-black dark:text-white ">
                                            <div className="flex items-center gap-1 hidden xl:flex">
                                                {entity.dateEnd}
                                            </div>
                                        </td>

                                        <td className="py-4.5 px-4 md:px-6 2xl:px-7.5 ">
                                            <div className="flex items-center gap-1 hidden lg:flex">
                                                <span className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${!entity.delete ? 'bg-success text-success' : 'bg-danger text-danger'}`}>
                                                    {!entity.delete ? 'Hoạt Động' : 'Đã Ngừng'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4.5 px-4 md:px-6 2xl:px-7.5">
                                            <div className="flex space-x-3.5">
                                                <button onClick={() => { setId(entity.id); setIsOpen(true); setStatusentity(!entity.delete); }}>
                                                    {!entity.delete ? (<TrashIcon className='w-5 h-5 text-black hover:text-red-600  dark:text-white' />) : (<ReceiptRefundIcon className='w-5 h-5 text-black hover:text-yellow-600  dark:text-white' />)}
                                                </button>
                                                <button onClick={() => setIsOpenModalSP(true)}>
                                                    <ArrowPathIcon className='w-5 h-5 text-black hover:text-green-600  dark:text-white' />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> */}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default ModalFlashSale;
