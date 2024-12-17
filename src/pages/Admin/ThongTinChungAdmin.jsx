import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React, { useEffect, useState } from 'react';
import thongTinSan from "../../service/admin/ThongTinSan";
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

const ThongTinChungAdmin = () => {
  const initialFormData = {
    id: '',
    address: '',
    phone: '',
    email: '',
  };
  const imagesEXEX = [
    { id: 1, url: "https://www.nxbgd.vn/Attachments/images/Sach%20moi/CMLBT_BANNER-WEB-BOOKIZ.png" },
    { id: 2, url: "https://via.placeholder.com/800x250?text=Image+2" },
    { id: 3, url: "https://via.placeholder.com/800x250?text=Image+3" },
  ]

  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Theo dõi ảnh hiện tại
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    // Fetch dữ liệu từ API
    fetch('http://localhost:8080/api/v1/user/platforms/1')
      .then((response) => response.json())
      .then((data) => {
        setImages(data.images);  // Lưu các URL vào state
      })
      .catch((error) => { console.error('Error fetching images:', error); setImages(imagesEXEX); });
    getThongTin();
  }, []);

  // Chuyển ảnh mỗi 3 giây
  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Thay đổi ảnh mỗi 3 giây
      return () => clearInterval(interval); // Dọn dẹp khi component unmount
    }
  }, [images]);

  const updateImage = async (id, listImage) => {
    try {
      const response = await thongTinSan.postChuDe(id, listImage);
      toast.success(response.data.message);
      fetch('http://localhost:8080/api/v1/user/platforms/1')
        .then((response) => response.json())
        .then((data) => {
          setImages(data.images);
        })
        .catch((error) => { console.error('Error fetching images:', error); setImages(imagesEXEX); });
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  const getThongTin = async () => {
    try {
      const response = await thongTinSan.getThongTinSan();
      const data = response.data.result;
      setFormData({
        id: data.id || '',
        address: data.address || '',
        phone: data.phone || '',
        email: data.email || '',
      });

    } catch (error) {
      console.log("Error: " + error);
    }
  }



  const putThongTin = async () => {
    try {
      const response = await thongTinSan.putThongTinSan(formData);
      toast.success("Cập nhật thông tin thành công");
      setFormData(initialFormData);
      getThongTin();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error: " + error);
    }
  }

  const handleAddFiles = async (files) => {
    const selectedFiles = Array.from(files);

    if (selectedFiles.length < 1) {
      toast.error("Bạn cần chọn ít nhất 1 ảnh.");
      return;
    }
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("images", file));

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      await updateImage(1, formData);
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi tải ảnh lên.");
      console.error("Error:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    putThongTin();
  }

  return (
    <>
      <Breadcrumb pageName="Thông Tin Chung" status='Quản Trị' />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <ToastContainer></ToastContainer>
        <div className={`w-full`}>
          <div className="container-x mx-auto py-5">
            <p className='text-lg font-medium py-4'>Layout sàn</p>
            <div className="relative z-20 h-35 md:h-65  flex justify-center m-5">
              <div>
                {images.length > 0 && (
                  <picture
                    className="xl:h-full h-[600px]"
                    style={{ width: "800px", height: "250px" }}
                  >
                    <source
                      media="(min-width:1025px)"
                      srcSet={images[currentIndex].url}
                    />
                    <img
                      src={images[currentIndex]?.url}
                      alt="Platform image"
                      className="w-full h-full object-cover rounded-sm"
                      style={{ width: "800px", height: "250px" }} // Đặt cứng chiều rộng và chiều cao
                    />
                  </picture>
                )}
              </div>
              <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-45">
                <label
                  htmlFor="cover"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4"
                >
                  <input
                    type="file"
                    name="cover"
                    id="cover"
                    className="sr-only"
                    accept="image/*"
                    multiple
                    onChange={(event) => handleAddFiles(event.target.files)}
                  />
                  <span>
                    <svg
                      className="fill-current"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </label>
              </div>
            </div>
            <p className='text-lg font-medium py-4'>Thông tin sàn</p>
            <form onSubmit={handleSubmit} >
              <div className="grid grid-cols-2 gap-3 p-3 ustify-center my-5 bg-white ">
                <div className="flex flex-col w-full">
                  <label htmlFor="address1" className="text-lg font-medium">Địa chỉ</label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    type="text"
                    id="address1"
                    className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập địa chỉ"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="address2" className="text-lg font-medium">Số điện thoại</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="text"
                    id="address2"
                    className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <label htmlFor="address3" className="text-lg font-medium">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="text"
                    id="address3"
                    className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập email"
                  />
                </div>
                <Link to="/admin/chinhsachsan" className="w-full mt-5 flex justify-start">
                  <button
                    className="bg-gray-500 text-white font-semibold px-6 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Chính sách
                  </button>
                </Link>

              </div>
              <div className="w-full mt-4 flex justify-center">
                <button
                  className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </>
  );
};

export default ThongTinChungAdmin;
