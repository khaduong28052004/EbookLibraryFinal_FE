import { GiftIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import InputQuantityCom from "../Helpers/InputQuantityCom";
import { useRequest } from '../Request/RequestProvicer';
import VoucherDialog from '../voucher/VoucherDialog';
const sellers = {
  id: 1, // Seller ID
  // name: "Seller A",
  vouchersellers: [
    {
      id: 101, // Voucher ID
      name: "Voucher A",
      sale: 5000, // Discount amount in VND
      quantity: 50, // Number of vouchers already used
      originalNumber: 100, // Total number of vouchers
      dateEnd: "2024-12-31T23:59:59", // Expiration date
    },
    {
      id: 102,
      name: "Voucher B",
      sale: 2000,
      quantity: 10,
      originalNumber: 50,
      dateEnd: "2024-11-20T23:59:59",
    },
  ],
};


export default function ProductsTable({ datas, handleSaveProduct, removeCart, handleQuantityCartIndex }) {

  const [idProduct, setIdProduct] = useState();

  const [productState, setProductState] = useState(false);

  const [openVoucher, setOpenVoucher] = useState(false);

  const [sellerId, setSellerId] = useState();

  const [totalOrderSeller, setTotalOrderSeller] = useState();

  const [saveProductOfSeller, setSaveProductOfSeller] = useState();

  const { startRequest, endRequest } = useRequest();



  const [selectedVoucher, setSelectedVoucher] = useState([
    // {
    //   "id": 2,
    //   "avatar": "https://img.freepik.com/premium-photo/sales-manager-digital-avatar-generative-ai_934475-9274.jpg",
    //   "fullname": "Douglas Adams",
    //   "gender": true,
    //   "background": "https://genk.mediacdn.vn/thumb_w/640/2015/wq2jwtv-imgur-1435763799326.jpg",
    //   "shopName": "Douglas Adams Store",
    //   "status": true,
    //   "createAt": "2024-11-07T06:10:08.000+00:00",// Seller ID
    //   vouchers:
    //   {
    //     "id": 1,
    //     "name": "Voucher cho Tài khoản 2 - 1",
    //     "note": "Giảm giá cho đơn hàng 1",
    //     "totalPriceOrder": 100.0,
    //     "sale": 10.0,
    //     "quantity": 1,
    //     "dateStart": "2024-11-12",
    //     "dateEnd": "2024-12-31",
    //     "typeVoucher": null,
    //   }

    // },
    // {
    //   "id": 3,
    //   "avatar": "https://img.freepik.com/premium-photo/sales-manager-digital-avatar-generative-ai_934475-9274.jpg",
    //   "fullname": "Douglas Adams",
    //   "gender": true,
    //   "background": "https://genk.mediacdn.vn/thumb_w/640/2015/wq2jwtv-imgur-1435763799326.jpg",
    //   "shopName": "Douglas Adams Store",
    //   "status": true,
    //   "createAt": "2024-11-07T06:10:08.000+00:00",// Seller ID
    //   vouchers:
    //   {
    //     "id": 7,
    //     "name": "Voucher cho Tài khoản 2 - 1",
    //     "note": "Giảm giá cho đơn hàng 1",
    //     "totalPriceOrder": 100.0,
    //     "sale": 10.0,
    //     "quantity": 1,
    //     "dateStart": "2024-11-12",
    //     "dateEnd": "2024-12-31",
    //     "typeVoucher": null,
    //   }

    // }
  ]);




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


      // const filteredSellers = datas.map(seller => {
      //   let saleMax = 0;
      //   let voucherNew = {};  
      //   seller.vouchers.forEach(voucher => {
      //     if (voucher.sale > saleMax && voucher.totalPriceOrder < totalOrderSeller) {
      //       saleMax = voucher.sale;  
      //       voucherNew = voucher;  
      //     }
      //   });
      //   return {
      //     ...seller,
      //     vouchers: voucherNew  
      //   };
      // });
      // setSelectedVoucher(filteredSellers);
    }
  }, [datas, totalOrderSeller]);  // Đảm bảo useEffect này sẽ chạy khi datas hoặc totalOrderSeller thay đổi

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
        const voucher = selectedVoucher.find(item => item.id == seller.id);
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
        const voucher = selectedVoucher.find(item => item.id == seller.id);
        // Trả về một seller mới với giỏ hàng đã lọc
        if (filteredCart.length > 0) {
          return {
            ...seller,
            cart: filteredCart,
            voucher: voucher?.vouchers
          };
        } else {
          return null;
        }
      })
      .filter(seller => seller !== null);
    handleSaveProduct(filteredSellers);
    setSaveProductOfSeller(filteredSellers);
    var total = 0;
    filteredSellers.forEach(sellerItem => {
      sellerItem?.cart.forEach(cart => {
        total += cart.quantity * (cart.product.price - ((cart.product.price * cart.product.sale) / 100));
      });
    });
    setTotalOrderSeller(total);
  };

  useEffect(() => {
    if (datas) {
      saveIdProduct();
    }
  }, [selectedVoucher, idProduct, datas]);
  const autoActiveVoucher = () => {
    var total = 0;
    filteredSellers()?.forEach(sellerItem => {
      sellerItem?.cart.forEach(cart => {
        total += cart.quantity * (cart.product.price - ((cart.product.price * cart.product.sale) / 100));
      });
    });
    // alert("voucher " + total);
    // if (!selectedVoucher) {
    const filteredSeller2 = datas.map(seller => {
      let saleMax = 0;
      let voucherNew = {};
      seller.vouchers.forEach(voucher => {
        if (voucher.sale > saleMax && voucher.totalPriceOrder < total) {
          saleMax = voucher.sale;
          if (voucher?.minOrder < total) {
            voucherNew = voucher;
          }
        }
      });
      return {
        ...seller,
        vouchers: voucherNew
      };
    });
    setSelectedVoucher(filteredSeller2);
    // }
  }
  const handleSelectVoucher = (voucher) => {
    const filterSellerVoucher = selectedVoucher.map(seller => {
      if (seller.id == voucher.id) {
        return {
          ...seller,
          vouchers: voucher.vouchers
        }
      }
      return seller;
    })
    setSelectedVoucher(filterSellerVoucher);
  };

  const handleVoucher = (seller) => {

    if (saveProductOfSeller?.length > 0) {
      var total = 0;
      saveProductOfSeller.forEach(sellerItem => {
        if (sellerItem.id == seller.id) {
          sellerItem?.cart.forEach(cart => {
            total += cart.quantity * (cart.product.price - ((cart.product.price * cart.product.sale) / 100));

          });
        }
      });
      setTotalOrderSeller(total);
      setOpenVoucher(true);
      setSellerId(seller.id);
    } else {
      toast.warn("Vui lòng chọn sản phẩm của shop");
    }
  }

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
    autoActiveVoucher();
  }

  const handleShop = (event, id_Shop) => {
    const inputCheckBox = document.querySelectorAll(`.checkBoxProduct[data-id-shop="${id_Shop}"]`);
    inputCheckBox.forEach((checkbox) => {
      checkbox.checked = event.target.checked;
      idProduct[checkbox.value] = event.target.checked;
    });
    checkedAll();
    autoActiveVoucher();
  };

  const oneInputCheckBox = (event, id_Shop) => {
    idProduct[event.target.value] = event.target.checked;
    setIdProduct(prevState => ({
      ...prevState, // Giữ lại các giá trị cũ
      [event.target.value]: event.target.checked
    }));

    checkShop(id_Shop);
    checkedAll();
    // saveIdProduct();
    autoActiveVoucher();
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
                          <p className="font-medium text-[15px] text-qblack">
                            {cart.product.name}
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
                        }).format(new Date(cart.product.flashSaleDetail.flashSale.dateEnd))
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
                      <InputQuantityCom quantityCart={cart?.quantity} idCart={cart?.id} handleQuantity={() => { console.log("") }} handleQuantityCart={handleQuantityCart} />
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


              ))}
              <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] uppercase border-b default-border-bottom">
                <td colSpan={6} className="py-2 pl-5 w-full ">
                  <div className="flex">
                    <GiftIcon className="h-6 w-6 text-blue-500" />
                    <button onClick={() => { handleVoucher(seller) }} className="text-base hover:text-blue-600 cursor-pointer">Voucher</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      ))}
      <VoucherDialog
        open={openVoucher}
        onClose={() => setOpenVoucher(false)}
        sellers={datas}
        onSelectVoucher={handleSelectVoucher}
        selected={selectedVoucher}
        sellerId={sellerId} // Example product ID
        totalOrderSeller={totalOrderSeller}
      />
    </div>
  );
}



