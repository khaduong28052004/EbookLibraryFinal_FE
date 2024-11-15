import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Table from './components/Table_FlashSale';
import flashSale from '../../service/admin/FlashSale';

const FalshSaleAdmin = () => {
  const [data, setData] = useState([]);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const deleteFlashSale = async (id) => {
    try {
      const response = await flashSale.delete({ id });
      console.log("Mã Code: " + response.data.code);
      findAllFlashSale();
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  const findAllFlashSale = async () => {
    try {
      const response = await flashSale.findAllFlashSale({ dateStart, dateEnd, currentPage, size: 2, sortColumn, sortBy });
      console.log("content: " + response.data.result.content);
      setData(response.data.result);
      console.log(data);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const handleChange = (dateStart, dateEnd, page, sortBy, sortColumn) => {
    console.log("page: " + page);
    console.log("dateStart: " + dateStart);
    setDateStart(dateStart);
    setDateEnd(dateEnd);
    setCurrentPage(page);
    setSortBy(sortBy);
    setSortColumn(sortColumn);
  }

  useEffect(() => {
    findAllFlashSale();
  }, [currentPage, dateStart, dateEnd, sortColumn, sortBy]);
  return (
    <>
      <Breadcrumb pageName="Quản Lý Flash Sale" status='Quản Trị' />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <Table onPageChange={handleChange} entityData={data}
          onIdChange={deleteFlashSale} />
      </div>
    </>
  );
};

export default FalshSaleAdmin;
