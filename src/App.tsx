import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';

import RouterAdmins from './RouterAdmins';
import Routers from "./Routers";
function App() {
  const [loading, setLoading] = useState(true);
  const { pathname, search } = useLocation();
  const query = new URLSearchParams(search);
  const isAdmin = query.has("/admin");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  // // if (!isAdmin) return <Routers />;

  return (
    <Routes>
      <Route path='/admin/*' element={
        <RouterAdmins />
      } />
      <Route path='/admin' element={
        <RouterAdmins />
      } />

      <Route path='/*' element={
        <Routers />
      } />

      <Route path='/' element={
        <Routers />
      } />
    </Routes>
  );
}

export default App;


