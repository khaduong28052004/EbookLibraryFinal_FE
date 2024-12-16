import React, { useEffect } from "react";

const ToastNotification = ({ isOpen, message, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer); // Clear timeout nếu component bị unmount.
    }
  }, [isOpen, onClose, duration]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 bg-white text-gray-800 shadow-lg rounded-lg p-4 transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      style={{ minWidth: "250px" }}
    >
      {/* Nội dung thông báo */}
      <h3 className="text-lg font-semibold mb-2">Thông báo</h3>
      <p className="text-sm text-gray-600">{message}</p>

      {/* Nút Đóng */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition duration-200"
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
};

export default ToastNotification;
