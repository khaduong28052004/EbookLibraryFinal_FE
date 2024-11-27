import axios from "axios";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useRequest } from "../../Request/RequestProvicer";
import Compair from "../icons/Compair";
import QuickViewIco from "../icons/QuickViewIco";
import Star from "../icons/Star";
import ThinLove from "../icons/ThinLove";
export default function ProductCardStyleOne({ datas, type }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState();
  const { startRequest, endRequest } = useRequest();
  useEffect(() => {
    const id_user = sessionStorage.getItem("id_account");
    if (id_user) {
      axios.get(`http://localhost:8080/api/v1/user/favorite/check?id_user=${id_user}&id_product=${datas?.id}`).then(response => {
        setIsFavorite(response.data.result);
      }).catch(error => console.error("fetch favorite error " + error));
    }
  }, []);

  const createFavorite = () => {
    const id_user = sessionStorage.getItem("id_account");
    startRequest();
    if (id_user) {
      axios.get(`http://localhost:8080/api/v1/user/favorite/add?id_user=${id_user}&id_product=${datas?.id}`).then(response => {
        setIsFavorite(response.data.result);
        endRequest();
      }).catch(error => console.error("create favorite error " + error));
    }
  }
  return (
    <div
      className="product-card-one w-full h-full bg-white relative group overflow-hidden"
      style={{ boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)" }}
    >
      <div
        className="product-card-img w-full h-[300px] flex justify-center"
      >

        <LazyLoad
          once={true}
          placeholder={<div className="flex justify-center mt-30">
            <ClipLoader size={50} color={"#3498db"} loading={true} />
          </div>}
        >

          <img src={datas.imageProducts[0]?.name} alt="" className="h-[100%] w-full p-7" />

        </LazyLoad>
        {/* product available progress */}
      </div>
      <div className="product-card-details px-[30px] pb-[15px] relative">
        {/* add to card button */}
        <div onClick={() => { navigate("/productdetail?idProduct=" + datas.id); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[80px] transition-all duration-300 ease-in-out z-50">
          <button
            type="button"
            className={type === 3 ? "flex items-center justify-center h-full w-full bg-[#FFBB38] text-[13px] font-semibold text-[#1d1d1d] leading-none" : "flex items-center justify-center h-full w-full bg-sky-500 text-[13px] font-semibold text-[#1d1d1d] leading-none"}
          >
            <div className="flex items-center space-x-3 " >
              <span>
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                >
                  <path d="M12.5664 4.14176C12.4665 3.87701 12.2378 3.85413 11.1135 3.85413H10.1792V3.43576C10.1792 2.78532 10.089 2.33099 9.86993 1.86359C9.47367 1.01704 8.81003 0.425438 7.94986 0.150881C7.53106 0.0201398 6.90607 -0.0354253 6.52592 0.0234083C5.47246 0.193372 4.57364 0.876496 4.11617 1.85052C3.89389 2.32772 3.80368 2.78532 3.80368 3.43576V3.8574H2.8662C1.74187 3.8574 1.51313 3.88028 1.41326 4.15483C1.36172 4.32807 0.878481 8.05093 0.6723 9.65578C0.491891 11.0547 0.324369 12.3752 0.201948 13.3688C-0.0106763 15.0815 -0.00423318 15.1077 0.00220999 15.1371V15.1404C0.0312043 15.2515 0.317925 15.5424 0.404908 15.6274L0.781834 16H13.1785L13.4588 15.7483C13.5844 15.6339 14 15.245 14 15.0521C14 14.9214 12.5922 4.21694 12.5664 4.14176ZM12.982 14.8037C12.9788 14.8266 12.953 14.8952 12.9079 14.9443L12.8435 15.0162H1.13943L0.971907 14.8331L1.63233 9.82901C1.86429 8.04766 2.07047 6.4951 2.19289 5.56684C2.24766 5.16154 2.27343 4.95563 2.28631 4.8543C2.72123 4.85103 4.62196 4.84776 6.98661 4.84776H11.6901L11.6966 4.88372C11.7481 5.1452 12.9594 14.5128 12.982 14.8037ZM4.77338 3.8574V3.48479C4.77338 3.23311 4.80559 2.88664 4.84103 2.72649C5.03111 1.90935 5.67864 1.24584 6.48726 1.03339C6.82553 0.948403 7.37964 0.97782 7.71791 1.10202H7.72113C8.0755 1.22296 8.36545 1.41907 8.63284 1.71978C9.06453 2.19698 9.2095 2.62516 9.2095 3.41615V3.8574H4.77338Z" />
                </svg>
              </span>
              <span >Thêm vào giỏ hàng</span>
            </div>
          </button>
        </div>
        <div className="reviews flex space-x-[1px] mb-3 ">
          <div className="flex space-x-[1px]">
            {Array.from(Array(datas.star), () => (
              <span>
                <Star />
              </span>
            ))}
          </div>
          {/* <sup className="text-qred font-semibold ml-2 bg-yellow-300 text-[12px]"><FontAwesomeIcon icon={faBolt} className='text-[15px]' />-{datas.flashSaleDetail?.sale}%</sup> */}

        </div>
        <a href={"/productdetail?idProduct=" + datas.id}>
          <p className="title mb-2 text-[15px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600 h-[45px]">
            {datas?.name}
          </p>
        </a>
        <p className="price">
          {datas?.flashSaleDetail ?
            (<>
              <span className=" text-qred text-[20px] font-extrabold mr-1">
                {Intl.NumberFormat().format(
                  datas?.price - ((datas?.price * datas?.sale) / 100) - ((datas?.price - ((datas?.price * datas?.sale) / 100)) * (datas?.flashSaleDetail?.sale / 100))
                )}<sup>đ</sup>
              </span>
              <span className="text-[15px] font-normal text-gray-600 line-through">
                {Intl.NumberFormat().format(datas?.price - ((datas?.price * datas?.sale) / 100))}<sup>đ</sup>
              </span>
            </>) :
            (<>
              <span className="text-[20px] font-bold mr-1">{Intl.NumberFormat().format(datas?.price - ((datas?.price * datas?.sale) / 100))}<sup>đ</sup></span>
              <span className="text-[15px] font-normal text-gray-600 line-through">{Intl.NumberFormat().format(datas?.price)}<sup>đ</sup></span>
            </>)}

        </p>
      </div>
      {/* quick-access-btns */}
      <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-20  transition-all duration-300 ease-in-out">
        <a href="#">
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <QuickViewIco />
          </span>
        </a>
        <a className="cursor-pointer">
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <ThinLove isFavorite={isFavorite} createFavorite={createFavorite} />
          </span>
        </a>
        <a href="#">
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <Compair />
          </span>
        </a>
      </div>
    </div>
  );
}
