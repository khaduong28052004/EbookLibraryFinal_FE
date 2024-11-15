import React, { Dispatch, SetStateAction, ReactNode, FormEvent, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import flashSaleDetails from '../../../service/admin/FlashSaleDetails';

const ModalFlashSale = ({
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
        product: product.id,
        flashSale: flashSaleId,
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value, // Gán đúng giá trị nhập vào
            product: product.id,
            flashSale: flashSaleId,

        }));
    };

    const postFlashSale = async () => {
        try {
            console.log("formData: " + formData);
            const response = await flashSaleDetails.post({ data: formData });
            setStatus(!status);
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
                                            Giảm giá
                                        </label>
                                        <input
                                            name="sale"
                                            value={formData.sale}
                                            onChange={handleChange}
                                            type="number"
                                            placeholder='% giảm giá'
                                            max={100}
                                            min={10}
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

export default ModalFlashSale;
