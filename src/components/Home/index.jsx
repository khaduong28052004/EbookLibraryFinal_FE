import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../common/Loader";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import Layout from "../Partials/Layout";
import ProductCarousel from '../ProductCarousel';
import { useRequest } from "../Request/RequestProvicer";
import Banner from "./Banner";
import FlashSale from "./FlashaSale";
export default function Home() {
  const [data_FlashSale, setData_FlashSale] = useState([]);
  const [data_ProductAll, setData_ProducAll] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const location = useLocation();
  const [suggests, setSuggests] = useState([]);
  const { isRequesting } = useRequest();
  const [loading, setLoading] = useState(false);
  // Fetch dữ liệu Flash Sale

  const url_host = import.meta.env.VITE_API_BASEURL;
  const fetchDataFlashSale = async () => {
    const id_account = sessionStorage.getItem("id_account") || 0;
    setLoading(true);
    try {
      const response = await axios.get(`${url_host}/api/v1/user/home/flashsale?id_Shop=` + id_account);
      const data = response.data.result;
      setData_FlashSale(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching flash sale data:", error);
    }
  };

  // Fetch tất cả sản phẩm với phân trang
  const fetchDataSelectAll = async () => {
    const id_account = sessionStorage.getItem("id_account") || 0;
    await axios.get(`${url_host}/api/v1/user/home/selectall?id_Shop=` + id_account + "&page=" + currentPage)
      .then(response => {
        if (currentPage > 0 && currentPage < totalPages) {
          setData_ProducAll((prev) => [...prev, ...response.data.result?.datas]);
        } else if (currentPage == 0) {
          setData_ProducAll(response.data.result?.datas);
        }
        setTotalPages(response.data.result?.totalPages);
      }).catch(error => {
        console.log("fetch selectall error " + error);
      });
  };

  const fetchSuggests = async () => {
    var id_user = 0;
    const token = sessionStorage.getItem("token");
    if (token) {
      id_user = sessionStorage.getItem("id_account");
    }
    await axios.get(`${url_host}/api/v1/user/home/suggest?id_user=` + id_user).then(response => {
      setSuggests(response.data.result);

    }).catch(error => console.error("fetch suggest error : " + error));
  }


  const checkScroll = () => {

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = window.innerHeight;

    // Kiểm tra nếu người dùng cuộn đến cuối trang
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      if (currentPage < totalPages - 1) {
        setCurrentPage((prev) => prev + 1);
      }
    }
  };

  // Lắng nghe sự kiện cuộn của window
  useEffect(() => {
    if (currentPage < totalPages - 1) {
      window.addEventListener('scroll', checkScroll);
      return () => {
        window.removeEventListener('scroll', checkScroll);
      };
    }
  }, [currentPage, totalPages]);

  // Lắng nghe thay đổi currentPage và fetch dữ liệu
  useEffect(() => {
    fetchDataSelectAll(); // Gọi fetch khi currentPage thay đổi
  }, [currentPage]);

  // Lắng nghe thay đổi location và fetch dữ liệu khi trang thay đổi
  useEffect(() => {
    fetchSuggests();
    fetchDataFlashSale();
    fetchDataSelectAll();
  }, [location]);

  return (
    <>
      {loading ? (
        // <div className="flex justify-center items-center h-screen">
        <Loader />
      ) : (<Layout>
        <Banner className="banner-wrapper" />
        <div className="bg-red-500 mt-10">
          <FlashSale products={data_FlashSale?.datas} lastDate={data_FlashSale?.lastDate} totalProducts={2} />
        </div>

        <div className="w-full  pt-5 pb-5">
          <ProductCarousel />
        </div>


        <div>
          <div className="bg-blue-700 font-bold text-white ml-27 mr-27 mt-5 text-[25px] rounded-t-lg pl-5 p-2">
            GỢI Ý HÔM NAY
          </div>

          <SectionStyleThree
            products={suggests}
            sectionTitle=""
            seeMoreUrl="/all-products"
            className="bg-white mb-[60px] ml-27 mr-27 rounded-b-lg"
          />
        </div>

        <div>
          <div className="bg-blue-700 font-bold text-white ml-27 mr-27 mt-5 text-[25px] rounded-t-lg pl-5 p-2">
            DANH SÁCH SẢN PHẨM
          </div>

          <SectionStyleThree
            products={data_ProductAll}
            sectionTitle=""
            seeMoreUrl="/all-products"
            className="bg-white mb-[60px] ml-27 mr-27 rounded-b-lg"
          />
        </div>
      </Layout>)}
    </>
  );
}
