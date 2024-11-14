import { useEffect, useState } from "react";
import BreadcrumbCom from "../BreadcrumbCom";
// import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Layout from "../Partials/Layout";
import ProductsFilter from "./ProductsFilter";

export default function AllProductPage() {
  const [filters, setFilter] = useState({
    mobileLaptop: false,
    gaming: false,
    imageVideo: false,
    vehicles: false,
    furnitures: false,
    sport: false,
    foodDrinks: false,
    fashion: false,
    toilet: false,
    makeupCorner: false,
    babyItem: false,
    apple: false,
    samsung: false,
    walton: false,
    oneplus: false,
    vivo: false,
    oppo: false,
    xiomi: false,
    others: false,
    sizeS: false,
    sizeM: false,
    sizeL: false,
    sizeXL: false,
    sizeXXL: false,
    sizeFit: false,
  });

  const checkboxHandler = (e) => {
    const { name } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const [volume, setVolume] = useState([200, 500]);

  const [storage, setStorage] = useState(null);
  const filterStorage = (value) => {
    setStorage(value);
  };
  const [filterToggle, setToggle] = useState(false);
  // ---------------------------------------------------
  const local = useLocation();
  const query = new URLSearchParams(local.search);

  const [isOpen, setIsOpen] = useState(false);

  const [categories, setCategories] = useState();

  const [datas, setDatas] = useState();


  // Toggle the dropdown open/close
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const text = query.get("text");

    axios.get("http://localhost:8080/api/v1/user/search?text=" + text).then(response => {
      setDatas(response.data.result.datas);
      setCategories(response.data.result.categories);
      // console.log("text " + response.data.result.datas);
    }).catch(error => console.error("fetch data search error " + error));
  }, []);

  const handleSelected = (value) => {
    var validSelected = [];
    console.log("value category " + value);
  }

  return (
    <>
      <Layout>
        <div className="products-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom />
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-[270px]">
                <ProductsFilter
                  filterToggle={filterToggle}
                  filterToggleHandler={() => setToggle(!filterToggle)}
                  filters={filters}
                  checkboxHandler={checkboxHandler}
                  volume={volume}
                  volumeHandler={(value) => setVolume(value)}
                  storage={storage}
                  filterstorage={filterStorage}
                  className="mb-[30px]"
                  categories={categories}
                  handleSelected={handleSelected}
                />
                {/* ads */}
     
              </div>

              <div className="flex-1">
                <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[5px]">
                  <div>
                    <p className="font-400 text-[13px]">
                      <span className="text-qgray"> Showing</span> 1–16 of 66
                      results
                    </p>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <span className="font-400 text-[13px]">Sắp xếp:</span>

                    <div className="relative">
                      <ul className="flex space-x-3 items-center cursor-pointer" onClick={toggleDropdown}>
                        <li className="font-400 text-[13px] text-qgray">
                          Mặc định
                        </li>
                        <li className="flex items-center">
                          <svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1 1L5 5L9 1" stroke="#9A9A9A" />
                          </svg>
                        </li>
                      </ul>

                      {/* Dropdown options */}
                      {isOpen && (
                        <ul className="absolute left-0 mt-2 w-[100px] bg-white border border-qgray rounded-md shadow-lg z-10">
                          <li className="px-4 py-2 text-sm text-qgray hover:bg-qgray-light cursor-pointer">
                            Mặc định
                          </li>
                          <li className="px-4 py-2 text-sm text-qgray hover:bg-qgray-light cursor-pointer">
                            Mới nhất
                          </li>
                          <li className="px-4 py-2 text-sm text-qgray hover:bg-qgray-light cursor-pointer">
                            Bán chạy
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setToggle(!filterToggle)}
                    type="button"
                    className="w-10 lg:hidden h-10 rounded flex justify-center items-center border border-qyellow text-qyellow"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[5px]">
                  {/* <DataIteration datas={products} startLength={0} endLength={6}>
                    {({ datas }) => (
                      <div data-aos="fade-up" key={datas.id}>
                        <ProductCardStyleOne datas={datas} />
                      </div>
                    )}
                  </DataIteration> */}
                </div>
                <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
                  <DataIteration
                    datas={datas}
                    startLength={0}
                    endLength={datas?.length}
                  >
                    {({ datas }) => (
                      <div data-aos="fade-up" key={datas.id}>
                        <ProductCardStyleOne datas={datas} />
                      </div>
                    )}
                  </DataIteration>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
