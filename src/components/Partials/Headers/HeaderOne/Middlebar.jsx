import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Cart from "../../../Cart";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
import SearchBox from "../../../Helpers/SearchBox";
import { useRequest } from '../../../Request/RequestProvicer';
import { MdOutlineImageSearch } from "react-icons/md";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import SearchService from '../../../../service/user/search';

export default function Middlebar({ className, type }) {
  const navigate = useNavigate();
  const [totalCart, setTotalCart] = useState(0);
  const token = sessionStorage.getItem("token");
  const [listening, setListening] = useState(false);
  const { startRequest, endRequest } = useRequest();
  const { isRequesting } = useRequest();
  const [isOpenModalImage, setIsOpenModelImage] = useState(false);
  const [isOpenEvent, setIsOpenEvent] = useState(false);
  const changeCart = () => {
    if (token) {
      navigate("/cart");
    } else {
      toast.warn("Vui lòng đăng nhập");
    }
  }
  useEffect(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onstart = () => {
      console.log('Bắt đầu quá trình nhận diện giọng nói.');
      setListening(true);
    };

    // recognition.onresult = (event) => {
    //   const transcript = event.results[0][0].transcript;
    //   console.log('Đã phát hiện giọng nói result: ', transcript);
    //   // document.getElementById("inputSearch").value = transcript;
    //   setTimeout(1000);
    //   setListening(false);
    //   navigate("/search?text=" + transcript);
    // };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('Đã phát hiện giọng nói result: ', transcript);
      // document.getElementById("inputSearch").value = transcript;
      setTimeout(1000);
      setListening(false);
      navigate("/search?textAudio=" + transcript);
    };

    recognition.onerror = (event) => {
      console.error('Không phát hiện giọng nói: ', event.error);
      setListening(false);
    };

    recognition.onend = (event) => {
      console.log("Quá trình nhận diện giọng nói đã kết thúc");
      if (event.results && event.results[0] && event.results[0][0]) {
        const transcript = event.results[0][0].transcript;
        // document.getElementById("inputSearch").value = transcript;
        setSearchTerm(transcript);
        navigate("/search?text=" + transcript);
      }
      setTimeout(1000);
      setListening(false);
    };

    if (listening) {
      recognition.start();
    }

    return () => {
      recognition.stop();
    };
  }, [listening]);
  const [data, setData] = useState();
  useEffect(() => {
    if (!isRequesting) {
      const token = sessionStorage.getItem("token");

      if (token) {
        const id_account = sessionStorage.getItem("id_account");
        axios.get('http://localhost:8080/api/v1/user/cart/' + id_account).then(response => {
          setData(response.data.result.datas);
          var total = 0;
          response.data.result.datas?.forEach(seller => {
            total += seller?.cart?.length;
          });
          setTotalCart(total);
        }).catch(error => console.error("fetch cart error " + error));
      }
    }
  }, [isRequesting]);
  // favorite
  const [totalFavorite, setTotalFavorite] = useState(0);
  useEffect(() => {
    if (!isRequesting) {
      const token = sessionStorage.getItem("token");
      if (token) {
        const id_account = sessionStorage.getItem("id_account");
        axios.get('http://localhost:8080/api/v1/user/favorite/getall/' + id_account).then(response => {
          setTotalFavorite(response.data.result.datas?.length);
        }).catch(error => console.error("fetch cart error " + error));
      }


    }
  }, [isRequesting]);

  useEffect(() => {
    // Xử lý khi ảnh được kéo vào vùng trang
    const handleDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const url = window.location.pathname;
      console.log("URL",url)
      if (!url.includes('/profile')) {
        if (e.dataTransfer && e.dataTransfer.items[0]?.type.startsWith("image/")) {
          setIsOpenModelImage(true);
        } else if (e.dataTransfer && e.dataTransfer.items[0]?.kind === "string") {
          setIsOpenModelImage(true)
        }
      };
    }


    // Xử lý khi thả ảnh
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();

      setIsOpenModelImage(false); // Đóng modal khi ảnh được thả vào
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  const searchImage = async (data) => {
    setIsOpenEvent(true);
    try {
      const response = await SearchService.searchImage(data);
      console.log(response);
      navigate(`/search?idProduct=${response.data.similar_product_ids}`);
      setIsOpenModelImage(false);
      setIsOpenEvent(false);
    } catch (error) {
      setIsOpenEvent(false);
      console.error(error)
    }
  }
  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <ToastContainer />
      {(isOpenEvent) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-99999">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
        </div>
      )}
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div>
              {type === 3 ? (
                <a href="/">
                  <img
                    width="152"
                    height="36"
                    src={`/assets/images/logo-3.svg`}
                    alt="logo"
                  />
                </a>
              ) : type === 4 ? (
                <a href="/">
                  <img
                    width="152"
                    height="36"
                    src={`/assets/images/logo-4.svg`}
                    alt="logo"
                  />
                </a>
              ) : (
                <a href="/">
                  <img
                    width="152"
                    height="36"
                    src={`/assets/images/logo_toel.png`}
                    alt="logo"
                  />
                </a>
              )}
            </div>

            <div className="w-[717px] h-[44px] flex">
              <SearchBox type={type} className="search-com" />
              <div onClick={() => { setListening(true) }} className="flex items-center justify-center   border rounded-full p-3 ml-2 cursor-pointer"><FaMicrophone size={20} color="gray" /></div>
              {/* mic */}
              {listening ? (<div className="fixed top-0 left-0 w-full h-[90px] z-[4000] bg-white flex items-center justify-center">
                <label className="mr-[20px] text-[20px] pr-sm-1" id="labelSearch">Đang nghe...</label>
                <div className="container-search bg-[rgba(255,0,0,0.133)] rounded-full p-[10px]">
                  <button
                    className={`voice-search-button ${listening ? 'pulse-animation' : ''} bg-red-500 rounded-full w-[50px] h-[50px] flex items-center justify-center transition-transform duration-300`}
                    onClick={() => setListening(false)}
                  >
                    <FaMicrophone size={20} color="white" />

                  </button>
                </div>
              </div>) : (<></>)}
              {/* ---------------------------------------- */}
              <div onClick={() => { setIsOpenModelImage(true) }} className="flex items-center justify-center   border rounded-full p-3 ml-2 cursor-pointer">            <MdOutlineImageSearch size={20} color="gray" />
              </div>
            </div>

            <Dialog open={isOpenModalImage} onClose={() => setIsOpenModelImage(false)} className="relative z-99999">
              <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-screen items-center justify-center p-4 sm:p-0">
                  <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg">

                    {/* Nội dung chính */}
                    <div className="p-6 text-center">
                      {/* Khu vực kéo thả hoặc upload file */}
                      <div
                        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg py-10 px-4 hover:border-blue-500 hover:bg-gray-100 transition"
                        onDragOver={(e) => {
                          e.preventDefault(); // Ngăn trình duyệt mở file
                          e.currentTarget.classList.add("border-blue-500", "bg-gray-100");
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove("border-blue-500", "bg-gray-100");

                          const file = e.dataTransfer.files[0]; // Lấy file đầu tiên được kéo thả
                          if (file && file.type.startsWith("image/")) {
                            console.log("Dropped file:", file);
                            // Thêm logic xử lý file ở đây
                            // Gắn file vào input để tận dụng xử lý hiện tại
                            const inputElement = document.getElementById("file-upload");
                            const dataTransfer = new DataTransfer();
                            dataTransfer.items.add(file);
                            inputElement.files = dataTransfer.files;
                          } else {
                            alert("Vui lòng gửi tệp là hình ảnh.");
                          }
                          const formData = new FormData();
                          formData.append("file", file);
                          searchImage(formData);
                        }}
                      >
                        <img width="70" height="70" src="https://img.icons8.com/?size=100&id=zqpSOVL88Ol1&format=png&color=000000" alt="image" />
                        <p className="mb-2 text-gray-600">Kéo một hình ảnh vào đây hoặc</p>
                        {/* Nút upload file */}
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer text-blue-500 hover:underline"
                        >
                          tải lên một tệp
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setIsOpenModelImage(false);
                              const formData = new FormData();
                              formData.append("file", file);
                              searchImage(formData);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </DialogPanel>
                </div>
              </div>

            </Dialog>
            <div className="flex space-x-6 items-center">
              {/* <div className="compaire relative">
                <a href="/products-compaire">
                  <span>
                    <Compair />
                  </span>
                </a>
                <span
                  className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${type === 3 ? "bg-qh3-blue text-white" : "bg-[#003EA1"
                    }`}
                >
                  2
                </span>
              </div> */}
              <div className="favorite relative">
                <a href="/wishlist">
                  <span>
                    <ThinLove />
                  </span>
                </a>
                <span
                  className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${type === 3 ? "bg-qh3-blue text-white" : "bg-[#003EA1] text-[#F5F5F5]"
                    }`}
                >
                  {totalFavorite}
                </span>
              </div>
              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <a>
                    <span onClick={changeCart}>
                      <ThinBag />
                    </span>
                  </a>
                  <span
                    className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${type === 3 ? "bg-qh3-blue text-white" : "bg-[#003EA1] text-[#F5F5F5]"
                      }`}
                  >
                    {totalCart}
                  </span>
                </div>

                <Cart
                  type={type}
                  className="absolute -right-[45px] top-11 z-50 hidden group-hover:block"
                  data={data}
                />
              </div>
              <div>
                <Link to="/profile">
                  <span>
                    <ThinPeople />
                  </span>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
