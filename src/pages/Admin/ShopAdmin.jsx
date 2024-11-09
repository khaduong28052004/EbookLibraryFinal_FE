import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Table from './components/Table_Shop';
import accountService from '../../service/admin/Account';

const ShopAdmin = () => {
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
      findAllAccount();
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  const findAllAccount = async () => {
    try {
      const response = await accountService.findAllAccount({ currentPage, size: 2, role: "SELLER", searchItem, gender, sortColumn, sortBy });
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

  useEffect(() => {
    findAllAccount();
  }, [currentPage, searchItem, gender, sortColumn, sortBy]);

  return (
    <>
      <Breadcrumb pageName="Quản Lý Shop" status='Quản Trị' />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <Table onPageChange={handleChange} entityData={data}
          onIdChange={putStatusKhachHang} />
      </div>
    </>
  );
};

export default ShopAdmin;
