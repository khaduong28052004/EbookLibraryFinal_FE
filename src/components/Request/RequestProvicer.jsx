import React, { createContext, useContext, useState } from 'react';

// Tạo context để quản lý yêu cầu
const RequestContext = createContext();

// Tạo component Provider để cung cấp context cho ứng dụng
export const RequestProvider = ({ children }) => {
  const [isRequesting, setIsRequesting] = useState(false);

  const [data, setData] = useState({});
  // trạng thái 1 request
  const startRequest = () => setIsRequesting(true); // Bắt đầu yêu cầu
  const endRequest = () => setIsRequesting(false); // Kết thúc yêu cầu
  //  lấy và lưu data
  const setItem = (key, value) => {
    setData(item => ({ ...item, [key]: value }));
  }
  const getItem = (key) => {
    return data[key];
  }
  return (
    <RequestContext.Provider value={{ isRequesting, startRequest, endRequest, setItem, getItem }}>
      {children}
    </RequestContext.Provider>
  );
};

// Custom Hook để sử dụng RequestContext
export const useRequest = () => {
  return useContext(RequestContext);
};


