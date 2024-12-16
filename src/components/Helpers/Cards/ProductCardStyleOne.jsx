import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from 'react-icons/fa'; // Font Awesome
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRequest } from "../../Request/RequestProvicer";
import ThinLove from "../icons/ThinLove";
import ImageLoader from "../ImageLoading/ImageWithLoader.jsx";
export default function ProductCardStyleOne({ datas, type }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState();
  const { startRequest, endRequest } = useRequest();
  const url_host = import.meta.env.VITE_API_BASEURL;
  useEffect(() => {
    const id_user = sessionStorage.getItem("id_account");
    if (id_user) {
      axios.get(`${url_host}/api/v1/user/favorite/check?id_user=${id_user}&id_product=${datas?.id}`).then(response => {
        setIsFavorite(response.data.result);
      }).catch(error => console.error("fetch favorite error " + error));
    }
  }, []);

  const createFavorite = () => {
    const id_user = sessionStorage.getItem("id_account");
    startRequest();
    if (id_user) {
      axios.get(`${url_host}/api/v1/user/favorite/add?id_user=${id_user}&id_product=${datas?.id}`).then(response => {
        setIsFavorite(response.data.result);
        endRequest();
      }).catch(error => console.error("create favorite error " + error));
    }
  }
  const handleCreateCart = () => {
    startRequest();
    const id_user = sessionStorage.getItem("id_account");
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.get(`${url_host}/api/v1/user/cart/add?id_user=${id_user}&id_product=${datas.id}&quantity=${1}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(response => {
        if (response.data.code = 1000) {
          toast.success("Thêm thành công");
          endRequest();
        }
      }).catch(error => console.error("create cart error " + error));
    } else {
      toast.warn("Vui lòng đăng nhập");
    }
  }

  const handleShare = () => {
    const productUrl = `${window.location.origin}/productdetail?idProduct=${datas.id}`;
    if (navigator.share) {
      navigator.share({
        title: datas.name,
        text: `Check out this product: ${datas.name}`,
        url: productUrl,
      })
        .then(() => toast.success("Đã chia sẻ thành công!"))
        .catch(() => toast.error("Chia sẻ không thành công."));
    } else {
      navigator.clipboard.writeText(productUrl)
        .then(() => toast.success("Liên kết đã được sao chép!"))
        .catch(() => toast.error("Không thể sao chép liên kết."));
    }
  };

  return (
    <div
      className="hover:shadow-2xl transition-shadow duration-600 product-card-one w-full h-full bg-white relative group overflow-hidden rounded-lg shadow-sm "
    // style={{ boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)" }}
    >
      <div
        className="product-card-img w-full h-[200px] flex justify-center"
      >
        <div className="relative">
          <ImageLoader
            src={datas?.imageProducts[0]?.name || ""}
            alt="Product Image"
            className="h-[100%] w-full p-4"
          />
        </div>

        {/* product available progress */}
      </div>
      <div className="product-card-details px-[30px] pb-[15px] relative text-white">
        {/* add to card button */}
        <div onClick={() => {
          handleCreateCart();
        }} className="absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[105px] transition-all duration-300 ease-in-out z-50">
          <button
            type="button"
            className={type === 3 ? "flex items-center justify-center h-full w-full bg-[#FFBB38] text-[13px] font-semibold text-[#1d1d1d] leading-none" : "flex items-center justify-center h-full w-full bg-[#003EA1] text-[13px] font-semibold text-[#1d1d1d] leading-none"}
          >
            <div className="flex items-center space-x-3 text-white" >
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
        <a className="cursor-pointer hover:text-blue-500" onClick={() => { navigate("/productdetail?idProduct=" + datas.id); window.scrollTo({ top: 0, behavior: "smooth" }) }}>
          <p className="title mb-2 text-[15px] font-400 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600 h-[45px]">
            {datas?.name}
          </p>
        </a>
        <p className="price">
          {datas?.flashSaleDetail?.id > 0 ?
            (<>
              <div className="grid grid-cols-1">
                <div className="flex items-center">
                  <span className=" text-qred text-[20px] font-extrabold mr-1">
                    {Intl.NumberFormat().format(
                      datas?.price - ((datas?.price * datas?.sale) / 100) - ((datas?.price - ((datas?.price * datas?.sale) / 100)) * (datas?.flashSaleDetail?.sale / 100))
                    )}<sup>đ</sup>
                  </span>
                  <div className="bg-red-600 rounded-[4px] flex items-center">
                    <span className="text-[12px] font-semibold p-[4px] text-center justify-center">-{datas?.flashSaleDetail?.sale}%</span>
                  </div>
                </div>
                <span className="text-[15px] font-normal text-gray-600 line-through">
                  {Intl.NumberFormat().format(datas?.price - ((datas?.price * datas?.sale) / 100))}<sup>đ</sup>
                </span>
              </div>



            </>) :
            (<>
              <div className="grid grid-cols-1">
                <div className="flex items-center">
                  <span className="text-[17px] font-semibold text-red-700 mr-1">{Intl.NumberFormat().format(datas?.price - ((datas?.price * datas?.sale) / 100))}<sup>đ</sup></span>
                  <div className="bg-red-600 rounded-[4px] flex items-center">
                    <span className="text-[12px] font-semibold p-[4px] text-center justify-center">-{datas?.sale}%</span>
                  </div>
                </div>
                <span className="text-[15px] font-normal text-gray-600 line-through">{Intl.NumberFormat().format(datas?.price)}<sup>đ</sup></span>
              </div>
            </>)}

        </p>
        <div>
          <div className="reviews flex space-x-[1px] mb-3 mt-2">
            <div className="flex space-x-[1px]">
              <div className="flex ">
                {Array.from(Array(datas?.star), () => (
                  <span>
                    <FaStar size={15} color="gold" /> {/* Font Awesome Star */}
                  </span>
                ))}
                {datas?.star > 0 ? (<span className="text-gray-300 text-[12px] font-extralight">({datas?.quantityEvalue}) | </span>) : (<div className="h-[18px]"></div>)}
              </div>
              <span className="text-gray-500 font-light text-[12px]">Đã bán <span className="text-black-2">{datas?.sold > 1000 ? datas?.sold / 1000 + "k" : datas?.sold}</span></span>
            </div>
          </div>
        </div>
      </div>
      {/* quick-access-btns */}
      <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-20  transition-all duration-300 ease-in-out">
        {/* <a href="#">
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <QuickViewIco />
          </span>
        </a> */}
        <p className="cursor-pointer">
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <ThinLove isFavorite={isFavorite} createFavorite={createFavorite} />
          </span>
        </p>
        {/* <a href="#">
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <Compair createFavorite={handleShare} />
            chia sẻ
            <ShareModal datas={datas}/>
          </span>
        </a> */}
      </div>
    </div>
  );
}


