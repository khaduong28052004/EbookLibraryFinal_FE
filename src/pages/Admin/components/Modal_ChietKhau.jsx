import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import discountRateService from '../../../service/admin/DisscountRate';

const ModalSanPham = ({
    status,
    entity,
    setStatus,
    open,
    setOpen,
    title,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
}) => {
    const initialFormData = {
        discount: '',
        dateStart: ''
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const postChietKhau = async () => {
        try {
            const response = await discountRateService.post(formData);
            toast.success(response.data.message);
            setFormData(initialFormData);
            setOpen(false);
            setStatus(!status);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error: " + error);
        }
    }

    const putChietKhau = async () => {
        try {
            const response = await discountRateService.put(formData);
            toast.success(response.data.message);
            setFormData(initialFormData);
            setOpen(false);
            setStatus(!status);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error: " + error);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (entity == null) {
            postChietKhau();
        } else {
            putChietKhau();
        }
    }
    useEffect(() => {
        if (entity == null) {
            setFormData({
                discount: '',
                dateStart: '',
            })
        } else {
            setFormData({
                id: entity.id,
                discount: entity.discount || '',
                dateStart: entity.dateStart || '',
            })
        }
    }, [entity]);
    ;
    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-999999">
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <ToastContainer></ToastContainer>
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
                                            Phần trăm chiết khấu
                                        </label>
                                        <input
                                            name="discount"
                                            value={formData.discount}
                                            onChange={handleChange}
                                            type="number"
                                            placeholder="Phần trăm chiết khấu..."
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Ngày bắt đầu
                                        </label>
                                        <input
                                            name="dateStart"
                                            value={formData.dateStart}
                                            onChange={handleChange}
                                            type="datetime-local"
                                            placeholder="Ngày bắt đầu..."
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    onClick={handleSubmit}
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
