import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Star from "../Helpers/icons/Star";
export default function SallerInfo({ seller, datas }) {
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
              {seller.shopName}
            </h6>
            <p className="text-[13px] font-normal text-qgray leading-[30px]">
              {seller.fullname}
            </p>
            <div className="flex items-center mt-4">
              <div className="flex">
                {Array.from({ length: Math.round(seller?.totalStar) }, (_, index) => (
                  <Star key={index} w="15" h="15" />
                ))}
              </div>
              <span className="text-[13px] font-normal ml-1">({seller?.totalStar})</span>
              {/* <button class="w-35 flex ml-5 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 active:bg-blue-700">
                <UserPlusIcon className="w-5 h-5 mr-2" />
                Theo dõi
              </button> */}


            </div>

          </div>
        </div>
        <div className="flex-1 w-full sm:flex sm:space-x-5 justify-between sm:ml-[60px] mt-5 sm:mt-0">
          <div className="w-full mb-5 sm:mb-0">
            <ul>
              <li className="text-qgray leading-[30px]">
                <span className="text-[15px] font-normal text-qblack">
                  Sản phẩm
                </span>
                : {seller?.products?.length}
              </li>
              <li className="text-qgray leading-[30px]">
                <span className="text-[15px] font-normal text-qblack">
                  Đánh giá
                </span>
                : Mobile Phone, Sports, Gaming, Electronics,...
              </li>
              {/* <li className="text-qgray leading-[30px]">
                <span className="text-[15px] font-normal text-qblack">
                  Tags
                </span>
                : Beer, Foamer
              </li> */}
            </ul>
          </div>
          <div className="w-full ">
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
          </div>
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
                <ProductCardStyleOne datas={datas} />
              </div>
            )}
          </DataIteration>
        </div>
      </div>
    </div>
  );
}
