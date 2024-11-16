import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Table from './components/Table_Product';
import product from '../../service/admin/Product';

const SanPhamAdmin = () => {
  const [data, setData] = useState([]);

  const [searchItem, setSearchItem] = useState('');
  const [option, setOption] = useState('');
  const [status, setStatus] = useState('');

  const [sortColumn, setSortColumn] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const findAllProduct = async () => {
    try {
      const response = await product.findAllProduct({ searchItem, option, currentPage, size: 2, sortColumn, sortBy });
      setData(response.data.result);
    } catch (error) {
      console.log("Error: " + error);
    }
  }
  const putActive = async (id,status) => {
    try {
      const response = await product.putActive({ id, status });
      console.log("xóa: " + response.data.result.message);
      findAllProduct();
    } catch (error) {
      console.log("Error: " + error);
    }
  }
  const putStatus = async (id) => {
    try {
      const response = await product.putStatus({ id });
      console.log("xóa: " + response.data.result.message);
      findAllProduct();
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  const handleChange = (option, searchItem, currentPage, sortBy, sortColumn) => {
    setOption(option);
    setCurrentPage(currentPage);
    setSortBy(sortBy);
    setSortColumn(sortColumn);
    setSearchItem(searchItem);
  }

  useEffect(() => {
    findAllProduct();
  }, [option, searchItem, currentPage, sortColumn, sortBy]);

  const handleId = (id, optionModal, status) => {
    setStatus(status);
    console.log("statusentity: " + status);
    console.log("status; " + status);
    console.log("optionModal: " + optionModal);

    if (optionModal) {
      putStatus(id);
      console.log("===>status");
    } else {
      putActive(id, status);
      console.log("===>active");
    }
    findAllProduct();
  }
  return (
    <>
      <Breadcrumb pageName="Quản Lý Sản Phẩm" status='Quản Trị' />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <Table onPageChange={handleChange} entityData={data} onIdChange={handleId} />
      </div>
    </>
  );
};

export default SanPhamAdmin;
