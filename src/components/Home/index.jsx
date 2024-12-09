import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import Layout from "../Partials/Layout";
import Banner from "./Banner";
import FlashSale from "./FlashaSale";

export default function Home() {
  const [data_FlashSale, setData_FlashSale] = useState([]);
  const [data_ProductAll, setData_ProducAll] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const location = useLocation();

  // Fetch dữ liệu Flash Sale
  const fetchDataFlashSale = async () => {
    const id_account = sessionStorage.getItem("id_account") || 0;
    try {
      const response = await axios.get("http://localhost:8080/api/v1/user/home/flashsale?id_Shop=" + id_account);
      const data = response.data.result;
      setData_FlashSale(data);
    } catch (error) {
      console.error("Error fetching flash sale data:", error);
    }
  };

  // Fetch tất cả sản phẩm với phân trang
  const fetchDataSelectAll = async () => {
    const id_account = sessionStorage.getItem("id_account") || 0;
    await axios.get("http://localhost:8080/api/v1/user/home/selectall?id_Shop=" + id_account + "&page=" + currentPage)
      .then(response => {
        if (currentPage > 0) {
          setData_ProducAll((prev) => [...prev, ...response.data.result?.datas]);
        } else {
          setData_ProducAll(response.data.result?.datas);
        }
        setTotalPages(response.data.result?.totalPages);
      }).catch(error => {
        console.log("fetch selectall error " + error);
      });
  };


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
    fetchDataFlashSale();
    fetchDataSelectAll();
  }, [location]);

  return (
    <>
      <Layout>
        <Banner className="banner-wrapper mb-6" />
        <FlashSale products={data_FlashSale?.datas} lastDate={data_FlashSale?.lastDate} totalProducts={2} />
        <SectionStyleThree
          products={data_ProductAll}
          sectionTitle="Sản phẩm"
          seeMoreUrl="/all-products"
          className="new-products mb-[60px]"
        />
      </Layout>
    </>
  );
}
