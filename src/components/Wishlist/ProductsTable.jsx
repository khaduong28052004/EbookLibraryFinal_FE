import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputQuantityCom from "../Helpers/InputQuantityCom";
import { lazyload } from "react-lazyload";
export default function ProductsTable({ className, datas, handleDelete }) {
  const [quantity, setQuantity] = useState();
  const [favorites, setFavorites] = useState();
  const navigate = useNavigate();


  useEffect(() => {
    setFavorites(datas?.map(favorite => ({
      ...favorite, quantity: 1  // Thêm thuộc tính 'quantity' vào mỗi đối tượng
    })));
  }, [datas]);

  const updateQuantity = (idFavorite, quantity) => {
    setFavorites(favorites =>
      favorites.map(favorite =>
        favorite.id === idFavorite
          ? { ...favorite, quantity }  // Cập nhật quantity nếu id trùng khớp
          : favorite  // Giữ nguyên phần tử không thay đổi
      )
    );
  }




  return (
    <div className={`w-full ${className || ""}`}>
      <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
              <td className="py-4 pl-10 block whitespace-nowrap  w-[380px]">
                Sản phẩm
              </td>
              <td className="py-4 whitespace-nowrap text-center">Thể loại</td>
              <td className="py-4 whitespace-nowrap text-center">Giá</td>
              {/* <td className="py-4 whitespace-nowrap  text-center">Số lượng</td>
              <td className="py-4 whitespace-nowrap  text-center">Tổng cộng</td> */}
              <td className="py-4 whitespace-nowrap text-right w-[114px] block"></td>
            </tr>
            {/* table heading end */}
            {favorites?.map(favorite => (
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="pl-10  py-4 ">
                  <div className="flex space-x-6 items-center">
                    <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                      <img
                        src={favorite?.product?.imageProducts[0]?.name}
                        alt="product"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="font-medium text-[15px] text-qblack cursor-pointer hover:text-blue-600" onClick={() => navigate("/productdetail?idProduct=" + favorite?.product?.id)}>
                        {favorite?.product?.name}
                      </p>
                      <div></div>
                    </div>
                  </div>
                  {favorite?.product?.flashSaleDetail ? (
                    <div className='text-red-500 uppercase text-[12px] font-semibold'>
                      <span className="ml-7">FlashSale kết thúc sau </span>
                      <span>{new Intl.DateTimeFormat("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false, // Dùng định dạng 24 giờ
                      }).format(new Date(favorite?.product?.flashSaleDetail?.flashSale?.dateEnd))
                      } hôm nay</span>
                    </div>
                  ) : (<></>)}
                </td>
                <td className="text-center py-4 px-2">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">{favorite?.product?.category?.name}</span>
                  </div>
                </td>
                <td className="text-center py-4 px-2">
                  <div className="flex space-x-1 items-center justify-center">
                    {favorite?.product?.flashSaleDetail ?
                      (<>
                        <span className="text-[15px] font-light line-through">{Intl.NumberFormat().format(favorite?.product?.price - ((favorite?.product?.price * favorite?.product?.sale) / 100))}<sup>đ</sup></span>
                        <span className="text-[15px] font-bold text-red-500">{Intl.NumberFormat().format(
                          favorite?.product?.price - ((favorite?.product?.price * favorite?.product?.sale) / 100) - ((favorite?.product?.price - ((favorite?.product?.price * favorite?.product?.sale) / 100)) * (favorite?.product?.flashSaleDetail?.sale / 100))

                        )}<sup>đ</sup></span>
                      </>) :
                      (<>
                        <span className="text-[15px] font-light line-through">{Intl.NumberFormat().format(favorite?.product?.price)}<sup>đ</sup></span>
                        <span className="text-[15px] font-bold">{Intl.NumberFormat().format(favorite?.product?.price - ((favorite?.product?.price * favorite?.product?.sale) / 100))}<sup>đ</sup></span>
                      </>)}
                  </div>
                </td>
                {/* <td className=" py-4">
                  <div className="flex justify-center items-center">
                    {
                      favorite?.product.flashSaleDetail?.id > 0 ? (<InputQuantityCom quantityCart={favorite?.quantity} handleQuantity={updateQuantity} idFavorite={favorite?.id} maxQuantity={favorite?.product?.flashSaleDetail?.quantity} />)
                        :
                        (<InputQuantityCom quantityCart={favorite?.quantity} handleQuantity={updateQuantity} idFavorite={favorite?.id} maxQuantity={favorite?.product?.quantity} />)

                    }
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">{
                      favorite?.product?.flashSaleDetail?.id > 0 ?
                        Intl.NumberFormat().format(((favorite?.product?.price * ((100 - favorite?.product?.sale)) / 100) * favorite?.product?.flashSaleDetail?.sale) * favorite?.quantity)
                        :
                        Intl.NumberFormat().format((favorite?.product?.price * ((100 - favorite?.product?.sale)) / 100) * favorite?.quantity)

                    }<sup>đ</sup></span>
                  </div>
                </td> */}
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    <span>
                      <svg className="cursor-pointer"
                        onClick={() => { handleDelete(favorite?.id) }}
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                          fill="#AAAAAA"
                        />
                      </svg>
                    </span>
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}

<div class="border border-gray-300 shadow p-4  mx-auto">
  <div class="animate-pulse flex space-x-4">
    <div class=" bg-slate-700 h-20 w-20"></div>
    <div class="flex-1 space-y-2 py-3">
      <div class="h-4 w-50 bg-slate-700 rounded-full"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-12">
          <div class="h-3 w-50 bg-slate-700 rounded-full col-span-3"></div>
          <div class="h-3 w-35 bg-slate-700 rounded-full col-span-2"></div>
          <div class="h-3 w-35 bg-slate-700 rounded-full col-span-2"></div>
          <div class="h-3 w-35 bg-slate-700 rounded-full col-span-2"></div>
          <div class="h-3 w-45 bg-slate-700 rounded-full col-span-2"></div>
        </div>
        <div class="h-3 w-50 bg-slate-700 rounded-full"></div>
      </div>
    </div>
  </div>
</div>