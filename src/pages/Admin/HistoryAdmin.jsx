import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Table from './components/Table_History';

const HistoryAdmin = () => {
  return (
    <>
      <Breadcrumb pageName="Quản Lý Lịch Sử" status='Quản Trị' />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <Table />
      </div>
    </>
  );
};

export default HistoryAdmin;
