import React, { useEffect, useState, useRef } from 'react';
import homeShopService from "../../service/Seller/homeShopService";
import ReportModal from "../Shop/reportModal"

export default function ShopInfo({ shopData, idUser }) {
  const [shopInfo, setShopInfo] = useState({});
  const [rating, setRating] = useState([]);  // Initialize as an empty array
  const [isFollowed, setIsFollowed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleFollow = async (idShop) => {
    try {
      if (isFollowed) {
        await homeShopService.createFollower(idUser, idShop);
        setIsFollowed(false);
      } else {
        await homeShopService.createFollower(idUser, idShop);
        setIsFollowed(true);
      }
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (shopData && Object.keys(shopData).length > 0) {
      setShopInfo(shopData.shopDataEX);
      setRating(shopData.rating);
      setIsFollowed(shopData.shopDataEX.isFollowed);
    }
  }, [shopData]);


  if (!shopData || Object.keys(shopData).length === 0) {
    return null;
  }

  return (
    <div className="container-x mx-auto">
      <ReportModal accountId={idUser} shopId={shopInfo.idSeller} isOpen={isModalOpen} handleClose={closeModal} />

      <div className="rounded-md py-5 px-5 flex">
        {/* Shop Info */}
        <div
          className="border rounded-md w-5/12 py-2 px-5 relative "
          style={{
            backgroundImage: `url(${shopInfo.background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div>
            {/* Lớp phủ mờ ảnh nền */}
            <div className="absolute inset-0 bg-black opacity-60 backdrop-blur-md flex items-center"></div>

            {/* Các thành phần bên trên ảnh nền không bị mờ */}
            <div className="w-full inline-flex gap-1 mb-1 relative z-10">
              <div className="w-[18%] items-center">
                <img
                  src={shopInfo.avatar}
                  alt="avatar"
                  className={`rounded-full items-center shadow-5 w-[70px] h-[70px] ${shopInfo.background ? "bg-black" : "bg-white"
                    }`}
                />
              </div>
              <div className="w-[70%] mx-5 pt-3 relative z-10">
                <div className="text-base text-white font-medium">
                  <h1>{shopInfo.shopName}</h1>
                </div>
              </div>
              <div className='pt-3 hover:cursor-pointer' onClick={openModal}            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-5 hover:stroke-red-500 transition-colors duration-300">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                </svg>
              </div>
            </div>
            <div className="mt-2 relative z-10">
              {isFollowed ? (
                <button onClick={() => handleFollow(shopInfo.idSeller)} className="flex justify-center gap-2 border border-white text-white w-full py-1 px-5 text-sm rounded-md hover:bg-white hover:bg-opacity-20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  Đã theo dõi
                </button>
              ) : (
                <button onClick={() => handleFollow(shopInfo.idSeller)} className="flex justify-center  gap-2 border border-white text-white w-full py-1 px-5 text-sm rounded-md hover:bg-white hover:bg-opacity-20">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Theo dõi
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Shop Statistics */}
        <div className="w-7/12 flex flex-col justify-around py-2 px-10 text-gray-800 text-[15px]">
          <div className="flex py-2">
            <div className="flex flex-1 gap-2 items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="black"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </div>
              <p>Sản phẩm:</p>
              <span className="text-[#003EA1]">{shopInfo.numberOfProducts}</span>
            </div>
            <div className="flex flex-1 gap-2 items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="black"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </div>
              <p>Đánh giá:</p>
              <span className="text-[#003EA1]">
                {rating.averageStars} ({rating.totalReviews})
              </span>
            </div>
          </div>
          <div className="flex py-2">
            <div className="flex flex-1 gap-2 items-center items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="black"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>
              </div>
              <p>Người theo dõi:</p>
              <span className="text-[#003EA1]">{shopInfo.numberOfFollowers}</span>
            </div>
            <div className="flex flex-1 gap-2 items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="black"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
              </div>
              <p>Tham gia:</p>
              <span className="text-[#003EA1]"> {shopInfo?.participationTime >= 365 ? (
                <p>{Math.floor(shopInfo?.participationTime / 365)} năm</p>
              ) : (
                <p>{shopInfo?.participationTime} Ngày </p>
              )}</span>
            </div>
          </div>
          <div className="flex py-2">
            <div className="flex flex-1 gap-1 items-center items-center text-sm">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <p>Địa chỉ:</p>
              <span className="text-gray-600">{shopInfo.district}</span>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
