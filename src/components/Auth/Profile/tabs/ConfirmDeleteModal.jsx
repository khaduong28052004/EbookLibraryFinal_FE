import React from "react";

const ConfirmDeleteModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null; // Không hiển thị nếu show = false

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="text-lg font-semibold">Xác nhận xóa</h3>
                    <button className="text-gray-500 hover:text-black" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="py-4">
                    <p>Bạn có chắc chắn muốn xóa địa chỉ này không?</p>
                </div>
                <div className="flex justify-end space-x-4 pt-4 border-t">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        onClick={onClose}
                    >
                        Hủy
                    </button>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
