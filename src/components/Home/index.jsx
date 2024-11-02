// import { useEffect, useState } from "react";
import datas from "../../data/products.json";
import FlashSale from "./FlashaSale";

import SectionStyleThree from "../Helpers/SectionStyleThree";

import Layout from "../Partials/Layout";
// import Ads from "./Ads";
import Banner from "./Banner";

// import CampaignCountDown from "./CampaignCountDown";



const saleEndTime = '2024-12-31T23:59:59';

export default function Home() {
  const { products } = datas;
  const brands = [];
  products.forEach((product) => {
    brands.push(product.brand);
  });
  // const [ads, setAds] = useState(false);
  // const adsHandle = () => {
  //   setAds(false);
  // };
  // useEffect(() => gs
  // {
  //   setAds(true);
  // }, []);

  return (
    <>
      <Layout>
        {/* {ads && <Ads handler={adsHandle} />} */}
        <div className="btn w-5 h-5"></div>
        <Banner className="banner-wrapper mb-[60px]" />

    

      <FlashSale saleItems={products} lastDate={saleEndTime} />

        {/* <ProductsAds
          ads={[`/assets/images/ads-1.png`, `/assets/images/ads-2.png`]}
          sectionHeight="sm:h-[295px] h-full"
          className="products-ads-section mb-[60px]"
        /> */}


        <SectionStyleThree
          products={products}
          sectionTitle="Sản phẩm"
          seeMoreUrl="/all-products"
          className="new-products mb-[60px]"
        />


      </Layout>
    </>
  );
}
