
import React, { useEffect, useState, useRef } from 'react';
import Voucher from '../Home/Banner/voucher';
import BestSeller from '../Home/Banner/bestseller';
import AuthService from '../../service/authService';


const vouchers = [
  {
    "id": 2,
    "name": "Voucher Giảm Giá 20%",
    "note": "Giảm 20% cho đơn hàng trên 300k",
    "totalPriceOrder": 300000,
    "sale": 20,
    "quantity": 30,
    "minOrder": 0,
    "dateStart": "2024-10-15",
    "dateEnd": "2025-11-15",
    "typeVoucher": {
      "id": 2,
      "name": "Voucher combo"
    },
    "account": {},
    "delete": false
  },
  {
    "id": 2,
    "name": "Voucher Giảm Giá 20%",
    "note": "Giảm 20% cho đơn hàng trên 300k",
    "totalPriceOrder": 300000,
    "sale": 20,
    "quantity": 30,
    "minOrder": 0,
    "dateStart": "2024-10-15",
    "dateEnd": "2025-11-15",
    "typeVoucher": {
      "id": 2,
      "name": "Voucher combo"
    },
    "account": {},
    "delete": false
  },
  {
    "id": 2,
    "name": "Voucher Giảm Giá 20%",
    "note": "Giảm 20% cho đơn hàng trên 300k",
    "totalPriceOrder": 300000,
    "sale": 20,
    "quantity": 30,
    "minOrder": 0,
    "dateStart": "2024-10-15",
    "dateEnd": "2025-11-15",
    "typeVoucher": {
      "id": 2,
      "name": "Voucher combo"
    },
    "account": {},
    "delete": false
  },
  {
    "id": 1,
    "name": "Voucher Giảm Giá 10%",
    "note": "Giảm 10% cho đơn hàng trên 200k",
    "totalPriceOrder": 200000,
    "sale": 10,
    "quantity": 50,
    "minOrder": 0,
    "dateStart": "2024-10-01",
    "dateEnd": "2024-11-31",
    "typeVoucher": {
      "id": 1,
      "name": "Voucher miễn phí vận chuyển"
    },
    "account": {},
    "delete": false
  }
]


const defaultProducts = [
  {
    id: 1,
    imageProducts: [
      {name:'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/50059.jpg?v=1&w=350&h=510'}
    ],
    title:"loe",
  },
  {
    id: 2,
    imageProducts: [{name:'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/49612.jpg?v=1&w=350&h=510'}],
    title:"loe",
  },
  {
    id: 3,
    imageProducts: [{name:'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/46738.jpg?v=1&w=350&h=510'}],
    title:"loe",
  },
  {
    id: 4,
    imageProducts: [{name:'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/50179.jpg?v=1&w=350&h=510'}],
    title:"loe",
  },
  {
    id: 5,
    imageProducts:[{name:'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.book/0/0/1/49612.jpg?v=1&w=350&h=510'}],
    title:"loe",
  },
];


export default function Banner({ className }) {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);

  const fetchVoucherShopHome = async () => {
    try {
      setLoading(true);
      const idSeller = 8;
      const response = await homeShopService.fetchVoucherShopHome({ idSeller });

      if (response.data.result) {
        const data = response.data.result.Voucher;
        setVouchers(data);
        setLoading(true);
      } else {
        throw new Error('Không có dữ liệu');
      }
    } catch (error) {
      toast.warn('Lỗi truyền tải dữ liệu');
    } finally {
      setLoading(false);
    }
  }

  const topProducts = async () => {
    try {
      const response = await AuthService.topProducts();
      console.log(response);
      // setProductData(defaultProducts);
      setProductData(response.data.result.listProduct);
    } catch (error) {
      setProductData(defaultProducts);
      console.log(error);
    }
  }

  useEffect(() => {
    topProducts();
    // fetchVoucherShopHome();
  }, [])

  return (
    <>
      <div className={`w-full ${className || ""}`}>
        <div className="container-x mx-auto ">
          <div className="main-wrapper w-full">
            <div className="banner-card xl:flex xl:space-x-[30px] xl:h-[250px]   mb-6 ">
              <div className="bg-white">
                <div data-aos="fade-right" className="xl:w-full w-full xl:h-[100%] h-full rounded-sm">
                  <a href="/single-product">
                    <picture className="xl:h-full h-[600px]">
                      <source
                        media="(min-width:1025px)"
                        srcSet={`https://www.nxbgd.vn/Attachments/images/Sach%20moi/CMLBT_BANNER-WEB-BOOKIZ.png`}
                      />
                      <img
                        src={`https://www.nxbtre.com.vn/Images/News/nxbtre_full_19482018_084815.jpg`}
                        alt=""
                        className="w-full h-full object-cover rounded-sm"
                      />
                    </picture>
                  </a>
                </div>
              </div>
              <div
                data-aos="fade-left"
                className="flex-1 flex justify-around xl:flex-col flex-row xl:space-y-[0px] xl:h-full h-auto bg-gray-100 gap-2"
              >
                <div className="bg-white rounded px-2  bg-opacity-50 backdrop-blur-sm">
                  <div
                    className="w-[20rem] h-full rounded-sm bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: "url('https://via.placeholder.com/500')", // Thay bằng đường dẫn ảnh của bạn
                      backgroundPosition: 'center',
                      backgroundSize: 'cover'
                    }}
                  >
                    {/* Nền mờ */}
                    <div className="inset-0 bg-white bg-opacity-50 backdrop-blur-lg"></div>

                    {productData.length > 0 ? (
                      <BestSeller products={productData} />
                    ) : null}

                    {/* <div className="w-[20rem] h-full">
                  {vouchers.length > 0 ? (
                    <Voucher vouchers={vouchers} />
                  ) : null}
                </div> */}
                  </div>

                </div>
              </div>

            </div>

            <div
              data-aos="fade-up"
              className="best-services w-full bg-white flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] px-10 lg:py-0 py-10  "
            >
              <div className="item">
                <div className="flex space-x-5 items-center">
                  <div>
                    <span>
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1H5.63636V24.1818H35"
                          stroke="#003EA1"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="square"
                        />
                        <path
                          d="M8.72763 35.0002C10.4347 35.0002 11.8185 33.6163 11.8185 31.9093C11.8185 30.2022 10.4347 28.8184 8.72763 28.8184C7.02057 28.8184 5.63672 30.2022 5.63672 31.9093C5.63672 33.6163 7.02057 35.0002 8.72763 35.0002Z"
                          stroke="#003EA1"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="square"
                        />
                        <path
                          d="M31.9073 35.0002C33.6144 35.0002 34.9982 33.6163 34.9982 31.9093C34.9982 30.2022 33.6144 28.8184 31.9073 28.8184C30.2003 28.8184 28.8164 30.2022 28.8164 31.9093C28.8164 33.6163 30.2003 35.0002 31.9073 35.0002Z"
                          stroke="#003EA1"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="square"
                        />
                        <path
                          d="M34.9982 1H11.8164V18H34.9982V1Z"
                          stroke="#003EA1"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="square"
                        />
                        <path
                          d="M11.8164 7.18164H34.9982"
                          stroke="#003EA1"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                      Miễn phí vận chuyển
                    </p>
                    <p className="text-sm text-qgray">
                      Khi đặt hàng trên 500k
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="flex space-x-5 items-center">
                  <div>
                    <span>
                      <svg
                        width="32"
                        height="34"
                        viewBox="0 0 32 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002"
                          stroke="#003EA1"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                        <path
                          d="M30.7 2L29.5 10.85L20.5 9.65"
                          stroke="#003EA1"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                      Trả lại miễn phí
                    </p>
                    <p className="text-sm text-qgray">
                      Trả lại miễn phí trong vòng 30 ngày
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="flex space-x-5 items-center">
                  <div>
                    <span>
                      <svg
                        width="32"
                        height="38"
                        viewBox="0 0 32 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z"
                          stroke="#003EA1"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="square"
                        />
                        <path
                          d="M12.668 18.6663V13.6663C12.668 11.833 14.168 10.333 16.0013 10.333C17.8346 10.333 19.3346 11.833 19.3346 13.6663V18.6663"
                          stroke="#003EA1"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="square"
                        />
                        <path
                          d="M31 22C31 30.3333 24.3333 37 16 37C7.66667 37 1 30.3333 1 22V5.33333L16 2L31 5.33333V22Z"
                          stroke="#003EA1"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                      Thanh toán an toàn
                    </p>
                    <p className="text-sm text-qgray">
                      Thanh toán trực tuyến an toàn 100%
                    </p>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="flex space-x-5 items-center">
                  <div>
                    <span>
                      <svg
                        width="32"
                        height="35"
                        viewBox="0 0 32 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 13H5.5C2.95 13 1 11.05 1 8.5V1H7"
                          stroke="#003EA1"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                        <path
                          d="M25 13H26.5C29.05 13 31 11.05 31 8.5V1H25"
                          stroke="#003EA1"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                        <path
                          d="M16 28V22"
                          stroke="#003EA1"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                        />
                        <path
                          d="M16 22C11.05 22 7 17.95 7 13V1H25V13C25 17.95 20.95 22 16 22Z"
                          stroke="#003EA1"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="square"
                        />
                        <path
                          d="M25 34H7C7 30.7 9.7 28 13 28H19C22.3 28 25 30.7 25 34Z"
                          stroke="#003EA1"
                          strokeWidth="2"
                          strokeMiterlimit="10"
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <p className="text-black text-[15px] font-700 tracking-wide mb-1">
                      Chất lượng tốt nhất
                    </p>
                    <p className="text-sm text-qgray">
                      Sản phẩm chính hãng được đảm bảo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
