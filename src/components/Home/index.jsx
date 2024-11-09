import axios from "axios";
import { useEffect, useState } from "react";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import Layout from "../Partials/Layout";
import Banner from "./Banner";
import FlashSale from "./FlashaSale";






export default function Home() {

  const [data_FlashSale, setData_FlashSale] = useState();
  const [data_ProductAll, setData_ProducAll] = useState();

  const [totalPage, setTotalPage] = useState(5);
  const [currentPages, setCurrentPages] = useState(4);



  const fetchDataFlashSale = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/user/home/flashsale");
      const data = response.data.result;
      setData_FlashSale(data);
    } catch (error) {
      console.error("Error fetching flash sale data:", error);
    }
  };

  const fetchDataSelectAll = async () => {
    await axios.get("http://localhost:8080/api/v1/user/home/selectall?size=" + currentPages).then(response => {
      setData_ProducAll(response.data.result);
      setTotalPage(response.data.result.totalPages);
      setCurrentPages(response.data.result?.datas.length);
    }).catch(error => {
      console.log("fetch selectall error " + error);
    })
  }
  useEffect(() => {
    fetchDataFlashSale();
    fetchDataSelectAll();
  }, []);

  useEffect( () => {
     fetchDataSelectAll();
  }, [currentPages]);

  const handleChangePage = (current) => {
    setCurrentPages(current);
    console.log("currrent " + current);
  }
  return (
    <>
      <Layout>
        {/* {ads && <Ads handler={adsHandle} />} */}
        <div className="btn w-5 h-5"></div>
        <Banner className="banner-wrapper mb-[60px]" />
        {/* <>{data_FlashSale[0]?.product.name}</> */}


        <FlashSale products={data_FlashSale?.datas} lastDate={data_FlashSale?.lastDate} totalProducts={2} />

        {/* <ProductsAds
          ads={[`/assets/images/ads-1.png`, `/assets/images/ads-2.png`]}
          sectionHeight="sm:h-[295px] h-full"
          className="products-ads-section mb-[60px]"
        /> */}


        <SectionStyleThree
          products={data_ProductAll}
          sectionTitle="Sản phẩm"
          seeMoreUrl="/all-products"
          className="new-products mb-[60px]"
          endLength={currentPages}
          totalPages={totalPage}
          onChange={handleChangePage}
        />
      </Layout>
    </>
  );
}
