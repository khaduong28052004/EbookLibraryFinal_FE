import React, { useEffect, useState, useRef } from 'react';

export default function Voucher({ vouchers }) {
  const tabBoxRef = useRef(null); // Sử dụng useRef để tham chiếu tới tabBox
  const arrowRef = useRef([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isLeftArrowVisible, setIsLeftArrowVisible] = useState(false);
  const [isRightArrowVisible, setIsRightArrowVisible] = useState(false);

  const handleIcons = () => {
    let scrollVal = Math.round(tabBoxRef.current.scrollLeft);
    let maxScrollableWidth =
      tabBoxRef.current.scrollWidth - tabBoxRef.current.clientWidth;
    setIsLeftArrowVisible(scrollVal > 0); // Hiển thị mũi tên trái nếu cuộn > 0
    setIsRightArrowVisible(scrollVal < maxScrollableWidth); // Hiển thị mũi tên phải nếu còn cuộn được
  };

  const handleDragging = (e) => {
    if (!isDragging || !tabBoxRef.current) return;
    if (tabBoxRef.current) {
      tabBoxRef.current.scrollLeft -= e.movementX; // Kéo tabBox khi chuột di chuyển            handleIcons();
      handleIcons();
    }
  };

  const handleArrowClick = (direction) => {
    const scrollAmount =
      tabBoxRef.current.scrollWidth - tabBoxRef.current.clientWidth; // Khoảng cách cuộn (pixels)
    const duration = 400; // Thời gian cuộn (ms)

    if (tabBoxRef.current) {
      smoothScroll(tabBoxRef.current, direction, scrollAmount, duration);
      setTimeout(() => {
        handleIcons(); // Cập nhật trạng thái mũi tên
      }, duration); // Chỉ gọi sau khi cuộn xong
    }
  };

  const smoothScroll = (scrollContainer, direction, distance, duration) => {
    const start = scrollContainer.scrollLeft; // Vị trí ban đầu
    const end = start + (direction === 'left' ? -distance : distance); // Điểm đến: "end = start + distance" và ngược lại "end = start + distance"
    const startTime = performance.now(); // Thời gian bắt đầu cuộn

    //currentTime: Thời điểm hiện tại (do requestAnimationFrame cung cấp)
    const animate = (currentTime) => {
      //hàm thực hiện hoạt ảnh cuộn từng khung hình.
      const elapsedTime = currentTime - startTime; // Thời gian đã trôi qua
      const progress = Math.min(elapsedTime / duration, 1); // Tỷ lệ tiến trình của hoạt ảnh (elapsedTime / duration), luôn nằm trong khoảng 0 -> 1 nhờ Math.min.
      const easing =
        progress < 0.5 //Tính toán giá trị tiến trình theo hàm easing (mượt)
          ? 4 * progress ** 3 //Tăng tốc (cubic ease-in) khi progress < 0.5
          : 1 - Math.pow(-2 * progress + 2, 3) / 2; //Giảm tốc (ease-out cubic) khi progress >= 0.5.
      scrollContainer.scrollLeft = start + (end - start) * easing; // Cuộn theo easing

      if (progress < 1) {
        requestAnimationFrame(animate); // Tiếp tục nếu chưa hoàn thành
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    handleIcons();

    const tabBox = tabBoxRef.current;

    const onMouseDown = () => setIsDragging(true); // Khi nhấn chuột, bắt đầu kéo
    const onMouseMove = (e) => handleDragging(e); // Khi di chuyển chuột, thực hiện kéo
    const onMouseUp = () => setIsDragging(false); // Khi thả chuột, kết thúc kéo
    const onMouseLeave = () => setIsDragging(false); // Khi chuột rời khỏi vùng kéo, kết thúc kéo

    if (tabBox) {
      // Thêm các sự kiện vào tabBox
      tabBox.addEventListener('mousedown', onMouseDown);
      tabBox.addEventListener('mousemove', onMouseMove);
      tabBox.addEventListener('mouseup', onMouseUp);
      tabBox.addEventListener('mouseleave', onMouseLeave);
    }

    // Cleanup: loại bỏ sự kiện khi component bị unmount
    return () => {
      if (tabBox) {
        tabBox.removeEventListener('mousedown', onMouseDown);
        tabBox.removeEventListener('mousemove', onMouseMove);
        tabBox.removeEventListener('mouseup', onMouseUp);
        tabBox.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [isDragging]);

  if (vouchers == []) {
    return (
      <></>
    )
  }

  return (
    <div className=" container-x mx-auto gap-5 bg-white py-4">
      <div className="mb-3">
        <h3 className="text-gray-700">VOUCHER</h3>
      </div>
      <div className="wrapper relative  max-w-full overflow-x-hidden bg-white">
        {isLeftArrowVisible && (
          <div className="icon cursor-pointer absolute top-0 left-0 h-[100%] w-[120px] flex items-center ">
            <div className="border rounded-full p-2  bg-white  hover:bg-whiter">
              <svg
                ref={(el) => (arrowRef.current[0] = el)}
                id="left"
                className="arrow  cursor-pointer w-[35px] h-[35px] text-[1.2rem]
                    text-center leading-[55px] rounded-[50%]
                    left-0  bg-[linear-gradient(90deg,#fff_70%, trasparent)]
                    ml-[15px]
                    "
                onClick={() => handleArrowClick('left')}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width=""
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </div>
          </div>
        )}

        <ul
          ref={tabBoxRef}
          className="tabBox flex gap-6 list-none overflow-x-hidden overflow-y-hidden scroll-smooth"
        >
          {vouchers.map((voucher) => (
            <li key={voucher.id} className="tab rounded-lg text-sm">
              <div className={`border w-[250px] h-[100px] p-2 flex items-center select-none ${new Date(voucher.dateEnd) < new Date() || voucher.delete === true
                  ? 'border-white-500 bg-gray-100'
                  : 'border-sky-500 bg-sky-100'
                }`}>
                  <div className="flex-row w-8/12 text-[7px] text-gray-600 justify-center">
                <p>{voucher.name}</p>
                <p>Đơn tối thiểu {voucher.totalPriceOrder}</p>
                <p>HSD: {voucher.dateEnd}</p>
              </div>
              <div className="flex w-4/12 items-end">
                {/* <button
                  className={`${voucher.isSaved
                    ? 'border border-sky-500 text-sky-500'
                    : 'bg-[#003EA1] text-white'
                    } px-5 py-1 rounded-sm text-[15px] w-full hover:cursor-pointer`}
                >
                  {voucher.isSaved ? 'Dùng ngay' : 'Lưu'}
                </button> */}
              </div>
            </div>
              </li>
            
          ))}
      </ul>

      {isRightArrowVisible && (
        <div className="icon  cursor-pointer justify-end absolute top-0 right-0 h-[100%] w-[120px] flex items-center  ">
          <div className="border rounded-full p-2  bg-white  hover:bg-whiter">
            <svg
              ref={(el) => (arrowRef.current[1] = el)}
              id="right"
              className="arrow w-[35px] h-[35px] text-[1.2rem]
                    text-center leading-[55px] rounded-[50%] right-0  bg-[linear-gradient(90deg,#fff_70%, trasparent)]
                    mr-[15px] "
              onClick={() => handleArrowClick('right')}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width=""
              stroke="currentColor"
              class="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
    </div >
  );
}
