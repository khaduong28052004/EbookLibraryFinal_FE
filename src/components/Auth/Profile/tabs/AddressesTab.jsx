import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeftIcon, ChevronRightIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { toast, ToastContainer } from "react-toastify";
import { deleteAddress } from "../../../../service/addressService";
import ModelAddress from './AddressModel'; // Assuming ModelAddress is your address component
import ConfirmDeleteModal from './ConfirmDeleteModal'; // Assuming ConfirmDeleteModal is your confirmation component

export default function AddressesTab() {
    const [showModal1, setShowModal1] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const accountId = 1; // Account ID
    const [addressIdToDelete, setAddressIdToDelete] = useState(null);
    const [editingAddressId, setEditingAddressId] = useState(null);

    const handleDeleteClick = (id) => {
        setAddressIdToDelete(id);
        setShowModal1(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            setShowModal1(false);
            const id = addressIdToDelete;
            await deleteAddress(id);
            fetchAddresses();
            toast.success("Xóa địa chỉ thành công");
        } catch (error) {
            console.error("Error during delete:", error);
            toast.error("Có lỗi xảy ra khi xóa địa chỉ!");
        }
    };

    const handleDeleteCancel = () => {
        setShowModal1(false);
        setAddressIdToDelete(null);
    };

    const fetchAddresses = async () => {
        const id = sessionStorage.getItem("id_account") || 1;
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/user/rest/address/fill/${id}`, {
                // params: { accountId }
            });
            setAddresses(response.data.data);
        } catch (error) {
            console.error("Error fetching addresses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='bg-white min-h-screen'>
            <div className='m-8'>
                <div className='flex justify-end'>
                    <button onClick={() => setShowModal(true)} className="w-[150px] h-[35px] rounded text-[#003EA1] text-[15px]  
                px-2 py-0 border border-[#003EA1] transition-all duration-500 ease-in-out hover:bg-gray-200  mb-5">
                        Thêm địa chỉ
                    </button>
                </div>
                <table className='w-full table-auto border-separate boder-gray'>
                    <thead>
                        <tr className='bg-gray-100 border-b text-center'>
                            <th className='p-2'>STT</th>
                            <th className='p-2'>Địa chỉ</th>
                            <th className='p-2'>Số điện thoại</th>
                            <th className='p-2'>Trạng thái</th>
                            <th className='p-2'>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addresses.map((address, index) => (
                            <tr key={address.id} className='border-b hover:bg-gray-50 hover:cursor-default  items-center text-center'>
                                <td className='p-2'>{index + 1}</td>
                                <td className='p-2'>{address.fullNameAddress || 'Địa chỉ không xác định'}</td>
                                <td className='p-2'>{address.phone}</td>
                                <td className='p-2 text-[#003EA1]'>{address.status ? 'Mặc định' : 'Không mặc định'}</td>
                                <td className='p-2 flex justify-around'>
                                    <div className=''>
                                        <PencilSquareIcon
                                            className="border border-[#003EA1] text-[#003EA1] p-2 w-10 h-10  font-semibold rounded-lg cursor-pointer"
                                            onClick={() => {
                                                setEditingAddressId(address.id);
                                                setShowModal(true);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <TrashIcon
                                            className="border border-[#003EA1]  text-[#003EA1]  p-2 w-10 h-10  font-semibold rounded-lg cursor-pointer"
                                            onClick={() => handleDeleteClick(address.id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <ModelAddress
                    isVisible={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setEditingAddressId(null);
                        fetchAddresses(); // Fetch updated addresses after adding/editing
                    }}
                    editingAddressId={editingAddressId}
                />
                <ConfirmDeleteModal
                    show={showModal1}
                    onClose={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                />
            </div>
            <ToastContainer />
        </div>
    );
};