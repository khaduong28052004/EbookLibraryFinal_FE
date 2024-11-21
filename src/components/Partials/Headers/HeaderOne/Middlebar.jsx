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

export default function Middlebar({ className, type }) {
  const navigate = useNavigate();
  const [totalCart, setTotalCart] = useState(0);
  const token = sessionStorage.getItem("token");
  const [listening, setListening] = useState(false);
  const { startRequest, endRequest } = useRequest();
  const { isRequesting } = useRequest();

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

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('Đã phát hiện giọng nói result: ', transcript);
      // document.getElementById("inputSearch").value = transcript;
      setTimeout(1000);
      setListening(false);
      navigate("/search?text=" + transcript);
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

  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <ToastContainer />
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
            </div>
            <div className="flex space-x-6 items-center">
              {/* <div className="compaire relative">
                <a href="/products-compaire">
                  <span>
                    <Compair />
                  </span>
                </a>
                <span
                  className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow"
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
                  className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow"
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
                    className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow"
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
