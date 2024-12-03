import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
// npm install swiper@^9



const BestSeller = ({ products }) => {
  const swiperRef = useRef(null);
  const [bgImage, setBgImage] = useState(products[0]?.imageProducts[0]?.name); // Lấy ảnh đầu tiên làm background mặc định


  // Hàm cập nhật ảnh nền khi slide thay đổi
  const handleSlideChange = () => {
    const activeIndex = swiperRef.current.swiper.realIndex;
    const newBgImage = products[activeIndex]?.imageProducts[0].name;  
    setBgImage(newBgImage); // Cập nhật ảnh nền
  };

  return (

    <div className="relative w-full h-auto group px-3 py-3">
      {/* Background image with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: 'blur(5px)', // Thêm mờ cho background
          backgroundPosition: 'center', // Căn giữa ảnh nền
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50">
        </div>
      </div>
      <div className="absolute top-2 right-2 z-99999">
        <img
          src="https://png.pngtree.com/png-clipart/20210530/original/pngtree-hot-sale-vector-png-png-image_6337462.png"  // Thay thế với đường dẫn tới biểu tượng Sale của bạn
          alt="Sale"
          className="w-18 h-20 opacity-90"
        />
      </div>

      <Swiper
        ref={swiperRef}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true} // Căn giữa các slide
        loop={true}
        slidesPerView={2} // Cố định chỉ hiển thị 3 ảnh
        spaceBetween={-0} // Khoảng cách âm giữa các ảnh để tạo hiệu ứng chồng lên nhau
        autoplay={{
          delay: 1000, // Thời gian giữa các lần chuyển slide (ms)
          disableOnInteraction: true, // Không tắt tự động khi người dùng tương tác
        }}
        coverflowEffect={{
          rotate: 0, // Góc xoay của ảnh
          stretch: 11, // Không kéo dài ảnh
          depth: 200, // Chiều sâu của hiệu ứng
          modifier: 1.5, // Độ mạnh của hiệu ứng
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="p-5"
        onSlideChange={handleSlideChange} // Gọi hàm khi slide thay đổi
      >
        {products.map((product, index) => (
          // `${API_BASE_URL}/district`
          // {/productdetail?idProduct=2}

          <SwiperSlide key={index} className="flex justify-center">
            <Link to={`productdetail?idProduct=${product.id}`}>
              <div className=" relative rounded-lg flex flex-col items-center justify-center">
                <img
                  src={product.imageProducts[0].name}
                  alt={product.title}
                  className=" w-[200px] h-[180px]  object-cover rounded-md"
                />
              </div>
            </Link>
            {/* <div className="absolute top-1 right-2">
              <img
                src="https://png.pngtree.com/png-clipart/20221220/original/pngtree-hot-sale-vector-label-with-fire-icon-png-image_8786228.png"  // Thay thế với đường dẫn tới biểu tượng Sale của bạn
                alt="Sale"
                className="w-15 h-auto opacity-80"
              />
            </div> */}
          </SwiperSlide>

        ))}
      </Swiper>


      <button
        className="absolute top-1/2 left-5 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_0_0.5px_rgba(0,0,0,0.)] text-slate-50 bg-gray-500 hover:opacity-70 bg-opacity-75 px-3 rounded-full cursor-pointer z-10 shadow-lg"
        onClick={() => swiperRef.current.swiper.slidePrev()}
      >
        <span className="text-2xl">‹</span> {/* Mũi tên trái */}
      </button>
      <button
        className="absolute top-1/2 right-5 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_0_0.5px_rgba(0,0,0,0.)] text-slate-50 bg-gray-500 hover:opacity-80 bg-opacity-75 px-3 rounded-full cursor-pointer z-10 shadow-lg"
        onClick={() => swiperRef.current.swiper.slideNext()}
      >
        <span className="text-2xl">›</span> {/* Mũi tên phải */}
      </button>
    </div>
  );
}

export default BestSeller;
