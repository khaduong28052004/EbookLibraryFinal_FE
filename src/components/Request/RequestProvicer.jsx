import CryptoJS from "crypto-js"; // Import thư viện mã hóa
import React, { createContext, useContext, useMemo, useState } from "react";

const SECRET_KEY = "74823748937289472387489237497"; // Khóa bí mật dùng để mã hóa

// Tạo context để quản lý yêu cầu
const RequestContext = createContext();

// Tạo component Provider để cung cấp context cho ứng dụng
export const RequestProvider = ({ children }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [data, setDataState] = useState(() => {
    // Lấy dữ liệu từ sessionStorage khi khởi tạo
    const storedData = sessionStorage.getItem("appData");
    return storedData ? JSON.parse(storedData) : {};
  });

  // Memo hóa dữ liệu để tối ưu hóa hiệu suất
  const dataMemo = useMemo(() => data, [data]);

  // Mã hóa một giá trị
  const encryptValue = (value) => {
    return CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
  };

  // Giải mã một giá trị
  const decryptValue = (encryptedValue) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error("Decryption error:", error);
      return null;
    }
  };

  // Lưu dữ liệu vào sessionStorage (dữ liệu được mã hóa trước khi lưu)
  const setItem = (key, value) => {
    const encryptedValue = encryptValue(value);
    const updatedData = { ...dataMemo, [key]: encryptedValue };
    setDataState(updatedData);

    // Cập nhật sessionStorage
    sessionStorage.setItem("appData", JSON.stringify(updatedData));
  };

  // Lấy dữ liệu từ sessionStorage (dữ liệu được giải mã trước khi trả về)
  const getItem = (key) => {
    const encryptedValue = dataMemo[key];
    if (!encryptedValue) return null;
    return decryptValue(encryptedValue);
  };

  // Bắt đầu và kết thúc trạng thái yêu cầu
  const startRequest = () => setIsRequesting(true);
  const endRequest = () => setIsRequesting(false);

  return (
    <RequestContext.Provider
      value={{ isRequesting, startRequest, endRequest, setItem, getItem }}
    >
      {children}
    </RequestContext.Provider>
  );
};

// Custom Hook để sử dụng RequestContext
export const useRequest = () => {
  return useContext(RequestContext);
};
