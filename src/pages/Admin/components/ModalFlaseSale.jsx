import React, { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import flashSale from '../../../service/admin/FlashSale';
import { toast, ToastContainer } from 'react-toastify';

const ModalFlashSale = ({
    entity,
    status,
    setStatus,
    open,
    setOpen,
    title,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
}) => {
    const initialFormData = {
        title: '',
        dateStart: '',
        dateEnd: '',
        account: sessionStorage.getItem("id_account"),
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
            toast.success(response.data.message);
            setStatus(!status);
            setFormData(initialFormData);
            setOpen(false);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error: " + error);
        }
    }


    const putFlashSale = async () => {
        try {
            const response = await flashSale.put({ data: formData });
            setStatus(!status);
            toast.success(response.data.message);
            setFormData(initialFormData);
            setOpen(false);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error: " + error);
        }
    }

    useEffect(() => {
        if (entity != null) {
            setFormData({
                id: entity.id || '',
                title: entity.title || '',
                dateStart: entity.dateStart || '',
                dateEnd: entity.dateEnd || '',
                account: sessionStorage.getItem("id_account"),
            });
            console.log("====================update");
            console.log("====================entity.id: " + entity.id);
            console.log("====================entity.title: " + entity.title);
            console.log("====================entity.dateStart: " + entity.dateStart);
            console.log("====================entity.dateEnd: " + entity.dateEnd);
            console.log("====================account: " + sessionStorage.getItem("id_account"));
        } else {
            setFormData({
                title: '',
                dateStart: '',
                dateEnd: '',
                account: sessionStorage.getItem("id_account"),
            });
            console.log("====================create");
        }
    }, [entity]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (new Date(formData.dateStart) >= new Date(formData.dateEnd)) {
            toast.error("Ngày bắt đầu phải trước ngày kết thúc.");
            return;
        }
        if (entity != null) {
            putFlashSale();
        } else {
            postFlashSale();
        }
    };
    function formatDatetimeLocal(value) {
        const date = new Date(value); // Chuyển chuỗi ISO thành đối tượng Date
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-999999">
            <ToastContainer></ToastContainer>
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
                                    <div className="w-full xl:w-full">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Tên Flash sale
                                        </label>
                                        <input
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            type="text"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Ngày bắt đầu
                                        </label>
                                        <input
                                            name="dateStart"
                                            value={formatDatetimeLocal(formData.dateStart)}
                                            onChange={handleChange}
                                            type="datetime-local"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Ngày kết thúc
                                        </label>
                                        <input
                                            name="dateEnd"
                                            value={formatDatetimeLocal(formData.dateEnd)}
                                            onChange={handleChange}
                                            type="datetime-local"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                </div>
                                <button
                                    type="submit"
                                    className="inline-flex w-full ml-auto mr-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
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

export default ModalFlashSale;
