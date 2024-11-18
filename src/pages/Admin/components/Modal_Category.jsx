import React, { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import categoryService from '../../../service/admin/Category';
import { toast, ToastContainer } from 'react-toastify';

const ModalCategory = ({
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
        name: '',
        idParent: 0,
        account: sessionStorage.getItem("id_account"),
    };
   

    const [formData, setFormData] = useState(initialFormData);

    const user = JSON.parse(sessionStorage.getItem("user"))?.fullname;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (entity != null) {
            setFormData({
                id: entity.id || '',
                name: entity.name || '',
                idParent: entity.idParent || 0,
                account: sessionStorage.getItem("id_account"),
            });
        } else {
            setFormData({
                name: '',
                idParent: 0,
                account: sessionStorage.getItem("id_account"),
            });
        }
    }, [entity]);

    const postCategory = async () => {
        try {
            const response = await categoryService.post({ data: formData });
            setStatus(!status);
            const responseCode = response.data.code;
            if (responseCode !== 1000) {
                toast.error(response.data.message);
            } else {
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    }
    const putCategory = async () => {
        try {
            const response = await categoryService.put({ data: formData });
            setStatus(!status);
            const responseCode = response.data.code;
            if (responseCode !== 1000) {
                toast.error(response.data.message);
            } else {
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    const handleSubmit = (e) => {
        if (entity != null) {
            putCategory();
        } else {
            postCategory();
        }
        setFormData(initialFormData);
        e.preventDefault(); // Chặn hành vi reload trang khi submit form
        setOpen(false); // Đóng modal sau khi submit
    };
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
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            {entity != null ? 'Người cập nhật' : 'Người tạo'}
                                        </label>
                                        <input
                                            name="user"
                                            value={user}
                                            readOnly
                                            type="text"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Tên danh mục
                                        </label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="Tên danh mục ..."
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

export default ModalCategory;
