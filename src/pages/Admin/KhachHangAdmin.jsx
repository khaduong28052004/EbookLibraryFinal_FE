import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Table from './components/Table_KhachHang';
import accountService from '../../service/admin/Account';
import { toast, ToastContainer } from 'react-toastify';

const KhachHangAdmin = () => {
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [gender, setGender] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const putStatusKhachHang = async (id) => {
    try {
      const response = await accountService.putStatus({ id });
      console.log("Mã Code: " + response.data.code);
      if (response.data.code === 1000) {
        toast.success(response.data.message);
      }
      findAllAccount();
    } catch (error) {
      toast.error("Lỗi hệ thống");
      console.log("Error: " + error);
    }
  }

  const findAllAccount = async () => {
    try {
      const response = await accountService.findAllAccount({ currentPage, size: 2, role: "USER", searchItem, gender, sortColumn, sortBy });
      console.log("content: " + response.data.result.content);
      setData(response.data.result);
      console.log(data);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const handleChange = (searchItem, gender, page, sortBy, sortColumn) => {
    setCurrentPage(page);
    setSearchItem(searchItem);
    setSortBy(sortBy);
    setSortColumn(sortColumn);
    setGender(gender);
  }

  useEffect(() => {
    findAllAccount();
  }, [currentPage, searchItem, gender, sortColumn, sortBy]);
  return (
    <>
      <Breadcrumb pageName="Quản Lý Khách Hàng" status='Quản Trị' />
      <ToastContainer></ToastContainer>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <Table onPageChange={handleChange} entityData={data}
          onIdChange={putStatusKhachHang} />
      </div>
    </>
  );
};

export default KhachHangAdmin;
