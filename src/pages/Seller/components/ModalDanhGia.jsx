import React, { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import DanhGiaService from '../../../service/Seller/danhGiaService';
import { toast, ToastContainer } from "react-toastify";

const ModalSanPham = ({
    open,
    setOpen,
    title,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    data,
    status,
    setStatus
}) => {

    const [dataRequest, setDataRequest] = useState({
        idParent: null,
        content: '',
        account: null,
        product: null
    });

    const handleChange = (event) => {
        const { value } = event.target;
        setDataRequest({
            idParent: data.id,
            content: value,
            account: data.account,
            product: data.product
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await DanhGiaService.phanHoi(dataRequest);
            setOpen(false);
            setStatus(true);
        } catch (error) {
            console.error('Có lỗi khi gửi phản hồi:', error);
            // Thực hiện xử lý lỗi nếu cần
        }
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
                                <div className="mb-6">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Phản Hồi
                                    </label>
                                    <textarea
                                        rows={4}
                                        name='content'
                                        onChange={handleChange}
                                        placeholder="Nội dung..."
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        required
                                    ></textarea>
                                </div>
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
                                    {cancelText}
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default ModalSanPham;
