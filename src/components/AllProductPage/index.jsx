import { useEffect, useState } from "react";
import BreadcrumbCom from "../BreadcrumbCom";
// import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Selectbox from "../Helpers/Selectbox";
import Arrow from "../Helpers/icons/Arrow";
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

  const location = useLocation();

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
  }, [location]);

  const handleSelected = (value) => {
    // Tạo mảng validSelected chứa các key có giá trị true
    const validSelected = Object.keys(value)
      .filter(key => value[key] === true)  // Lọc các khóa có giá trị true
      .map(key => Number(key));  // Chuyển các key thành số (vì key là chuỗi)
    console.log("selected " + value?.length);
    if (validSelected.length > 0) {
      // Gửi request chỉ khi có ít nhất một category được chọn
      axios.get(`http://localhost:8080/api/v1/user/filtercategory?id_categories=${validSelected.join(',')}`)
        .then(response => {
          setDatas(response.data.result.datas);  // Cập nhật dữ liệu
        })
        .catch(error => console.error("fetch filter by category error " + error));
    } else {
      console.log("No categories selected");
    }
  }
  useEffect(() => {
    const filterPrice = () => {
      axios.get(`http://localhost:8080/api/v1/user/filterprice?priceMin=${volume[0]}&priceMax=${volume[1]}`).then(response => {
        setDatas(response.data.result.datas);
      }).catch(error => console.log("fetch filtẻ price error " + error));
    }
    filterPrice();
  }, [volume])

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
                      {/* <span className="text-qgray"> Showing</span> 1–16 of 66
                      results */}
                    </p>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <span className="font-400 text-[13px]">Sắp xếp:</span>


                    <div className="topbar-dropdowns sm:block hidden">
                      <div className="flex space-x-">

                        <div className="language-select flex space-x-1 items-center">
                          <Selectbox className="w-28" datas={["Mặc định", "Mới nhất", "Bán chạy"]} />
                          <Arrow className="fill-current qblack" />
                        </div>
                      </div>
                    </div>


                  </div>
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


{/* Dropdown options */ }
{/* {isOpen && (
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
                      )} */}
