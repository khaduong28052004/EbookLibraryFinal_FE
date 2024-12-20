import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../common/Loader";
import BreadcrumbCom from "../BreadcrumbCom";
import EmptyWishlistError from "../EmptyWishlistError";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import { useRequest } from "../Request/RequestProvicer";
import ProductsTable from "./ProductsTable";

export default function Wishlist({ wishlist = true }) {
  const url_host = import.meta.env.VITE_API_BASEURL;
  const [data, setData] = useState();
  const { startRequest, endRequest } = useRequest();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      setLoading(true)
      const id_user = sessionStorage.getItem("id_account");
      if (id_user) {
        axios(`${url_host}/api/v1/user/favorite/getall/` + id_user, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }).then(response => {
          setData(response.data.result.datas);
          setLoading(false)
        }).catch(error => console.error("fetch getall favorite error " + error));
      }
    } else {
      toast.warn("vui lòng đăng nhập");
      navigate('/login')
    }
  }, []);
  const handleDelete = (id) => {
    const token = sessionStorage.getItem("token");
    const id_user = sessionStorage.getItem("id_account");
    startRequest();
    axios.delete(`${url_host}/api/v1/user/favorite/delete/` + id + "?id_user=" + id_user, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      if (response.data.code == 1000) {
        toast.success("Xoá thành công");
        setData(response.data.result.datas);
        endRequest();
      }
    }).catch(error => console.error("delete favotire error " + error));
  }
  return (
    <>
      {loading ? (<Loader />) : (<Layout childrenClasses={wishlist ? "pt-0 pb-0" : ""}>
        {wishlist === false ? (
          <div className="wishlist-page-wrapper w-full">
            <div className="container-x mx-auto">
              <BreadcrumbCom
                paths={[
                  { name: "Trang chủ", path: "/" },
                  { name: "Yêu thích", path: "/wishlist" },
                ]}
              />
              <EmptyWishlistError />
            </div>
          </div>
        ) : (
          <div className="wishlist-page-wrapper w-full bg-white pb-[60px]">
            <div className="w-full">
              <PageTitle
                title="Yêu thích"
                breadcrumb={[
                  { name: "Trang chủ", path: "/" },
                  { name: "Yêu thích", path: "/wishlist" },
                ]}
              />
            </div>
            <div className="w-full mt-[23px]">
              <div className="container-x mx-auto">
                <ProductsTable className="mb-[30px]" datas={data} handleDelete={handleDelete} />
                <div className="w-full mt-[30px] flex sm:justify-end justify-start">
                  <div className="sm:flex sm:space-x-[30px] items-center">
                    <button type="button">
                      {/* <div className="w-full text-sm font-semibold text-qred mb-5 sm:mb-0">
                      Xóa tất cả
                    </div> */}
                    </button>
                    {/* <div className="w-[180px] h-[50px]">
                    <button type="button" className="flex items-center justify-center h-full w-full bg-sky-500 text-[13px] font-semibold text-[#1d1d1d] leading-none">
                      <div className="w-full text-sm font-semibold">
                        Thêm tất cả
                      </div>
                    </button>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>)}
    </>
  );
}
