import axios from "axios";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { useLocation } from "react-router-dom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Layout from "../Partials/Layout";
export default function FlashSale() {
  const [flashSale, setFlashSale] = useState([]);
  const [flashSaleActive, setFlashSaleActive] = useState(null);
  const [flashSaleDetail, setFlashSaleDetail] = useState();
  const [lastDate, setLastDate] = useState("");
  const [showDate, setDate] = useState(0);
  const [showHour, setHour] = useState(0);
  const [showMinute, setMinute] = useState(0);
  const [showSecound, setDateSecound] = useState(0);

  // count Down
  const provideDate = new Date(lastDate);
  // format date
  const year = provideDate.getFullYear();
  const month = provideDate.getMonth();
  //   console.log(month);
  const date = provideDate.getDate();
  //   console.log(date);
  const hours = provideDate.getHours();
  //   console.log(hours);
  const minutes = provideDate.getMinutes();
  //   console.log(minutes);
  const seconds = provideDate.getSeconds();
  //   console.log(seconds);

  // date calculation logic
  const _seconds = 1000;
  const _minutes = _seconds * 60;
  const _hours = _minutes * 60;
  const _date = _hours * 24;

  // interval function
  const startInterval = () => {
    if (new Date(lastDate).getTime() > 0) {
      const timer = setInterval(() => {
        const now = new Date();
        const distance =
          new Date(year, month, date, hours, minutes, seconds).getTime() -
          now.getTime();
        if (distance > 0) {
          setDate(Math.floor(distance / _date));
          setMinute(Math.floor((distance % _hours) / _minutes));
          setHour(Math.floor((distance % _date) / _hours));
          setDateSecound(Math.floor((distance % _minutes) / _seconds));
        }
        if (distance < 0) {
          clearInterval(timer);
          setMinute(0);
          setHour(0);
          setDateSecound(0);
          // window.location.reload();
          return;
        }
      }, 1000);
    }
  };

  useEffect(() => {
    if (lastDate !== "") {
      startInterval();
    }
  });
  const location = useLocation();
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/user/flashsale/getall")
      .then((response) => {
        setFlashSale(response.data.result);
        response.data.result?.forEach(element => {
          var now = new Date();
          var dateStart = new Date(element?.dateStart);
          if (dateStart.getTime() <= now.getTime()) {
            setFlashSaleActive(element);
            setLastDate(element?.dateEnd)
          }

        });
        if (response.data.result.length <= 0) {
          setFlashSaleActive(null);
          setFlashSaleDetail([]);
          setLastDate(null)
        }
      })
      .catch((error) => console.error("Fetch all flashsale error: " + error));
  }, [location]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/user/flashsale/flashsaledetail/getallby/" + flashSaleActive?.id).then(
      response => {
        setFlashSaleDetail(response.data?.result);
        // alert("length " + response.data?.result.length);
      }
    ).catch(error => console.error("fetch get all flashsaledetail by flashsale error by " + error));
  }, [flashSaleActive])




  // Tính toán đếm ngược mỗi khi lastDate thay đổi
  return (
    <Layout>
      <div className="flashsale-wrapper w-full">
        <div className="container-x mx-auto">
          <div className="w-full">
            <div
              style={{
                background: `url(${"https://firebasestorage.googleapis.com/v0/b/ebookstore-4fbb3.appspot.com/o/Orange%20Modern%20Flash%20Sale%20Twitter%20Header.png?alt=media"}) no-repeat`,
                backgroundSize: "cover",
              }}
              data-aos="fade-right"
              // className="flash-ad w-full h-[400px] flex sm:justify-end justify-center items-center"
              className="flash-ad w-full h-[400px] flex sm:justify-start justify-center "
            >
              <div className="sm:mr-[75px]">
                <div className="countdown-wrapper w-full flex sm:space-x-6 space-x-3 sm:justify-between justify-evenly mt-3 ml-5">
                  {/* <div className="countdown-item">
                    <div className="countdown-number sm:w-[100px] sm:h-[100px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                      <span className="font-700 sm:text-[30px] text-base text-[#EB5757]">
                        {showDate}
                      </span>
                    </div>
                    <p className="sm:text-[18px] text-xs font-500 text-center leading-8 text-white">
                      Days
                    </p>
                  </div> */}
                  <div className="countdown-item">
                    <div className="countdown-number sm:w-[50px] sm:h-[50px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                      <span className="font-700 sm:text-[30px] text-base text-[#2F80ED]">
                        {showHour}
                      </span>
                    </div>
                    <p className="sm:text-[18px] text-xs font-500 text-center leading-8 text-white">
                      Tiếng
                    </p>
                  </div>
                  <div className="countdown-item">
                    <div className="countdown-number sm:w-[50px] sm:h-[50px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                      <span className="font-700 sm:text-[30px] text-base text-[#219653]">
                        {showMinute}
                      </span>
                    </div>
                    <p className="sm:text-[18px] text-xs font-500 text-center leading-8 text-white">
                      Phút
                    </p>
                  </div>
                  <div className="countdown-item">
                    <div className="countdown-number sm:w-[50px] sm:h-[50px] w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                      <span className="font-700 sm:text-[30px] text-base text-[#EF5DA8]">
                        {showSecound}
                      </span>
                    </div>
                    <p className="sm:text-[18px] text-xs font-500 text-center leading-8 text-white">
                      Giây
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mb-10">
              {flashSale?.map(flashSaleItem => (flashSaleItem?.id == flashSaleActive?.id ? (<>
                <div className="flex-1 bg-orange-600 cursor-pointer" onClick={() => setFlashSaleActive(flashSaleItem)}>
                  <div className="flex justify-center items-center text-white font-semibold text-[20px]">{Intl.DateTimeFormat('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                  }).format(new Date(flashSaleItem?.dateStart))}</div>
                  <div className="flex justify-center items-center text-white font-normal text-[15px]">Đang diễn ra</div>
                </div>
              </>) : (<>
                <div className="flex-1 bg-gray-700 cursor-pointer" onClick={() => setFlashSaleActive(flashSaleItem)}>
                  <div className="flex justify-center items-center text-white font-semibold text-[20px]">{Intl.DateTimeFormat('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                  }).format(new Date(flashSaleItem?.dateStart))}</div>
                  <div className="flex justify-center items-center text-white font-normal text-[15px]">Sắp diễn ra</div>
                </div>
              </>)))}
            </div>
            <div className="products grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
              <DataIteration
                datas={flashSaleDetail}
                startLength={0}
                endLength={flashSaleDetail?.length}
              >
                {({ datas }) => (
                  <div data-aos="fade-up" key={datas.id} className="item">
                    <LazyLoad
                      // once={true}
                      key={datas?.product?.id}
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
                        <ProductCardStyleOne datas={datas?.product} />
                      </div>
                    </LazyLoad>
                  </div>
                )}
              </DataIteration>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
