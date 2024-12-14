import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CoverOne from '../../images/cover/cover-01.png';
import userSix from '../../images/user/user-06.png';
import Header from "../../components/Partials/Headers/HeaderOne";
import Banner from "../../components/Home/Banner";

import { useState } from 'react';

const ThongTinChungAdmin = () => {
  const [drawer, setDrawer] = useState(false);

  return (
    <>
      <Breadcrumb pageName="Thông Tin Chung" status='Quản Trị' />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <Header drawerAction={() => setDrawer(!drawer)} />
        <Banner className="banner-wrapper mb-6" />

      </div>
    </>
  );
};

export default ThongTinChungAdmin;
