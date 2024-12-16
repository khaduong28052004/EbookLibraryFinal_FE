import { useEffect, useState } from "react";
import BreadcrumbCom from "../BreadcrumbCom";
// import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import axios from "axios";
import LazyLoad from "react-lazyload";
import { useLocation } from "react-router-dom";
import Pagination from '../../pages/Admin/components/Pagination';
// import Pagination from '../../pages/Seller/components/pagination';
import SearchService from "../../service/user/search";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Layout from "../Partials/Layout";
import ProductsFilter from "./ProductsFilter";

export default function AllProductPage() {
  const url_host = import.meta.env.VITE_API_BASEURL;
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
  const [currentPage, setCurrentPage] = useState(0);

  const [volume, setVolume] = useState([200, 500]);
  // const [volume, setVolume] = useState([0,0]);

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

  const [datas, setDatas] = useState([]);
  const [dataPagination, setDataPagination] = useState([]);

  const [listCategory, setListCategory] = useState([]);

  const [status, setStatus] = useState("search");

  const [min, setMin] = useState('');
  const [max, setMax] = useState('');


  // Toggle the dropdown open/close
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {// tìm kiếm không ma trận
    const text = query.get("text");
    const idProduct = query.get('idProduct');
    const textAudio = query.get('textAudio');
    // Nếu có idProduct
    if (idProduct) {
      const idProducts = idProduct.split(',').map(Number);
      // Kiểm tra nếu idProducts không rỗng và có giá trị hợp lệ
      if (idProducts.length > 0) {
        searchImage(idProducts);
      } else {
        setDatas([]);
        console.error("ID product không hợp lệ");
      }
    } else if (status === "category") {
      filtercategoryAudio(listCategory);
      console.log("CATEGORY");
      // setStatus("");
    } else if (status === "price") {
      filterPriceAudio(min, max);
      console.log("PRICE");
      // setStatus("");
    } else {
      if (textAudio) {
        if (status === "search") {
          searchAudio(textAudio);
        } else {
          axios.get(`${url_host}/api/v1/user/search?text=` + text)

            .then(response => {
              setDatas(response.data.result.datas);
              setCategories(response.data.result.categories);
              setDataPagination([]);
              // console.log("text " + response.data.result.datas);
            })
            .catch(error => console.error("fetch data search error " + error));
        }
      } else {
        axios.get(`${url_host}/api/v1/user/search?text=` + text)
          .then(response => {
            setDatas(response.data.result.datas);
            setCategories(response.data.result.categories);
            setDataPagination([]);
            // console.log("text " + response.data.result.datas);
          })
          .catch(error => console.error("fetch data search error " + error));
      }
    }
  }, [location, currentPage, status]);

  const handlePageChange = (newPage) => {// newPage
    if (newPage >= 0 && newPage < data.totalPages) {
      setCurrentPage(newPage);
      console.log("currentPage: " + newPage);
    }
  };

  const handlePrevious = () => {// load data bỏ 
    handlePageChange(currentPage - 1);
  };

  const handleNext = () => { // load data thêm 
    handlePageChange(currentPage + 1);
  };

  const searchImage = async (idProducts) => {// tìm theo hình (phuc)
    try {
      const response = await SearchService.searchByIds(idProducts, currentPage);
      setDatas(response.data.result.content);
      setDataPagination(response.data.result);
      // 
    } catch (error) {
      console.log(error)
    }
  }

  const searchAudio = async (text) => {  // tìm audio (tuyến)
    try {
      // setStatus("search");
      const response = await SearchService.searchAudio(text, currentPage);
      setDatas(response.data.result.product.content);
      setDataPagination(response.data.result.product);
      setCategories(response.data.result.categories);
      // console.log("data: " + datas?.length);
    } catch (error) {
      console.log(error)
    }
  }

  const filtercategoryAudio = async (validSelected) => {  // tìm audio (tuyến)
    try {
      const response = await SearchService.filtercategoryAudio(validSelected, currentPage);
      setDatas(response.data.result.content);  // Cập nhật dữ liệu
      setDataPagination(response.data.result);
      // console.log()
    } catch (error) {
      console.log(error)
    }
  }



  const filterPriceAudio = async (priceMin, priceMax) => {  // tìm audio (tuyến)
    try {
      const response = await SearchService.filterPriceAudio(priceMin, priceMax, currentPage);
      setDatas(response.data.result.content);  // Cập nhật dữ liệu
      setDataPagination(response.data.result);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelected = (value) => { //filer theo  danh mục theo giá (kha)
    const textAudio = query.get("textAudio"); // Lấy tham số 'textAudio'
    setStatus("category");

    // Tạo mảng validSelected chứa các key có giá trị true
    const validSelected = Object.keys(value)
      .filter(key => value[key] === true)  // Lọc các khóa có giá trị true
      .map(key => Number(key));  // Chuyển các key thành số (vì key là chuỗi)
    console.log("selected " + value?.length);
    if (validSelected.length > 0) {
      if (textAudio) {
        setListCategory(validSelected.join(','));
        filtercategoryAudio(validSelected.join(','));
      } else {
        // Gửi request chỉ khi có ít nhất một category được chọn
        axios.get(`${url_host}/api/v1/user/filtercategory?id_categories=${validSelected.join(',')}`)
          .then(response => {
            setDatas(response.data.result.datas);  // Cập nhật dữ liệu
          })
          .catch(error => console.error("fetch filter by category error " + error));
      }
    } else {
      console.log("No categories selected");
    }
  }

  useEffect(() => { //filer theo  danh mục theo giá (kha)
    const textAudio = query.get("textAudio"); // Lấy tham số 'textAudio'
    if (textAudio) {
      setMin(volume[0]);
      setMax(volume[1]);
      filterPriceAudio(volume[0], volume[1]);
      console.log("SearchPrice.");
    } else {
      const filterPrice = () => {
        axios.get(`${url_host}/api/v1/user/filterprice?priceMin=${volume[0]}&priceMax=${volume[1]}`).then(response => {
          setDatas(response.data.result.datas);
        }).catch(error => console.log("fetch filtẻ price error " + error));
      }
      filterPrice();
    }
  }, [volume, status === 'price'])

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
                  volumeHandler={(value) => { setVolume(value); setStatus("price") }}
                  storage={storage}
                  filterstorage={filterStorage}
                  className="mb-[30px]"
                  categories={categories}
                  handleSelected={handleSelected}
                  setPage={setCurrentPage}
                />
                {/* ads */}

              </div>

              <div className="flex-1">
                {/* <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[5px]">
                  <div>
                    <p className="font-400 text-[13px]">
                      <span className="text-qgray"> Showing</span> 1–16 of 66
                      results
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
                </div> */}
                {/* <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[5px]"> */}
                {/* <DataIteration datas={products} startLength={0} endLength={6}>
                    {({ datas }) => (
                      <div data-aos="fade-up" key={datas.id}>
                        <ProductCardStyleOne datas={datas} />
                      </div>
                    )}
                  </DataIteration> */}
                {/* </div> */}
                {datas.length > 0 ? (
                  <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">

                    <DataIteration
                      datas={datas}
                      startLength={0}
                      endLength={datas?.length}
                    >

                      {({ datas }) => (
                        <div data-aos="fade-up" key={datas.id}>
                          <LazyLoad
                            // once={true}
                            key={datas?.id}
                            height={100}
                            offset={[-100, 100]}
                            // placeholder={<div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                            //   <div class="animate-pulse flex space-x-4">
                            //     <div class="flex-1 space-y-3 py-1">
                            //       <div class="rounded-none bg-slate-700 h-[165px] w-full"></div>
                            //       <div class="h-5 bg-slate-700 rounded"></div>
                            //       <div class="h-5 bg-slate-700 rounded"></div>
                            //       <div class="space-y-3">
                            //         <div class="grid grid-cols-4 gap-4">
                            //           <div class="h-5 bg-slate-700 rounded col-span-2"></div>
                            //           <div class="h-5 bg-slate-700 rounded col-span-2"></div>
                            //         </div>
                            //       </div>
                            //     </div>
                            //   </div>
                            // </div>}
                            placeholder={<div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                              <div class="animate-pulse flex space-x-4">
                                <div class="flex-1 space-y-3 py-1">
                                  <div class="rounded-none bg-slate-700 h-[165px] w-full"></div>
                                  <div class="h-5 bg-slate-700 rounded"></div>
                                  <div class="h-5 bg-slate-700 rounded"></div>
                                  <div class="space-y-3">
                                    <div class="grid grid-cols-4 gap-4">
                                      <div class="h-5 bg-slate-700 rounded col-span-2"></div>
                                      <div class="h-5 bg-slate-700 rounded col-span-2"></div>
                                    </div>
                                    {/* <div class="h-2 bg-slate-700 rounded"></div> */}
                                  </div>
                                </div>
                              </div>
                            </div>}
                          >

                            <ProductCardStyleOne datas={datas} />

                          </LazyLoad>
                        </div>
                      )}
                    </DataIteration>


                  </div>

                ) : (
                  <div className="flex justify-center items-center min-h-screen bg-white  ">
                    <div className="text-center">
                      <img
                        width="70"
                        height="70"
                        src="https://img.icons8.com/glassmorphism/48/book.png"
                        alt="book"
                        className="mx-auto mb-4"
                      />
                      <p className="text-gray-500 text-lg font-semibold">Không tìm thấy sản phẩm</p>
                    </div>
                  </div>

                )}
                {dataPagination?.content?.length > 0 ? (
                  <Pagination
                    pageNumber={currentPage}
                    totalPages={dataPagination?.totalPages}
                    totalElements={dataPagination?.totalElements}
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                    setPageNumber={setCurrentPage}
                    size={dataPagination?.size}></Pagination>
                ) : (<></>)}
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
