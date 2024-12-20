import React, { Dispatch, SetStateAction, ReactNode, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { toast, ToastContainer } from 'react-toastify';
import product from '../../../service/admin/Product';

const Modal = ({
    id,
    status,
    setStatus,
    open,
    setOpen,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    icon,
    iconBgColor = 'bg-red-100',
    buttonBgColor = "bg-red-600"
}) => {
    const [contents, setContents] = useState("");

    const putActive = async (active) => {
        try {
            const response = await product.putActive(id, active, contents);
            if (response.data.code === 1000) {
                toast.success(response.data.message);
            }
            setStatus(!status);
            setContents("");
        } catch (error) {
            toast.error("Lỗi hệ thống");
            console.log("Error: " + error);
        }
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-999999">
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <ToastContainer></ToastContainer>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div
                                    className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${iconBgColor} sm:mx-0 sm:h-10 sm:w-10`}
                                >
                                    {icon} {/* Hiển thị icon động */}
                                </div>
                                <div className="mt-3 text-left w-full sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        {title}
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">{message}</p>
                                    </div>
                                    <div>
                                        <label className="my-2.5 block text-black dark:text-white">
                                            Nội dung:
                                        </label>
                                        <textarea cols={5} rows={5}
                                            placeholder="Nội dung..."
                                            onChange={(e) => { setContents(e.target.value) }}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            name="" id=""></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={() => {
                                    putActive(true);
                                    setOpen(false);
                                }}
                                className={`inline-flex w-full justify-center rounded-md ${buttonBgColor} px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
                            >
                                {confirmText}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    putActive(false);
                                    setOpen(false);
                                }}
                                className="mt-3 inline-flex min-w-16 justify-center rounded-md bg-red-600 text-white px-3 py-2 text-sm font-semibold shadow-sm red-1 ring-inset sm:mt-0 sm:w-auto"
                            >
                                {cancelText}
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default Modal;
