import React, { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { toast, ToastContainer } from 'react-toastify';
import flashSaleDetails from '../../../service/admin/FlashSaleDetails';

const ModalFlashSaleDetails = ({
    entity,
    product,
    flashSaleId,
    open,
    setOpen,
    title,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    status,
    setStatus
}) => {
    const initialFormData = {
        quantity: '',
        sale: '',
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (entity == null) {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
                product: product.id,
                flashSale: flashSaleId,

            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
                id: entity.id || '',
                product: entity.product.id || '',
                flashSale: entity.flashSale.id || '',
            }));
        };

    }
    const postFlashSaleDetails = async () => {
        try {
            const response = await flashSaleDetails.post({ data: formData });
            toast.success(response.data.message);
            setStatus(!status);
            setFormData(initialFormData);
            setOpen(false);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error: " + error);
        }
    }

    const putFlashSaleDetails = async () => {
        try {
            const response = await flashSaleDetails.put({ data: formData });
            toast.success(response.data.message);
            setStatus(!status);
            setFormData(initialFormData);
            setOpen(false);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error: " + error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (entity == null) {
            postFlashSaleDetails();
        } else {
            putFlashSaleDetails();
        }
    }
    useEffect(() => {
        if (entity == null) {
            setFormData({
                quantity: '',
                sale: '',
                product: product.id || '',
                flashSale: flashSaleId || '',
            })
        } else {
            setFormData({
                id: entity.id || '',
                quantity: entity.quantity || '',
                sale: entity.sale || '',
                product: entity.product.id || '',
                flashSale: entity.flashSale.id || '',
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
                                            Giảm giá
                                        </label>
                                        <input
                                            name="sale"
                                            value={formData.sale}
                                            onChange={handleChange}
                                            type="number"
                                            placeholder='% giảm giá'
                                            max={100}
                                            min={1}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Số lượng sale
                                        </label>
                                        <input
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            type="number"
                                            placeholder='Số lượng sale'
                                            max={product.quantity}
                                            min={1}
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
                                    type="submit"
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

export default ModalFlashSaleDetails;
