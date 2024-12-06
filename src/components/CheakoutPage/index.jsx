import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from "../Partials/Layout";
import { useRequest } from "../Request/RequestProvicer";
import Service_Fee, { service } from "../service/Service_Fee";
import VoucherDialog from '../voucher/VoucherDialog';

export default function CheakoutPage() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState();
  const localtion = useLocation();
  const { getItem } = useRequest();
  const navigate = useNavigate();
  const [service_fee, setService_fee] = useState(0);
  const [voucherAdmins, setVoucherAdmins] = useState();
  const { setItem, startRequest, endRequest } = useRequest();
  const [selectedVoucher, setSelectedVoucher] = useState([]);
  const [addresses, setAddresses] = useState();
  const [addressActive, setAddressActive] = useState();
  const [isOpenAddress, setIsOpenAddress] = useState(false);
  const [sellerId, setSellerId] = useState();
  const [totalOrderSeller, setTotalOrderSeller] = useState();
  const [isOpenVoucher, setIsOpenVoucher] = useState(false);
  const [selected, setSelected] = useState();
  const [vouchers, setVouchers] = useState();
  const [total, setTotal] = useState(0);
  const [totalServiceFee, setTotalServiceFee] = useState(0);
  const [totalSale, setTotalSale] = useState(0);
  const [totalSaleAdmin, setTotalSaleAdmin] = useState(0);
  const [adminSelected, setAdminSelected] = useState();
  const [feeSeller, setFeeSeller] = useState({});
  const [isPaymentMethod, setIsPaymentMethod] = useState("COD");
  const getServiceFee = async (serviceId, idSeller, weight, addressFrom, addressTo) => {
    try {
      const { service_fee } = await Service_Fee(serviceId, weight, 0, addressFrom, addressTo);
      setFeeSeller(seller => ({
        ...seller,
        [idSeller]: service_fee
      }))
    } catch (error) {
      console.error("Error in fetching service fee:", error);
    }
  };

  const setService = async (idSeller, weight, fromAddress, toAddress) => {
    try {
      const { service_id } = await service(fromAddress, toAddress);
      getServiceFee(service_id, idSeller, weight, fromAddress, toAddress);
      // console.log()
    } catch (error) {
      console.error("Error in fetching serviceId:", error);
    }
  }
  useEffect(() => {
    if (data?.datas?.length > 0) {
      const update = {
        ...data,
        datas:
          data?.datas?.map((item) => ({
            ...item,
            service_fee: feeSeller[item?.id] || 0
          }))
      };
      setData(updateSeller(update));
    }
  }, [feeSeller]);

  useEffect(() => {

    data?.datas?.forEach((seller) => {
      var weight = 0;
      seller?.cart.forEach(cart => {
        weight += cart?.quantity * cart?.product?.weight;
      });
      setService(seller?.id, weight, seller?.addresses?.find(address => address?.status == true), addressActive);
    })
  }, [addressActive])




  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/user/pay/voucheradmin").then(response => {
      setVoucherAdmins(response.data.result.datas);
    }).catch(error => console.log("fetch voucher admin error " + error));
  }, [localtion]);
  const autoActiveVoucher = (data) => {
    var total = 0;
    const filteredSeller2 = data.datas.map(seller => {
      let saleMax = 0;
      let voucherNew = {};
      data?.datas?.forEach(sellerItem => {
        sellerItem?.cart.forEach(cart => {
          if (sellerItem?.id == seller?.id) {
            total += cart.quantity * (cart.product.price - ((cart.product.price * cart.product.sale) / 100));
          }
        });
      });
      seller?.vouchers?.forEach(voucher => {
        if (voucher.sale > saleMax) {
          saleMax = voucher.sale;
          if (voucher?.minOrder < total) {
            voucherNew = voucher;
          }
        }
      });
      return {
        ...seller,
        voucher: voucherNew
      };
    });
    setSelectedVoucher(filteredSeller2);

    let saleMaxAdmin = 0;
    let voucherNewAdmin = {};
    voucherAdmins?.forEach(voucher => {
      if (voucher.sale > saleMaxAdmin) {
        saleMaxAdmin = voucher.sale;
        if (voucher?.minOrder < total) {
          voucherNewAdmin = voucher;
        }
      }
    });
    setAdminSelected(voucherNewAdmin);
  }
  const updateSeller = (data) => {
    setTotal(0);
    setTotalServiceFee(0);
    setTotalSale(0);
    setTotalSaleAdmin(0);
    return {
      ...data,
      datas: data?.datas?.map(seller => {
        var totalPrice = 0;
        var voucherAdmin = null;
        var saleAdmin = 0;
        var totalSale = 0;
        var saleSeller = 0;
        seller?.cart.forEach(cartItem => {
          if (cartItem?.product?.flashSaleDetail?.id > 0) {
            var priceSaleSeller = ((cartItem?.product?.price * cartItem?.product?.sale) / 100);
            var priceProduct = cartItem?.product?.price;
            var priceFinishSale = (priceProduct - priceSaleSeller);
            totalPrice += (priceFinishSale - ((priceFinishSale * cartItem?.product?.flashSaleDetail?.sale) / 100)) * cartItem.quantity;
          }
          else {
            totalPrice += (cartItem?.product?.price - ((cartItem?.product?.price * cartItem?.product?.sale) / 100)) * cartItem.quantity;
          }
        });
        if (selectedVoucher?.length > 0) {
          var voucher = selectedVoucher.find(voucherSeller => voucherSeller?.id == seller?.id);
          if (voucher?.voucher?.id > 0) {
            if ((saleSeller = voucher?.voucher?.sale / 100) * totalPrice > voucher?.voucher?.totalPriceOrder) {
              saleSeller = voucher?.voucher?.totalPriceOrder;
            } else {
              saleSeller = (voucher?.voucher?.sale / 100) * totalPrice;
            }
          }
        }

        setService_fee(service => service + seller?.service_fee);
        try {
          if (totalPrice > adminSelected?.minOrder) {
            voucherAdmin = adminSelected
          }
        } catch (error) {

        }
        if (voucherAdmin?.id > 0) {
          //  alert("voucheradmin "+voucherAdmin?.sale)
          if (((seller?.service_fee * voucherAdmin?.sale) / 100) > voucherAdmin?.totalPriceOrder && voucherAdmin?.sale != 100) {
            // setService_fee(fee => fee - (voucher?.totalPriceOrder));
            // alert("sale admin" + saleAdmin);
            saleAdmin = (voucherAdmin?.totalPriceOrder);
            totalSale += (voucherAdmin?.totalPriceOrder);
          } else {
            // setService_fee(fee => fee - (seller?.service_fee * voucher?.sale));
            saleAdmin = seller?.service_fee * voucherAdmin?.sale / 100;
            totalSale += ((seller?.service_fee * voucherAdmin?.sale) / 100);
          }
          // if (saleAdmin > seller?.service_fee) {
          //   // setService_fee(service => service - 0);
          //   SetSaleServiceFee(seller?.service_fee);
          // } else {
          //   // setService_fee(service => service - saleAdmin);
          //   SetSaleServiceFee(saleAdmin);
          // }
        }
        setTotal(total => total + totalPrice);
        setTotalServiceFee(total => seller?.service_fee + total);
        setTotalSale(total => saleSeller + saleAdmin + total);
        setTotalSaleAdmin(total => total + saleAdmin);
        return {
          ...seller,
          voucherAdmin: voucherAdmin,
          total: totalPrice + seller?.service_fee - saleAdmin - saleSeller,
          totalPrice: totalPrice,
          // total: totalPrice + seller?.service_fee - saleAdmin,
          saleSeller: saleSeller,
          saleAdmin: saleAdmin,
          sale: saleSeller + saleAdmin
        };
      })
    }
  }
  useEffect(() => {
    setService_fee(0);
    const session = sessionStorage.getItem("token");
    if (session) {
      var data = getItem("data");
      autoActiveVoucher(data);
      setAddresses(data?.user?.addresses);
      // alert("username " + data?.user?.username);
      setUser(data);
      // console.log("setUser" + data?.user?.addresses.length);
      setAddressActive(data?.user?.addresses?.find(addr => addr?.status == true));

      setData(updateSeller(data));
    } else {
      navigate('/login');
      window.location.reload();
    }
  }, [voucherAdmins, localtion]);

  const handleAddress = () => {
    var inputs = document.getElementsByName('address');
    inputs.forEach(input => {
      if (input.checked) {
        setAddressActive(addresses.find(address => address.id == input.value));
        setData(updateSeller(data));
      }
    });
  }

  const handleVoucher = (idSeller) => {
    if (idSeller != 0) {
      setSellerId(idSeller);
      var seller = data?.datas?.find(shop => shop.id == idSeller);
      var totalOrder = 0;
      seller?.cart?.forEach(cartItem => {
        totalOrder += (cartItem?.product?.price - ((cartItem?.product?.price * cartItem?.product?.sale) / 100)) * cartItem.quantity;
      });
      setTotalOrderSeller(totalOrder);
      setVouchers(seller?.vouchers);

      setSelected(selectedVoucher?.find(seller => seller?.id == idSeller)?.voucher);
      setIsOpenVoucher(true);
    } else {
      var totalOrder = 0;
      data?.datas?.forEach(seller => {
        var totalSellerPrice = 0;
        seller?.cart?.forEach(cartItem => {
          totalSellerPrice += (cartItem?.product?.price - ((cartItem?.product?.price * cartItem?.product?.sale) / 100)) * cartItem.quantity;
        });
        if (totalSellerPrice > totalOrder) {
          totalOrder = totalSellerPrice;
        }
      });
      setTotalOrderSeller(totalOrder);
      setSellerId(idSeller);
      setVouchers(voucherAdmins);
      setSelected(adminSelected);
      setIsOpenVoucher(true);

    }
  }
  useEffect(() => {
    if (data?.datas?.length > 0) {
      setData(updateSeller(data));
    }
  }
    , [selectedVoucher, adminSelected, addressActive]);
  useEffect(() => {
    if (data?.datas?.length > 0) {
      autoActiveVoucher(data);
      setData(updateSeller(data));
    }
  }, [addressActive])
  const handleSelectVoucher = (voucher) => {

    if (voucher?.sellerId > 0) {
      const filterSellerVoucher = selectedVoucher?.map(seller => {
        if (seller.id === voucher.sellerId) {
          // Nếu seller đã tồn tại, cập nhật voucher
          return {
            ...seller,
            voucher: voucher.voucher,
          };
        }
        return seller;
      });
      // Kiểm tra xem seller có tồn tại trong danh sách không
      const sellerExists = selectedVoucher?.some(seller => seller.id === voucher.sellerId);
      if (!sellerExists) {
        // Tìm seller mới trong danh sách data
        const sellerNew = data?.datas?.find(sellerItem => sellerItem?.id === voucher.sellerId);
        sessionStorage.setItem('SELLER', JSON.stringify(sellerNew))
        if (sellerNew) {
          // Thêm voucher vào seller mới
          const newSellerWithVoucher = {
            ...sellerNew,
            voucher: voucher.voucher,
          };

          // Thêm seller mới vào danh sách
          filterSellerVoucher.push(newSellerWithVoucher);
        }
      }

      // Cập nhật lại danh sách
      setSelectedVoucher(filterSellerVoucher);
      const update = {
        ...data,
        datas: data?.datas.map(seller => {
          if (seller?.id == voucher.sellerId) {
            return {
              ...seller,
              voucher: voucher.voucher
            }
          }
          return seller;
        })
      }
      setSelectedVoucher(filterSellerVoucher);
      setData(updateSeller(update));
    } else {
      setAdminSelected(voucher?.voucher);
    }
  };





  const vnp_TmnCode = "Z3USXN5J";
  const vnp_HashSecret = "0KEFC6UYKU33SAJH2KOJFU63DHSSHVJR";
  const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  var vnp_ReturnUrl = "http://localhost:5173/checkout/success";

  const createPaymentUrl = async () => {
    const params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: generateTransactionRef(),
      vnp_OrderInfo: "Payment for order 123456789",
      vnp_OrderType: "other",
      vnp_Amount: (total + totalServiceFee - totalSale) * 100,
      vnp_ReturnUrl,
      vnp_IpAddr: "127.0.0.1",
      vnp_CreateDate: new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14)
    };

    const sortedParams = sortObject(params);

    const querystring = new URLSearchParams(sortedParams).toString();
    const secureHash = CryptoJS.HmacSHA512(querystring, vnp_HashSecret).toString(CryptoJS.enc.Hex).toUpperCase();

    const paymentUrl = `${vnp_Url}?${querystring}&vnp_SecureHashType=HmacSHA512&vnp_SecureHash=${secureHash}`;

    window.location.href = paymentUrl;
  };

  const generateTransactionRef = () => {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${year}${month}${day}${hour}${minute}${second}${randomStr}`;
  };

  const sortObject = (obj) => {
    const sorted = {};
    Object.keys(obj).sort().forEach(key => {
      sorted[key] = obj[key];
    });
    return sorted;
  };
  // =========================================END===========================================================================


  const createPaymentLink = async () => {
    const idUser = sessionStorage.getItem("id_account");
    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/create-payment-link?id_user=' + idUser + "&id_address=" + addressActive?.id, data);

      // Nhận URL thanh toán từ backend
      const checkoutUrl = response.data.checkoutUrl;

      // Chuyển hướng người dùng đến trang thanh toán
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error creating payment link:', error);
    }
  };



  const pay = () => {
    const idUser = sessionStorage.getItem("id_account");
    const token = sessionStorage.getItem("token");

    if (isPaymentMethod == "VNPAY") {
      setItem("data", data);
      setItem("id_address", addressActive?.id);
      createPaymentUrl();
    } else if (isPaymentMethod == "PAYOS") {
      createPaymentLink();
    } else {
      startRequest();
      axios.post("http://localhost:8080/api/v1/user/pay/" + idUser + "?paymentMethod_id=1&id_address=" + addressActive?.id, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(response => {
        endRequest();
        window.location.href = "/profile#order";
        sessionStorage.removeItem("appData");
        setData("");
      }).catch();
    }

  }
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="bg-white mt-3 mb-5 mx-auto max-w-7xl px-6 lg:px-8 gap-4">
        <div className="p-6 pl-0 space-y-4">
          <p className=" font-medium text-[20px] text-blue-600">Địa Chỉ Nhận Hàng</p>
          <div className="flex justify-between">
            <div className='flex '>

              <p className="text-base  mr-5 font-bold">{user?.user?.fullname} (+84) {addressActive?.phone.substring(1, addressActive?.phone?.length)}</p>
              <p className="text-base font-normal">{addressActive?.fullNameAddress}</p>
            </div>
            <button type="button" className="ml-5 font-semibold text-indigo-700" onClick={() => setIsOpenAddress(true)}>Thay Đổi</button>
          </div>
        </div>
      </div>
      <div className="bg-white pt-3 pb-3 mb-2 mx-auto max-w-7xl px-6 lg:px-8 gap-4">
        <div className='flex font-normal text-[20px]'>
          <p>Sản phẩm</p>
          <p className='ml-[650px]'>Đơn giá</p>
          <p className='ml-[100px]'>Số lượng</p>
          <p className='ml-[100px]'>Thành tiền</p>
        </div>
      </div>
      {data?.datas?.map((seller) => (
        <>
          <div className="bg-white pt-5 mb-0 mx-auto max-w-7xl px-6 lg:px-8 gap-4">
            <div className="flow-root" key={data.id}>
              <div className="flex">
                <img src={seller?.avatar} className="w-8 h-8 rounded-full" loading="lazy" />
                <label className="text-lg font-medium text-gray-900 pl-2">{seller?.shopName}</label>
              </div>
              <ul role="list" className="-my-6 px-5 pt-2 divide-y divide-gray-200 mb-5">
                {seller?.cart?.map((cartItem) => (
                  <li className="flex py-6">

                    <div className="h-25 w-18 flex-shrink-0 overflow-hidden border border-gray-200">
                      <img
                        src={cartItem?.product?.imageProducts[0]?.name}
                        alt={""}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>


                    <div className="ml-4 flex items-center">
                      <p className="mt-1 text-sm text-gray-500"></p>
                    </div>
                    <div className="ml-4 flex items-center w-[540px]">
                      <p className="mt-1 text-[15px] w-70  text-gray-500 line-clamp-3">{cartItem?.product?.name}</p>
                      <p className="mt-1 text-[15px] w-55 text-gray-500 line-clamp-3">Thể loại : {cartItem?.product?.category?.name}</p>
                    </div>
                    <div className="ml-4 flex items-center w-39">
                      {cartItem?.product?.flashSaleDetail?.id > 0 ?
                        (<p className="mt-1 text-[15px] w-55 text-red-600 line-clamp-3 text-right">{Intl.NumberFormat().format(cartItem?.product?.price * (1 - (cartItem.product.sale / 100)) * (1 - (cartItem?.product?.flashSaleDetail?.sale / 100)))}<sup>đ</sup></p>)
                        :
                        (<p className="mt-1 text-[15px] w-55 text-gray-500 line-clamp-3 text-right">{Intl.NumberFormat().format(cartItem?.product?.price * (1 - (cartItem.product.sale / 100)))}<sup>đ</sup></p>)}
                    </div>
                    <div className="ml-0 w-45 flex items-center justify-center">
                      <p className="mt-1 text-[15px] w-55 text-gray-500 line-clamp-3 text-right">{cartItem?.quantity}</p>
                    </div>
                    <div className="ml-0 w-60 flex items-center justify-center text-right  pr-10">
                      {cartItem?.product?.flashSaleDetail?.id > 0 ? (<p className="mt-1 text-[15px] w-55 text-gray-500 line-clamp-3">{Intl.NumberFormat().format((cartItem?.product?.price * (1 - (cartItem.product.sale / 100)) * (1 - (cartItem?.product?.flashSaleDetail?.sale / 100))) * cartItem?.quantity)}</p>)
                        :
                        (<p className="mt-1 text-[15px] w-55 text-gray-500 line-clamp-3">{Intl.NumberFormat().format((cartItem?.product?.price * (1 - (cartItem.product.sale / 100))) * cartItem?.quantity)}</p>)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-white p-5 mb-0 mx-auto max-w-7xl px-6 lg:px-8 gap-4 border-t-[1px] border-gray-200">
            <div className='flex flex-col-2 justify-end'>
              <div className='space-y-5 mr-10'>
                <p className='text-left'>Phí vận chuyển</p>
                <p className='text-left'>Voucher của Shop</p>
              </div>
              <div className='space-y-5'>
                <p className='text-right'>{Intl.NumberFormat().format(seller?.service_fee)}<sup>đ</sup></p>
                <div className='flex'>
                  <p className='text-right mr-10'>Giảm giá : <span className='text-red-600'>-{Intl.NumberFormat().format(seller?.saleSeller)}<sup>đ</sup></span></p>
                  <p onClick={() => handleVoucher(seller?.id)} className='text-blue-700 cursor-pointer'>Chọn Voucher</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 mb-5 mx-auto max-w-7xl px-6 lg:px-8 gap-4 border-t-[1px] border-gray-200">
            <div className='flex justify-end items-center'>
              <p className="text-base mr-2">Tổng số tiền ({seller?.cart?.length} sản phẩm):
              </p>
              <p className="text-right text-red-600 text-2xl">{Intl.NumberFormat().format(seller?.totalPrice + seller.service_fee - seller?.saleSeller)}<sup>đ</sup></p>
            </div>
          </div>
        </>
      ))}
      <div className="bg-white p-5 mb-5 mx-auto max-w-7xl px-6 lg:px-8 gap-4 ">
        <div className="mt-4 flex justify-end">
          <p className="text-base mr-20">TOEL Voucher</p>

          <div className='flex'>
            <p className='mr-10'>Giảm giá : <span className='text-red-600'>-{Intl.NumberFormat().format(totalSaleAdmin)}<sup>đ</sup></span></p>
            <p className='text-blue-700 cursor-pointer' onClick={() => handleVoucher(0)}>Chọn Voucher</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 mb-0 mx-auto max-w-7xl px-6 lg:px-8 gap-4 border-b-[1px] border-gray-200">
        <div className="mt-4 ">
          <p className="text-xl font-medium mb-5">Phương Thức Thanh Toán</p>
          <div className="flex space-x-3 mb-4">
            <div onClick={() => setIsPaymentMethod("COD")} className={`border p-1 ${isPaymentMethod == "COD" ? "border-blue-700" : "border-gray-300 p-1"}`}>
              <p className={`text-base font-normal cursor-pointer  ${isPaymentMethod == "COD" ? "text-blue-600" : ""}`} >Thanh Toán Khi Nhận Hàng</p>
            </div>
            <div onClick={() => setIsPaymentMethod("VNPAY")} className={`border p-1 ${isPaymentMethod == "VNPAY" ? "border-blue-700" : "border-gray-300 p-1"}`}>
              <p className={`text-base font-normal cursor-pointer  ${isPaymentMethod == "VNPAY" ? "text-blue-600" : ""}`}>Thanh toán VNPAY</p>
            </div>
            <div onClick={() => setIsPaymentMethod("PAYOS")} className={`border p-1 ${isPaymentMethod == "PAYOS" ? "border-blue-700" : "border-gray-300 p-1"}`}>
              <p className={`text-base font-normal cursor-pointer  ${isPaymentMethod == "PAYOS" ? "text-blue-600" : ""}`}>Thanh toán PAYOS</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 mb-5 mx-auto max-w-7xl px-6 lg:px-8 gap-4 ">
        <div className="mt-4 flex flex-col-2 justify-end space-x-20 text-gray-600 mb-5">
          <div className='space-y-3'>
            <div className="text-left">
              <p>Tổng tiền hàng</p>
            </div>
            <div className="text-left">
              <p>tổng tiền phí vận chuyển</p>
            </div>
            <div className="text-left">
              <p>Tổng giảm giá</p>
            </div>
            <div className="text-left">
              <p>Tổng thanh toán</p>
            </div>

          </div>
          <div className='space-y-3'>
            <div className="text-right">
              <p>{Intl.NumberFormat().format(total)}<sup>đ</sup></p>
            </div>
            <div className="text-right">
              <p className='text-red-600'>-{Intl.NumberFormat().format(totalServiceFee)}<sup>đ</sup></p>
            </div>
            <div className="text-right">
              <p className='text-red-600'>-{Intl.NumberFormat().format(totalSale)}<sup>đ</sup></p>
            </div>
            <div className="text-right">
              <p>{Intl.NumberFormat().format(total + totalServiceFee - totalSale)}<sup>đ</sup></p>
            </div>
          </div>
        </div>

        <hr className="mb-5" />

        <div className='flex justify-end'>
          {/* <button onClick={handlePayment} className="bg-indigo-600 p-2 px-4 text-white font-semibold rounded-xl">Đặt Hàng</button> */}
          <button onClick={() => pay()} className="bg-indigo-600 p-2 px-4 text-white font-semiboldd pl-15 pr-15">Đặt Hàng</button>
        </div>
      </div>
      <Dialog open={isOpenAddress} onClose={setIsOpenAddress} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white ">
                <div className='px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <DialogTitle as="h3" className="text-lg font-semibold leading-6 text-gray-900 mb-5">
                    Địa chỉ của tôi
                  </DialogTitle>
                </div>
                {addresses?.map((address) => (
                  <div className='border-t-2 border-gray-100'>
                    <div className="flex mb-2 p-5" key={address.id}>
                      <div className='flex items-start'>
                        <input
                          type="radio"
                          className='mr-3 w-5 h-5 accent-blue-500'
                          id={`address${address.id}`}
                          name="address"
                          defaultChecked={address.id == addressActive.id}
                          value={address?.id}
                        />
                      </div>
                      <div>
                        <div className='flex items-end'>
                          <div className='mr-3 mt-[4px] text-base'>{user?.user?.fullname}</div>
                          <span className='border-l-2 text-base border-gray-300 pl-3 font-light text-gray-500'>(+84) {address?.phone?.substring(1, address?.phone?.length)}</span>
                        </div>
                        <div className='font-light text-base text-gray-500'>{address.fullNameAddress}</div>
                      </div>
                    </div>
                  </div>

                ))}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

                <button
                  type="button"
                  onClick={() => { setIsOpenAddress(false); handleAddress(); }}
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                >
                  Xác Nhận
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setIsOpenAddress(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Thoát
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {/* voucher admin
      <VoucherDialog
        open={isOpenVoucherAdmin}
        onClose={() => setIsOpenVoucherAdmin(false)}
        datas={voucherAdmins}
        onSelectVoucher={handleVoucherAdmin}
        selected={adminSelected}
        totalOrderSeller={totalOrderSeller}
        sellerId={0}
      /> */}

      <VoucherDialog
        open={isOpenVoucher}
        onClose={() => setIsOpenVoucher(false)}
        datas={vouchers}
        onSelectVoucher={handleSelectVoucher}
        selected={selected}
        totalOrderSeller={totalOrderSeller}
        sellerId={sellerId}
      />


    </Layout>
  );
}
