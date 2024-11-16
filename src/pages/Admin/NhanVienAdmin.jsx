import React, { useState, useEffect, useRef } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Table from './components/Table_NhanVien';
import accountService from '../../service/admin/Account';

const NhanVienAdmin = () => {
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [gender, setGender] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const deleteNhanVien = async (id) => {
    try {
      const response = await accountService.delete({ id });
      console.log("xóa: " + response.data.result.message);
      findAllAccount();
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  const findAllAccount = async () => {
    try {
      const response = await accountService.findAllAccount({ currentPage, size: 2, role: "ADMINV1", searchItem, gender, sortColumn, sortBy });
      console.log("content: " + response.data.result.content);
      setData(response.data.result);
      console.log(data);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const handleChange = (searchItem, gender, page, sortBy, sortColumn) => {
    console.log("page: " + page);
    console.log("searchItem: " + searchItem);

    setCurrentPage(page);
    setSearchItem(searchItem);
    setSortBy(sortBy);
    setSortColumn(sortColumn);
    setGender(gender);
  }

  const handleId = (id) => {
    deleteNhanVien(id);
    findAllAccount();
  }

  useEffect(() => {
    findAllAccount();
  }, [currentPage, searchItem, gender, sortColumn, sortBy]);

  return (
    <>
      <Breadcrumb pageName="Quản Lý Nhân Viên" status='Quản Trị' />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <Table />
      </div>
    </>
  );
};

export default NhanVienAdmin;
