import { UserMinusIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Star from "../Helpers/icons/Star";
import LazyLoad from 'react-lazyload';
export default function SallerInfo({ seller, datas }) {
  const local = useLocation();
  const [isFollower, setIsFollower] = useState(false);
  useEffect(() => {
    const id_user = sessionStorage.getItem("id_account");
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.get(`http://localhost:8080/api/v1/user/follower/check?id_user=${id_user}&id_shop=${seller?.id}`).then(
        response => {
          setIsFollower(response.data.result);
        }
      ).catch(error => console.error("fetch follower error " + error));
    }

  }, [local]);

  const handleFollower = () => {
    const id_user = sessionStorage.getItem("id_account");
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.get(`http://localhost:8080/api/v1/user/follower/create?id_user=${id_user}&id_shop=${seller?.id}`).then(
        response => {
          setIsFollower(response.data.result);
        }
      ).catch(error => console.error("fetch follower error " + error));
    } else {
      toast.warn("Vui lòng đăng nhập");
    }
  }
  return (
    <div className="saller-info-wrapper w-full">
      <div className="saller-info sm:flex justify-between items-center pb-[30px] border-b border-[#E8E8E8]">
        <div className="sm:flex sm:space-x-5 items-center sm:w-1.5/4">
          <div className="saller w-[73px] h-[73px] rounded-full overflow-hidden">
            <img
              src={seller?.avatar}
              alt="saller"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h6 className="text-[18px] font-medium leading-[30px]">
              {seller?.shopName}
            </h6>
            <p className="text-[13px] font-normal text-qgray leading-[30px]">
              {Intl.DateTimeFormat('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }).format(new Date(seller?.createAtSeller))}
            </p>
            <div className="flex items-center mt-0">
              <div className="flex">
                {Array.from({ length: Math.round(seller?.totalStar) }, (_, index) => (
                  <Star key={index} w="15" h="15" />
                ))}
              </div>
              {
                seller?.totalStar > 0 ? (<span className="text-[13px] font-normal ml-1">({seller?.totalStar})</span>)
                  :
                  (<span className="text-[13px] font-normal">Chưa có đánh giá</span>)
              }
              {isFollower == true ? (<button onClick={() => handleFollower()} class="w-40 flex ml-5 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 active:bg-blue-700">
                <UserMinusIcon className="w-5 h-5  mr-2" />
                Đang theo dõi {isFollower}
              </button>) : (<button onClick={() => handleFollower()} class="w-35 flex ml-5 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 active:bg-blue-700">
                <UserPlusIcon className="w-5 h-5 mr-2" />
                Theo dõi
              </button>)}


            </div>

          </div>
        </div>
        <div className="flex-1 w-full sm:flex sm:space-x-5 justify-between sm:ml-[60px] mt-5 sm:mt-0">
          <div className="w-full mb-5 sm:mb-0">
            <ul>
              {/* <li className="text-qgray leading-[30px]">
                <span className="text-[15px] font-normal text-qblack">
                  Sản phẩm
                </span>
                : {seller?.products?.length}
              </li> */}
              {/* <li className="text-qgray leading-[30px]">
                <span className="text-[15px] font-normal text-qblack">
                  Đánh giá
                </span>
                : Mobile Phone, Sports, Gaming, Electronics,...
              </li> */}
              {/* <li className="text-qgray leading-[30px]">
                <span className="text-[15px] font-normal text-qblack">
                  Tags
                </span>
                : Beer, Foamer
              </li> */}
            </ul>
          </div>
          {/* <div className="w-full ">
            <ul>
              <li className="text-qgray leading-[30px] flex">
                <span className="text-[15px] font-normal text-qblack">
                  Đang theo dõi
                </span>
                : 1,2k

              </li>
              <li className="text-qgray leading-[30px] flex">
                <span className="text-[15px] font-normal text-qblack">
                  Người theo dõi
                </span>
                : 2,6k

              </li>
              <li className="text-qgray leading-[30px]">
                <span className="text-[15px] font-normal text-qblack">
                  Tham gia
                </span>
                : 2 năm trước
              </li>
            </ul>
          </div> */}
        </div>
      </div>
      <div className="saller-product w-full mt-[30px]">
        <h1 className="text-[18px] font-medium mb-5">Sản phẩm từ shop</h1>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
          <DataIteration
            datas={datas}
            startLength={0}
            endLength={datas?.length}
          >
            {({ datas }) => (
              <div key={datas.id} className="item">
                <LazyLoad
                  // once={true}
                  key={datas?.id}
                  height={100}
                  offset={[-100, 100]}
                  placeholder={<div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                    <div class="animate-pulse flex space-x-4">
                      <div class="flex-1 space-y-3 py-1">
                        <div class="rounded-none bg-slate-700 h-[265px] w-full"></div>
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
                  <div>
                    <ProductCardStyleOne datas={datas} />
                  </div>
                </LazyLoad>
              </div>
            )}
          </DataIteration>
        </div>
      </div>
    </div >
  );
}
