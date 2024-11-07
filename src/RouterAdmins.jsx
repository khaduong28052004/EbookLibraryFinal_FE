import { Route, Routes } from "react-router-dom";
import ECommerce from './pages/Dashboard/ECommerce';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import TrangChuAdmin from "./pages/Admin/TrangChuAdmin"



export default function RouterAdmins() {
  return (
    <DefaultLayout>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Trang Chủ" />
              <TrangChuAdmin />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}
