import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Table from './components/Table_Shop';
import TableDuyetShop from './components/Table_DuyetShop';

const ShopAdmin = () => {
  const [status, setStatus] = useState(true);

  return (
    <>
      <Breadcrumb pageName="Quản Lý Shop" status='Quản Trị' />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <Table status={status} />
        <TableDuyetShop status={status} setStatus={setStatus} />
      </div>
    </>
  );
};

export default ShopAdmin;
