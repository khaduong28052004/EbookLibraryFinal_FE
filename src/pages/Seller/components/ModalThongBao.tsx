import React, { Dispatch, SetStateAction, ReactNode, FormEvent } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

interface ModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    content: string;
    setContent: Dispatch<SetStateAction<string>>; // Updated to a setter function type
    title: string;
    message: string;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    icon?: ReactNode;
    iconBgColor?: string;
    buttonBgColor?: string;
    status: boolean;
}

const Modal: React.FC<ModalProps> = ({
    open,
    setOpen,
    content,
    setContent,
    title,
    message,
    onConfirm,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    icon,
    iconBgColor = 'bg-red-100',
    buttonBgColor = "bg-red-600",
    status = true
}) => {

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-999999">
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                    {status ? (
                        <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div
                                        className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${iconBgColor} sm:mx-0 sm:h-10 sm:w-10`}
                                    >
                                        {icon} {/* Hiển thị icon động */}
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            {title}
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">{message}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        onConfirm && onConfirm();
                                        setOpen(false);
                                    }}
                                    className={`inline-flex w-full justify-center rounded-md ${buttonBgColor} px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
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
                        </DialogPanel>

                    ) :
                        (
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white border-b border-stroke  px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div
                                            className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${iconBgColor} sm:mx-0 sm:h-10 sm:w-10`}
                                        >
                                            {icon} {/* Hiển thị icon động */}
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <DialogTitle as="h3" className="text-xl mt-2 font-semibold leading-6 text-gray-900">
                                                {title}
                                            </DialogTitle>

                                        </div>
                                    </div>
                                </div>
                                <form >
                                    <div className="p-6.5">

                                        <div className="mb-6">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Lý Do
                                            </label>
                                            <textarea
                                                rows={4}
                                                placeholder="Lý do... (Phải từ 50 ký tự trở lên)"
                                                value={content}
                                                onChange={(e) => { setContent(e.target.value) }}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onConfirm && onConfirm();
                                                setOpen(false);
                                            }}
                                            disabled={content.length < 50}
                                            className={`inline-flex w-full justify-center rounded-md ${content.length > 50 ? (buttonBgColor) : ('bg-gray-400')} px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
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
                        )
                    }
                </div>
            </div>
        </Dialog >
    );
};

export default Modal;
