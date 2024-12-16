import axios from "axios";
import { useEffect, useRef, useState } from "react";
import LazyLoad from "react-lazyload";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../common/Loader";
import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import InputCom from "../Helpers/InputCom";
import Layout from "../Partials/Layout";
import { useRequest } from "../Request/RequestProvicer";
import { formatTimeAgo } from "../service/DateTime";
import ProductView from "./ProductView";
import Reviews from "./Reviews";
import SallerInfo from "./SallerInfo";
export default function SingleProductPage() {
  const [imageMultipart, setImageMultipart] = useState([]);
  const url_host = import.meta.env.VITE_API_BASEURL;
  const [images, setImages] = useState([]);

  const [checkSubmit, setCheckSubmit] = useState(true);
  const handleFileChange = (file) => {

    const newImages = {
      name: file.name,
      src: URL.createObjectURL(file),
    };
    setImageMultipart(fileImage => [...fileImage, file]);
    setImages((prevImages) => [...prevImages, { ...newImages }]);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };


  const [tab, setTab] = useState("des");
  // const [rating, setRating] = useState(0);
  // const [hover, setHover] = useState(0);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const reviewElement = useRef(null);
  const [report, setReport] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { startRequest, endRequest } = useRequest();
  const inputChangeTitle = (event) => {
    const { value } = event.target;
    setTitle(value);
    console.log(value);
  }
  const inputChangesContent = (event) => {
    const { value } = event.target;
    setContent(value);
    console.log(value);
  }

  const submitReport = () => {
    const token = sessionStorage.getItem("token");
    const id_user = sessionStorage.getItem("id_account");
    if (!title.trim()) {
      toast.warn("Vui lòng nhập title");
      return;
    }

    if (!content.trim()) {
      toast.warn("Vui lòng nhập content");
      return;
    }
    if (images?.length > 4) {
      toast.warn("Tối đa 4 ảnh");
      return;
    }
    if (token && checkSubmit) {
      setCheckSubmit(false);
      startRequest();
      axios.post(`${url_host}/api/v1/user/report/product`, {
        title: title,
        content: content,
        id_user: id_user,
        id_product: query.get("idProduct"),
        images: imageMultipart
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        setReport(false);
        endRequest();
      }).catch(error => console.error(" create report product error " + error));
    }
  }

  // --------------------------------------------------------------------------------------------------------------------------------------
  const [product, setProduct] = useState();
  const [seller, setSeller] = useState();
  const [relatedProduct, setRelatedProduct] = useState();
  const [productSeller, setProductSeller] = useState();
  const local = useLocation();
  const query = new URLSearchParams(local.search);
  const fetchProduct = async () => {
    setLoading(true);
    await axios.get(`${url_host}/api/v1/user/productdetail/product/` + query.get("idProduct")).then(response => {
      setProduct(response.data.result.product);
      setSeller(response.data.result.seller);
      setLoading(false);
    }).catch(error => {
      console.error("fetch product detail error " + error);
    });
  };

  const fetchRelated = async () => {
    await axios.get(`${url_host}/api/v1/user/productdetail/related`).then(response => {
      setRelatedProduct(response.data.result);
    }).catch(error => console.error("fetch related product error " + error));
  };

  const fetchProductSeller = async () => {
    await axios.get(`${url_host}/api/v1/user/productdetail/seller`).then(response => {
      setProductSeller(response.data.result);
    }).catch(error => console.error("fetch product seller error " + error));
  }

  useEffect(() => {
    fetchProduct();
  }, [local]);
  useEffect(() => {
    fetchRelated();
    fetchProductSeller();
  }, [product, seller]);
  const Content = ({ htmlString }) => {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: htmlString }}
      ></div>
    );
  };

  return (
    <>
      {loading ? (<Loader />) : (
        <Layout childrenClasses="pt-0 pb-0">
          <div className="single-product-wrapper w-full ">
            <div className="product-view-main-wrapper bg-white pt-[30px] w-full">
              <div className="breadcrumb-wrapper w-full ">
                <div className="container-x mx-auto">
                  <BreadcrumbCom
                    paths={[
                      { name: "Trang chủ", path: "/" },
                      { name: "Chi tiết sản phẩm", path: "/single-product" },
                    ]}
                  />
                </div>
              </div>
              <div className="w-full bg-white pb-[60px]">
                <div className="container-x mx-auto">
                  <ProductView reportHandler={() => setReport(!report)} product={product} />
                </div>
              </div>
            </div>
            <div
              className="product-des-wrapper w-full relative pb-[60px]"
              ref={reviewElement}
            >
              <div className="tab-buttons w-full mb-10 mt-5 sm:mt-0">
                <div className="container-x mx-auto">
                  <ul className="flex space-x-12 ">
                    <li>
                      <span
                        onClick={() => setTab("des")}
                        className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${tab === "des"
                          ? "border-qyellow text-qblack "
                          : "border-transparent text-qgray"
                          }`}
                      >
                        Mô tả
                      </span>
                    </li>
                    <li>
                      <span
                        onClick={() => setTab("review")}
                        className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${tab === "review"
                          ? "border-qyellow text-qblack "
                          : "border-transparent text-qgray"
                          }`}
                      >
                        Đánh giá
                      </span>
                    </li>
                    <li>
                      <span
                        onClick={() => setTab("info")}
                        className={`py-[15px] sm:text-[15px] text-sm sm:block border-b font-medium cursor-pointer ${tab === "info"
                          ? "border-qyellow text-qblack "
                          : "border-transparent text-qgray"
                          }`}
                      >
                        Thông tin người bán
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="w-full h-[1px] bg-[#E8E8E8] absolute left-0 sm:top-[50px] top-[36px] -z-10"></div>
              </div>
              <div className="tab-contents w-full min-h-[400px] ">
                <div className="container-x mx-auto">
                  {tab === "des" && (
                    <div data-aos="fade-up" className="w-full tab-content-item">
                      <h6 className="text-[18px] font-medium text-qblack mb-2">
                        Giới thiệu
                      </h6>
                      <p className="text-[15px] text-qgray text-normal mb-10">
                        <Content htmlString={product?.introduce} />

                      </p>
                      <div>
                        <h6 className="text-[18px] text-medium mb-4">
                          Đặc trưng :
                        </h6>
                        <ul className="list-disc ml-[15px]">
                          <li className="font-normal text-qgray leading-9">
                            Tác giả : {product?.writerName}
                          </li>
                          <li className="font-normal text-qgray leading-9">
                            Nhà xuất bản : {product?.publishingCompany}
                          </li>
                          <li className="font-normal text-qgray leading-9">
                            Số lượng còn lại : {product?.quantity}
                          </li>
                          <li className="font-normal text-qgray leading-9">
                            Ngày đăng : {formatTimeAgo(product?.createAt)}
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  {tab === "review" && (
                    <div data-aos="fade-up" className="w-full tab-content-item">
                      <h6 className="text-[18px] font-medium text-qblack mb-2">
                        Đánh giá
                      </h6>
                      {/* review-comments */}
                      <div className="w-full">
                        <Reviews

                          comments={product?.evalues}

                        />
                      </div>
                    </div>
                  )}
                  {tab === "info" && (
                    <div data-aos="fade-up" className="w-full tab-content-item">
                      <SallerInfo seller={seller} datas={productSeller?.datas} />
                    </div>
                  )}
                </div>
              </div>
            </div>




            <div className="related-product w-full bg-white">
              <div className="container-x mx-auto">
                <div className="w-full py-[60px]">
                  <h1 className="sm:text-3xl text-xl font-600 text-qblacktext leading-none mb-[30px]">
                    Sản phẩm liên quan
                  </h1>
                  <div
                    data-aos="fade-up"
                    className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5"
                  >
                    <DataIteration
                      datas={relatedProduct?.datas}
                      startLength={0}
                      endLength={relatedProduct?.datas?.length}
                    >
                      {({ datas }) => (
                        <div key={datas.id} className="item">
                          <LazyLoad
                            // once={true}
                            key={datas?.id}
                            height={100}
                            offset={[-100, 100]}
                          // placeholder={<div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                          //   <div class="animate-pulse flex space-x-4">
                          //     <div class="flex-1 space-y-3 py-1">
                          //       <div class="rounded-none bg-slate-700 h-[265px] w-full"></div>
                          //       <div class="h-5 bg-slate-700 rounded"></div>
                          //       <div class="h-5 bg-slate-700 rounded"></div>
                          //       <div class="space-y-3">
                          //         <div class="grid grid-cols-4 gap-4">
                          //           <div class="h-5 bg-slate-700 rounded col-span-2"></div>
                          //           <div class="h-5 bg-slate-700 rounded col-span-2"></div>
                          //         </div>
                          //         {/* <div class="h-2 bg-slate-700 rounded"></div> */}
                          //       </div>
                          //     </div>
                          //   </div>
                          // </div>}
                          >
                            <div>
                              <ProductCardStyleOne datas={datas} />
                            </div>
                          </LazyLoad>
                        </div>
                      )}
                    </DataIteration>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {report && (
            <div className="w-full h-full flex fixed left-0 top-0 justify-center z-50 items-center">
              <div
                onClick={() => setReport(!report)}
                className="w-full h-full fixed left-0 right-0 bg-black  bg-opacity-25"
              ></div>
              <div
                data-aos="fade-up"
                className="sm:w-[548px] sm:h-auto w-full h-full bg-white relative py-[40px] px-[38px]"
                style={{ zIndex: "999" }}
              >
                <div className="title-bar flex items-center justify-between mb-3">
                  <h6 className="text-2xl font-medium">Báo cáo sản phẩm</h6>
                  <span
                    className="cursor-pointer"
                    onClick={() => setReport(!report)}
                  >
                    <svg
                      width="54"
                      height="54"
                      viewBox="0 0 54 54"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26.9399 54.0001C12.0678 53.9832 -0.0210736 41.827 2.75822e-05 26.9125C0.0211287 12.0507 12.1965 -0.0315946 27.115 6.20658e-05C41.9703 0.0317188 54.0401 12.2153 54 27.1404C53.9599 41.9452 41.7972 54.0191 26.9399 54.0001ZM18.8476 16.4088C17.6765 16.4404 16.9844 16.871 16.6151 17.7194C16.1952 18.6881 16.3893 19.5745 17.1363 20.3258C19.0966 22.2906 21.0252 24.2913 23.0425 26.197C23.7599 26.8745 23.6397 27.2206 23.0045 27.8305C21.078 29.6793 19.2148 31.5956 17.3241 33.4802C16.9211 33.8812 16.5581 34.3012 16.4505 34.8857C16.269 35.884 16.6953 36.8337 17.5456 37.3106C18.4382 37.8129 19.5038 37.6631 20.3394 36.8421C22.3673 34.8435 24.3866 32.8365 26.3723 30.7999C26.8513 30.3082 27.1298 30.2871 27.6193 30.7915C29.529 32.7584 31.4851 34.6789 33.4201 36.6184C33.8463 37.0447 34.2831 37.4436 34.9098 37.5491C35.9184 37.7201 36.849 37.2895 37.3196 36.4264C37.7964 35.5548 37.6677 34.508 36.8912 33.7144C34.9731 31.756 33.0677 29.7806 31.0631 27.9149C30.238 27.1467 30.3688 26.7479 31.1031 26.0535C32.9896 24.266 34.8022 22.3982 36.6338 20.5516C37.7922 19.3845 37.8914 17.9832 36.9081 17.0293C35.9501 16.1007 34.5975 16.2146 33.4623 17.3416C31.5188 19.2748 29.5649 21.1995 27.6594 23.1664C27.1446 23.6983 26.8492 23.6962 26.3343 23.1664C24.4267 21.1974 22.4664 19.2811 20.5336 17.3374C19.9997 16.7971 19.4258 16.3666 18.8476 16.4088Z"
                        fill="#F34336"
                      />
                    </svg>
                  </span>
                </div>

                <div className="inputs w-full">
                  <div className="w-full mb-5">
                    <InputCom
                      label="Tiêu đề*"
                      placeholder="Tiêu đề báo cáo ở đây"
                      type="text"
                      name="name"
                      inputHandler={inputChangeTitle}
                      inputClasses="h-[50px]"
                      labelClasses="text-[13px] font-600 leading-[24px] text-qblack"
                    />
                  </div>
                  <div className="w-full mb-[10px]">
                    <h6 className="input-label  capitalize text-[13px] font-600 leading-[24px] text-qblack block mb-2 ">
                      Nội dung
                    </h6>
                    <textarea
                      name="content"
                      id=""
                      cols="30"
                      rows="6"
                      onChange={inputChangesContent}
                      className="w-full focus:ring-0 focus:outline-none py-3 px-4 border border-qgray-border  placeholder:text-sm text-sm"
                      placeholder="Nội dung báo cáo ở đây"
                    ></textarea>
                  </div>


                  {/* Khu vực kéo thả hoặc upload file */}
                  <div
                    className="mb-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg py-2 px-4 hover:border-blue-500 hover:bg-gray-100 transition"
                  >
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      tải lên một tệp
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          handleFileChange(file);
                        }
                      }}
                    />
                  </div>
                  {images?.length > 0 ? (<div className="flex border   p-1 mb-2">
                    {images?.map((image, index) => (
                      <div className="relative w-20">
                        <img src={image?.src} className="w-full" alt="Product" />
                        <button
                          className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-700 transition"
                          onClick={() => removeImage(index)}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 54 54"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M26.9399 54.0001C12.0678 53.9832 -0.0210736 41.827 2.75822e-05 26.9125C0.0211287 12.0507 12.1965 -0.0315946 27.115 6.20658e-05C41.9703 0.0317188 54.0401 12.2153 54 27.1404C53.9599 41.9452 41.7972 54.0191 26.9399 54.0001ZM18.8476 16.4088C17.6765 16.4404 16.9844 16.871 16.6151 17.7194C16.1952 18.6881 16.3893 19.5745 17.1363 20.3258C19.0966 22.2906 21.0252 24.2913 23.0425 26.197C23.7599 26.8745 23.6397 27.2206 23.0045 27.8305C21.078 29.6793 19.2148 31.5956 17.3241 33.4802C16.9211 33.8812 16.5581 34.3012 16.4505 34.8857C16.269 35.884 16.6953 36.8337 17.5456 37.3106C18.4382 37.8129 19.5038 37.6631 20.3394 36.8421C22.3673 34.8435 24.3866 32.8365 26.3723 30.7999C26.8513 30.3082 27.1298 30.2871 27.6193 30.7915C29.529 32.7584 31.4851 34.6789 33.4201 36.6184C33.8463 37.0447 34.2831 37.4436 34.9098 37.5491C35.9184 37.7201 36.849 37.2895 37.3196 36.4264C37.7964 35.5548 37.6677 34.508 36.8912 33.7144C34.9731 31.756 33.0677 29.7806 31.0631 27.9149C30.238 27.1467 30.3688 26.7479 31.1031 26.0535C32.9896 24.266 34.8022 22.3982 36.6338 20.5516C37.7922 19.3845 37.8914 17.9832 36.9081 17.0293C35.9501 16.1007 34.5975 16.2146 33.4623 17.3416C31.5188 19.2748 29.5649 21.1995 27.6594 23.1664C27.1446 23.6983 26.8492 23.6962 26.3343 23.1664C24.4267 21.1974 22.4664 19.2811 20.5336 17.3374C19.9997 16.7971 19.4258 16.3666 18.8476 16.4088Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </div>



                    ))}
                  </div>) : (<></>)}


                  <button onClick={() => submitReport()} type="button" className="w-full h-[50px] black-btn">
                    Gửi báo cáo
                  </button>
                </div>
              </div>
            </div>
          )}
        </Layout>
      )}
    </>
  );
}
