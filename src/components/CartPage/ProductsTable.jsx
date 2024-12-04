import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { useNavigate } from 'react-router-dom';
import InputQuantityCom from "../Helpers/InputQuantityCom";




export default function ProductsTable({ datas, handleSaveProduct, removeCart, handleQuantityCartIndex }) {
  const navigate = useNavigate();

  const [idProduct, setIdProduct] = useState();
  useEffect(() => {
    if (datas) {
      const updatedProductState = {};
      datas.forEach(seller => {
        seller?.cart.forEach(cart => {
          const productId = cart?.product?.id;
          if (productId) {
            updatedProductState[productId] = false;
          }
        });
      });
      if (!idProduct?.length > 0 && !idProduct) {
        setIdProduct(updatedProductState);
      }
    }
  }, [datas]);  // Đảm bảo useEffect này sẽ chạy khi datas hoặc totalOrderSeller thay đổi

  const filteredSellers = () => {
    const validProductIds = [];
    // Lọc các product id hợp lệ từ idProduct
    for (let key in idProduct) {
      if (idProduct.hasOwnProperty(key) && idProduct[key] === true) {
        validProductIds.push(Number(key));
      }
    }
    // Lọc các sellers có sản phẩm hợp lệ trong giỏ hàng
    return datas
      .map(seller => {
        // Lọc giỏ hàng của seller, chỉ giữ lại sản phẩm có id hợp lệ
        const filteredCart = seller.cart.filter(item => validProductIds.includes(item.product.id));
        // Trả về một seller mới với giỏ hàng đã lọc
        if (filteredCart.length > 0) {
          return {
            ...seller,
            cart: filteredCart,
          };
        } else {
          return null;
        }
      })
      .filter(seller => seller !== null);
  }
  const saveIdProduct = () => {
    const validProductIds = [];
    // Lọc các product id hợp lệ từ idProduct
    for (let key in idProduct) {
      if (idProduct.hasOwnProperty(key) && idProduct[key] === true) {
        validProductIds.push(Number(key));
      }
    }
    // Lọc các sellers có sản phẩm hợp lệ trong giỏ hàng
    const filteredSellers = datas
      .map(seller => {
        // Lọc giỏ hàng của seller, chỉ giữ lại sản phẩm có id hợp lệ
        const filteredCart = seller.cart.filter(item => validProductIds.includes(item.product.id));
        // Trả về một seller mới với giỏ hàng đã lọc
        if (filteredCart.length > 0) {
          return {
            ...seller,
            cart: filteredCart,
          };
        } else {
          return null;
        }
      })
      .filter(seller => seller !== null);
    handleSaveProduct(filteredSellers);
    setSaveProductOfSeller(filteredSellers);

  };






  const checkedAll = () => {
    const inputCheckBoxProducts = document.querySelectorAll('.checkBoxProduct');
    const checkboxAll = document.getElementById("checkbox_all");
    for (let checkbox of inputCheckBoxProducts) {
      if (!checkbox.checked) {
        checkboxAll.checked = false;
        return;
      }
    }
    checkboxAll.checked = true;
  };

  const checkShop = (id_Shop) => {
    const inputCheckBoxShop = document.querySelector(`.checkbox_shop[data-id-shop="${id_Shop}"]`);
    const inputCheckBoxProducts = document.querySelectorAll(`.checkBoxProduct[data-id-shop="${id_Shop}"]`);
    for (let checkbox of inputCheckBoxProducts) {
      if (!checkbox.checked) {
        inputCheckBoxShop.checked = false;
        return;
      }
    }
    inputCheckBoxShop.checked = true;
  }

  const handleCheckBoxAll = (event) => {
    const inputCheckBox = document.querySelectorAll(`input`);
    inputCheckBox.forEach((checkbox) => {
      checkbox.checked = event.target.checked;
    });
    const inputCheckBoxProduct = document.querySelectorAll(`.checkBoxProduct`);
    inputCheckBoxProduct.forEach((checkbox) => {
      idProduct[checkbox.value] = event.target.checked;
    });
    saveIdProduct();
  }

  const handleShop = (event, id_Shop) => {
    const inputCheckBox = document.querySelectorAll(`.checkBoxProduct[data-id-shop="${id_Shop}"]`);
    inputCheckBox.forEach((checkbox) => {
      checkbox.checked = event.target.checked;
      idProduct[checkbox.value] = event.target.checked;
    });
    checkedAll();
    saveIdProduct();
  };

  const oneInputCheckBox = (event, id_Shop) => {
    idProduct[event.target.value] = event.target.checked;
    setIdProduct(prevState => ({
      ...prevState, // Giữ lại các giá trị cũ
      [event.target.value]: event.target.checked
    }));

    checkShop(id_Shop);
    checkedAll();
    saveIdProduct();
  }


  const handleQuantityCart = (quantity, idCart) => {
    handleQuantityCartIndex(quantity, idCart);
  }


  return (
    <div className={`w-full`}>
      {/* <ToastContainer /> */}
      <div className="mb-5 relative w-full overflow-x-auto border border-[#EDEDED]">
        <table className="w-full mb-0 text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className=" text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">

              <td className="py-4 pl-5 block whitespace-nowrap min-w-[380px]">
                <div className="flex items-center ">
                  <input type="checkbox" id="checkbox_all" onChange={(event) => handleCheckBoxAll(event)} class="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2 focus:ring-offset-0 border-gray-300 flex items-center" />
                  <span className="pl-2">Sản phẩm</span>
                </div>

              </td>
              <td className="py-4 whitespace-nowrap text-center w-[250px]">Thể loại</td>
              <td className="py-4 whitespace-nowrap text-center w-[150px]">Đơn giá</td>
              <td className="py-4 whitespace-nowrap  text-center w-[150px]">Số lượng</td>
              <td className="py-4 whitespace-nowrap  text-center  w-[200px]">Thành tiền</td>
              <td className="py-4 whitespace-nowrap text-right w-[114px]"></td>
            </tr>
            {/* table heading end */}
          </tbody>
        </table>
      </div>
      {datas?.map(seller => (
        <LazyLoad
          key={seller?.id}
          height={100}
          offset={[-100, 100]}
          placeholder={
            <>
              <div class="border  shadow  p-4 space-y-4 animate-pulse">
                <div class=" flex space-x-2">
                  <div class="h-5 w-5 bg-slate-700 mt-2"></div>
                  <div class="rounded-full bg-slate-700 h-10 w-10"></div>
                  <div class="flex-1 space-y-6 py-3">
                    <div class="h-4 w-full bg-slate-700 rounded-full"></div>
                  </div>
                </div>
                <div class=" flex space-x-2">
                  <div class="h-5 w-5 bg-slate-700 mt-10"></div>
                  <div class="border shadow p-4  mx-auto">
                    <div class=" flex space-x-4">
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
                </div>
              </div>
            </>
          }
        >
          <div className="mb-5 relative w-full overflow-x-auto border border-[#EDEDED]">
            <table className="w-full mb-0 text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                {/* table heading */}
                <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] uppercase border-b default-border-bottom">
                  <td colSpan={6} className="py-2 pl-5 w-full ">
                    <div className="flex">
                      <div className="flex items-center pr-2">
                        <input type="checkbox" onChange={(event) => { handleShop(event, seller.id) }} data-id-shop={seller.id} className="checkbox_shop form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2 focus:ring-offset-0 border-gray-300 flex items-center" />
                      </div>

                      <img src={seller?.avatar ? seller?.avatar : "https://img.freepik.com/premium-photo/sales-manager-digital-avatar-generative-ai_934475-9274.jpg"} alt="avatar" className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-md" />

                      <span className="whitespace- flex items-center px-2">{seller.shopName}</span>
                    </div>              </td>
                </tr>
                {seller?.cart.map(cart => (
                  <LazyLoad
                    key={cart?.id}
                    height={100}
                    offset={[-100, 100]}
                    placeholder={
                      <>
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
                      </>}
                  >
                    <tr className="bg-white border-b hover:bg-gray-50">
                      <td className="pl-5  py-4  w-[380px]">
                        <div className="flex mb-2">
                          <div className="flex items-center pr-2">
                            <input type="checkbox" data-id-shop={seller.id} onClick={(event) => oneInputCheckBox(event, seller.id)} value={cart?.product?.id} className={`checkBoxProduct form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2 focus:ring-offset-0 border-gray-300 flex items-center`} />
                          </div>
                          <div className="flex space-x-6 items-center">
                            <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                              <img
                                src={cart?.product?.imageProducts[0]?.name}
                                alt="product"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex-1 flex flex-col">
                              <p className="font-medium text-[15px] text-qblack " >
                                <span className='cursor-pointer hover:text-blue-600' onClick={() => navigate("/productdetail?idProduct=" + cart?.product?.id)}> {cart?.product?.name}</span>
                                <span className="font-light text-[13px] block"> Tác giả: {cart.product.writerName}</span>
                                <span className="font-light text-[13px] block"> Nhà xuất bản: {cart.product.publishingCompany}</span>
                              </p>
                            </div>

                          </div>

                        </div>
                        {cart?.product?.flashSaleDetail ? (
                          <div className='text-red-500 uppercase text-[12px] font-semibold'>
                            <span className="ml-7">FlashSale kết thúc sau </span>
                            <span>{new Intl.DateTimeFormat("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: false, // Dùng định dạng 24 giờ
                            }).format(new Date(cart?.product?.flashSaleDetail?.flashSale?.dateEnd))
                            } hôm nay</span>
                          </div>
                        ) : (<></>)}
                      </td>

                      <td className="text-center py-4 px-2  w-[250px]">
                        <div className="flex space-x-1 items-center justify-center">
                          <span className="text-[15px] font-normal">{cart?.product?.category?.name}</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-2  w-[150px]">
                        <div className="flex space-x-1 items-center justify-center">

                          {cart?.product?.flashSaleDetail ?
                            (<>
                              <span className="text-[15px] font-light line-through">{Intl.NumberFormat().format(cart?.product?.price - ((cart?.product?.price * cart?.product?.sale) / 100))}<sup>đ</sup></span>
                              <span className="text-[15px] font-bold text-red-500">{Intl.NumberFormat().format(
                                cart?.product?.price - ((cart?.product?.price * cart?.product?.sale) / 100) - ((cart?.product?.price - ((cart?.product?.price * cart?.product?.sale) / 100)) * (cart?.product?.flashSaleDetail?.sale / 100))

                              )}<sup>đ</sup></span>
                            </>) :
                            (<>
                              <span className="text-[15px] font-light line-through">{Intl.NumberFormat().format(cart?.product?.price)}<sup>đ</sup></span>
                              <span className="text-[15px] font-bold">{Intl.NumberFormat().format(cart?.product?.price - ((cart?.product?.price * cart?.product?.sale) / 100))}<sup>đ</sup></span>
                            </>)}
                        </div>
                      </td>
                      <td className=" py-4  w-[150px]">
                        <div className="flex justify-center items-center">
                          {cart?.product.flashSaleDetail?.id > 0 ? (<InputQuantityCom quantityCart={cart?.quantity} idCart={cart?.id} handleQuantityCart={handleQuantityCart} maxQuantity={cart?.product?.flashSaleDetail?.quantity} />)
                            : (<InputQuantityCom quantityCart={cart?.quantity} idCart={cart?.id} handleQuantityCart={handleQuantityCart} maxQuantity={cart?.product?.quantity} />)}
                        </div>
                      </td>

                      <td className="text-right py-4  w-[200px]">
                        <div className="flex space-x-1 items-center justify-center">
                          {cart?.product?.flashSaleDetail ?
                            (
                              cart?.quantity <= cart?.product?.flashSaleDetail.quantity ?
                                (
                                  <span className="text-[15px] font-bold">{Intl.NumberFormat().format((
                                    cart?.product?.price - ((cart?.product?.price * cart?.product?.sale) / 100) - ((cart?.product?.price - ((cart?.product?.price * cart?.product?.sale) / 100)) * (cart?.product?.flashSaleDetail?.sale / 100))

                                  ) * cart.quantity)}<sup>đ</sup></span>
                                ) :
                                (
                                  <span className="text-[15px] font-bold">{Intl.NumberFormat().format(
                                    ((cart?.product?.price - ((cart?.product?.price * cart?.product?.sale) / 100) - ((cart?.product?.price - ((cart?.product?.price * cart?.product?.sale) / 100)) * (cart?.product?.flashSaleDetail?.sale / 100))) * cart?.product?.flashSaleDetail.quantity)
                                    +
                                    ((cart?.product?.price - ((cart?.product?.price * cart?.product?.sale) / 100) - ((cart?.product?.price - ((cart?.product?.price * cart?.product?.sale) / 100)) * (cart?.product?.flashSaleDetail?.sale / 100))) * (cart?.quantity - cart?.product?.flashSaleDetail.quantity))

                                  )}<sup>đ</sup></span>
                                )
                            ) :
                            (<span className="text-[15px] font-bold">{Intl.NumberFormat().format((cart?.product?.price - ((cart?.product?.price * cart?.product?.sale) / 100)) * cart.quantity)}<sup>đ</sup></span>)}
                        </div>
                      </td>
                      <td className="text-right py-4  w-[114px]">
                        <div className="flex space-x-1 items-center justify-center">
                          <span onClick={() => removeCart(cart?.id)}>
                            <svg className="hover:cursor-pointer"
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
                  </LazyLoad>


                ))}
              </tbody>
            </table>
          </div>

        </LazyLoad>
      ))}
    </div>
  );
}







