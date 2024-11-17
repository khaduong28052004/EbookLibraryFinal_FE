import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Table from './components/Table_Shop';
import TableDuyetShop from './components/Table_DuyetShop';
import accountService from '../../service/admin/Account';

const ShopAdmin = () => {
  const [data, setData] = useState([]);
  const [dataDuyet, setDataDuyet] = useState([]);

  const [searchItem, setSearchItem] = useState('');
  const [gender, setGender] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const [searchItemDuyet, setSearchItemDuyet] = useState('');
  const [genderDuyet, setGenderDuyet] = useState('');
  const [sortColumnDuyet, setSortColumnDuyet] = useState('');
  const [sortByDuyet, setSortByDuyet] = useState('');
  const [currentPageDuyet, setCurrentPageDuyet] = useState(0);

  const putStatus = async (id) => {
    try {
      const response = await accountService.putStatus({ id });
      console.log("Mã Code status: " + response.data.code);
      findAllSellerNotBrowse();
      findAllAccount();
    } catch (error) {
      console.log("Error: " + error);
    }
  }


  const putActive = async (id, status) => {
    try {
      const response = await accountService.putActive({ id, status });
      console.log("Mã Code active: " + response.data.code);
      findAllSellerNotBrowse();
      findAllAccount();
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  const findAllAccount = async () => {
    try {
      const response = await accountService.findAllAccount({ currentPage, size: 2, role: "SELLER", searchItem, gender, sortColumn, sortBy });
      setData(response.data.result);
      console.log(data);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const findAllSellerNotBrowse = async () => {
    try {
      const response = await accountService.findAllSellerNotBrowse({ currentPage, size: 2, searchItem, gender, sortColumn, sortBy });
      console.log("FindAllSellerNotBrowse: ");
      setDataDuyet(response.data.result);
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

  const handleChangeDuyet = (searchItem, gender, page, sortBy, sortColumn) => {
    setCurrentPageDuyet(page);
    console.log("pageDuyet: " + page);
    console.log("CurrentPageDuyet: " + currentPageDuyet);
    setSearchItemDuyet(searchItem);
    setSortByDuyet(sortBy);
    setSortColumnDuyet(sortColumn);
    setGenderDuyet(gender);
  }


  // const handleChangeDuyet = (searchItemDuyet, genderDuyet, page, sortByDuyet, sortColumnDuyet) => {    
  //   setCurrentPageDuyet(page);
  //   console.log("pageDuyet: " + page);
  //   console.log("CurrentPageDuyet: " + currentPageDuyet);
  //   setSearchItemDuyet(searchItemDuyet);
  //   setSortByDuyet(sortByDuyet);
  //   setSortColumnDuyet(sortColumnDuyet);
  //   setGenderDuyet(genderDuyet);
  // }

  const handleIdChange = (id, status) => {
    if (typeof status === 'boolean') {
      putActive(id, status);
    } else {
      putStatus(id);
    }

  }

  useEffect(() => {
    findAllAccount();
  }, [currentPage, searchItem, gender, sortColumn, sortBy]);


  useEffect(() => {
    console.log("currentPageDuyet changed:", currentPageDuyet);
    findAllSellerNotBrowse();
  }, [currentPageDuyet, searchItemDuyet, genderDuyet, sortColumnDuyet, sortByDuyet]);


  return (
    <>
      <Breadcrumb pageName="Quản Lý Shop" status='Quản Trị' />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <Table onPageChange={handleChange} entityData={data}
          onIdChange={handleIdChange} />
        <TableDuyetShop onPageChange={handleChangeDuyet} entityData={dataDuyet}
          onIdChange={handleIdChange} />
      </div>
    </>
  );
};

export default ShopAdmin;
