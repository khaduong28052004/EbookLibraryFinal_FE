import { useRef, useEffect, useState } from "react";
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import { ToastContainer, toast } from "react-toastify";
import {
  fetchCheckImgCard,
  fetchRegisterSell,
  uploadImages,
  getSeller,
  checkCCCDInDatabase,
  checkFaceAi
} from "../../service/dangKySellerService";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

export default function BecomeSaller() {
  const [isOpen, setIsOpen] = useState(false);
  const [imgAfter, setImgAfter] = useState(null);
  const [imgBefore, setImgBefore] = useState(null);
  const imgAfterInput = useRef(null);
  const imgBeforeInput = useRef(null);
  const browseimgAfter = () => imgAfterInput.current.click();
  const browseimgBefore = () => imgBeforeInput.current.click();
  const loggedInSellerId = sessionStorage.getItem("id_account") || 1;
  const [currentStep, setCurrentStep] = useState(1);
  const [registerSellData, setRegisterSellData] = useState({
    shopName: "",
    numberId: "",
    phone: "",
    fullName: "",
  });
  const [successData, setSuccessData] = useState({
    dataShopName: "",
    dataNumberCard: "",
    dataStatus: "",
    dataPhone: "",
    dataSeller: "",
  });
  const [cccdExists, setCccdExists] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [id1, setId1] = useState(null);
  const [id2, setId2] = useState(null);
  const [name, setName] = useState("");
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [countdown, setCountdown] = useState(null);
  const [error, setError] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const chunks = useRef([]); // Lưu các chunk video
  const [isRecording, setIsRecording] = useState(false);
  const [imageTest, setImageTest] = useState(null);
  const checkImg = async () => {
    if (id1 !== null && id2 !== null) {
      if (id1 === id2) {
        setRegisterSellData((prevState) => ({
          ...prevState,
          numberId: id1,
          fullName: name,
        }));
        toast.success("Ảnh CCCD hợp lệ");
        setIsOpen(true);
      } else {
        toast.error("Vui lòng chọn ảnh mặt trước và mặt sau trùng khớp!!");
      }
    }
  };
  useEffect(() => {
    checkImg()
  }, [id1, id2]);

  useEffect(() => {
    if (isOpen) {
      // Mở camera
      openCamera();
    } else {
      // Tắt camera khi hộp thoại đóng
      closeCamera();
    }

    return () => closeCamera();
  }, [isOpen]);

  const handleXacThuc = () => {

    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunks.current.push(e.data); 
      };

      mediaRecorderRef.current.onstop = () => {
        // Khi dừng ghi, set videoURL
        const blob = new Blob(chunks.current, { type: 'video/webm' });
        handleCheckFaceAi(blob);
        chunks.current = [];
      };

      mediaRecorderRef.current.start();
    }


    // Đếm ngược thời gian
    let timeLeft = 10;
    setCountdown(timeLeft);
    const interval = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);  // Cập nhật thời gian đếm ngược
      if (timeLeft === 0) {
        console.log("OKe");
        // if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();  // Dừng quay video khi hết thời gian
        // }
        clearInterval(interval);

      }
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(interval);
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  };



  const handleCheckFaceAi = async (videoCheck) => {
    try {
      console.log("VIDEO", videoCheck);
      console.log("cmnd", imgBefore);
      const formData = new FormData();
      formData.append('video', videoCheck, 'video.webm');
      formData.append('cmnd', imgBefore);
      const response = await checkFaceAi(formData);
      console.log("checkAI", response);
      if (response.data.liveness.is_live === 'false') {
        // Kiểm tra nếu không phải là "live"
        toast.error(`Xác thực không thành công! ${response.data.liveness.message}`);
      } else if (response.data.face_match.similarity < 90) {
        // Kiểm tra nếu độ tương đồng giữa khuôn mặt thấp
        toast.error("Xác thực không thành công. Độ tương đồng khuôn mặt quá thấp.");
      } else {
        // Nếu cả 2 điều kiện đều đạt
        toast.success("Xác thực thành công!");
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleImageTest = (e) => {
    setImageTest(e.target.files[0]);
  }

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      setError("Không thể truy cập camera. Vui lòng kiểm tra cài đặt quyền hoặc thiết bị.");
    }
  };

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };




  useEffect(() => {
    fetchGetSeller(loggedInSellerId)
  }, [loggedInSellerId]);

  const handleImageChange = async (event, frame) => {

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (frame === 1) {
          setImgBefore(reader.result);
        } else {
          setImgAfter(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }

    const registerSellData = new FormData();
    registerSellData.append("image", file);
    try {
      const data = await fetchCheckImgCard(registerSellData);
      console.log("Image API Response:", data);
      if (data && data.data && data.data.length > 0) {
        const imageData = data.data[0];
        console.log("Extracted Image Data:", imageData);
        if (frame === 1) {
          setId1(imageData.id);
          setName(imageData.name);
        } else {
          setId2(imageData.mrz_details.id);
        }
      } else {
        toast.error("Vui lòng chọn ảnh là CCCD");
      }
    } catch (error) {
      console.error("Error fetching image data:", error);
      toast.error("Vui lòng chọn ảnh là CCCD");
    }
  };

  const handleInputChange = (e) => {
    console.log("videoURL", videoURL);

    const { name, value } = e.target;
    setRegisterSellData(prev => ({ ...prev, [name]: value }));
    setCccdExists(null);
    setErrorMessage("");
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    const cccdNumber = registerSellData.numberId;
    if (cccdExists) return toast.error("Vui lòng khắc phục lỗi trước khi gửi.");
    if (cccdNumber) {
      const exists = await checkCCCDInDatabase(cccdNumber);
      if (exists) {
        setErrorMessage("Số CCCD đã tồn tại trong hệ thống.");
        return toast.error("Số CCCD đã tồn tại trong hệ thống.");
      } else {
        setErrorMessage("");
        console.log("CCCD hợp lệ, tiếp tục đăng ký seller.");
        try {
          await fetchRegister(e); // Gọi hàm fetchRegister để tiến hành đăng ký
          toast.success("Đăng ký thành công.");


        } catch (error) {
          console.error("Đăng ký thất bại:", error);
          toast.error("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
        }
      }
    } else {
      setErrorMessage("Vui lòng nhập số CCCD.");
    }
  };

  const handleBlur = async () => {
    const cccdNumber = registerSellData.numberId;
    if (cccdNumber) {
      try {
        const exists = await checkCCCDInDatabase(cccdNumber);
        setCccdExists(exists);
        exists ? setErrorMessage("Số CCCD đã tồn tại trong hệ thống.") : setErrorMessage("");
      } catch {
        setErrorMessage("Đã xảy ra lỗi khi kiểm tra số CCCD.");
      }
    }
  };
  const fetchRegister = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imgBefore", imgBefore);
    formData.append("imgAfter", imgAfter);
    console.log("FormData imgBefore:", formData.get("imgBefore"));
    console.log("FormData imgAfter:", formData.get("imgAfter"));
    const isCCCDValid = await checkCCCDInDatabase(registerSellData.numberId);
    console.log("CCCD Valid:", isCCCDValid);
    try {
      const data = await fetchRegisterSell(loggedInSellerId, registerSellData);
      console.log("Register Data:", data);
      if (data && data.status === "success") {
        setSuccessData({
          dataShopName: registerSellData.shopName,
          dataNumberCard: registerSellData.numberId,
          dataPhone: registerSellData.phone,
          dataSeller: "Đang chờ duyệt",
        });
        console.log("Success Data Updated:", successData);
        if (imgBefore || imgAfter) {
          try {
            await uploadImages(loggedInSellerId, formData);
            console.log("Images uploaded successfully");
          } catch (uploadError) {
            console.error("Error uploading images:", uploadError);
            toast.error("Đã xảy ra lỗi trong quá trình tải ảnh lên.");
          }
        }

        setCurrentStep(currentStep + 1);
        await fetchGetSeller(loggedInSellerId);
      } else {
        console.error("Lỗi đăng ký:", data);
        toast.error("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const fetchGetSeller = async (sellerId) => {
    try {
      const data = await getSeller(sellerId);
      if (data?.status && data.seller === "Đã duyệt") {
        setSuccessData(prev => ({
          ...prev,
          dataNumberCard: data.numberId,
          dataPhone: data.phone,
          dataSeller: data.seller,
          dataShopName: data.shopName,
        }));
        handleNextStep();
      }
    } catch {
      toast.error("Đã xảy ra lỗi khi lấy thông tin người bán.");
    }
  };
  const checkPhone = (event) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(event.target.value)) {
      toast.error("Số điện thoại không hợp lệ. Vui lòng nhập 10-11 chữ số.");
      setRegisterSellData(prev => ({ ...prev, phone: "" }));
    }
  };

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="become-saller-wrapper w-full">
        <div className="title mb-10">
          <PageTitle
            title="Ứng Dụng Của Người Bán"
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "Become Saller", path: "/become-saller" },
            ]}
          />
        </div>
        <div className="content-wrapper w-full mb-10">
          <div className="container-x mx-auto">
            {currentStep === 1 && (
              <form onSubmit={fetchRegister}>
                <div className="w-full bg-white sm:p-[30px] p-3">
                  <div className="flex xl:flex-row flex-col-reverse xl:space-x-11">
                    <div className="xl:w-[824px]">
                      <div className="title w-full mb-4">
                        <h1 className="text-[22px] font-semibold text-qblack mb-1">
                          Thông tin cửa hàng
                        </h1>
                        <p className="text-[15px] text-qgraytwo">
                          Hãy điền vào mẫu dưới đây hoặc viết thư cho chúng tôi. Chúng tôi sẽ hỗ trợ bạn sớm nhất có thể.
                        </p>
                      </div>
                      <div className="input-area">
                        <div className="mb-5">
                          <InputCom
                            placeholder="Ví dụ: Shashi Shop"
                            label="Tên Cửa Hàng*"
                            name="shopName"
                            type="text"
                            id="shopName"
                            value={registerSellData.shopName}
                            inputHandler={handleInputChange}
                            required
                            inputClasses="h-[50px]"
                          />
                        </div>
                        <div className="mb-5">
                          <InputCom
                            placeholder="Nhập vào số điện thoại"
                            label="Số điện thoại*"
                            name="phone"
                            id="phone"
                            value={registerSellData.phone}
                            inputHandler={handleInputChange}
                            onBlur={checkPhone}
                            required
                            type="text"
                            inputClasses="h-[50px]"
                          />
                        </div>

                        <div className="mb-5">
                          <InputCom
                            placeholder="Tải ảnh CCCD để hiện"
                            label="Số CCCD*"
                            id="numberId"
                            name="numberId"
                            value={registerSellData.numberId}
                            onChange={handleInputChange}
                            onBlur={handleBlur} // Kiểm tra khi mất focus
                            readOnly
                            type="text"
                            inputClasses="h-[50px]"
                          />
                          {errorMessage && (
                            <span className="text-red-500 text-sm">{errorMessage}</span>
                          )}
                        </div>

                        <div className="mb-5">
                          <InputCom
                            placeholder="Tải ảnh CCCD để hiện"
                            label="Họ và tên*"
                            id="fullname"
                            name="fullName"
                            value={registerSellData.fullName}
                            inputHandler={handleInputChange}
                            readOnly
                            type="text"
                            inputClasses="h-[50px]"
                          />
                        </div>
                        <div className="signin-area mb-3">
                          <div className="flex justify-center">
                            <button
                              type="submit"
                              onClick={handleConfirm}
                              className="black-btn text-sm text-white w-[490px] h-[50px] font-semibold flex justify-center bg-purple items-center"
                            >
                              <span>Tạo Tài Khoản Người Bán</span>
                            </button>
                          </div>
                        </div>

                        <div className="signup-area flex justify-center">
                          <p className="text-sm text-qgraytwo font-normal">
                            Bạn đã có tài khoản ?
                            <a href="/login" className="ml-2 text-qblack">
                              Đăng Nhập
                            </a>
                          </p>
                        </div>

                      </div>
                    </div>
                    <div className="flex-1 mb-10 xl:mb-0">
                      <div className="update-cover w-full">
                        <p className="text-sm text-qgraytwo mb-5">
                          Ảnh chụp mặt trước của thẻ CCCD
                        </p>
                        <div className="flex justify-center">
                          <div className="w-full relative">
                            <img

                              src={imgBefore}
                              alt="Mặt trước CCCD"
                              className="w-full h-[120px] rounded-lg overflow-hidden object-cover"
                            />
                            <input ref={imgBeforeInput} name="imgBefore"
                              type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 1)} />
                            <div
                              onClick={browseimgBefore}
                              className="w-[32px] h-[32px] absolute -bottom-4 right-4 bg-[#F539F8] hover:bg-[#F539F8] rounded-full cursor-pointer"
                            >
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z"
                                  fill="white"
                                />
                                <path
                                  d="M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"
                                  fill="white"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="update-cover w-full">
                        <p className="text-sm text-qgraytwo mb-5">
                          Ảnh chụp mặt sau của thẻ CCCD
                        </p>
                        <div className="flex justify-center">
                          <div className="w-full relative">
                            <img
                              src={imgAfter}
                              alt="Mặt sau CCCD"
                              className="w-full h-[120px] rounded-lg overflow-hidden object-cover"
                            />

                            <input ref={imgAfterInput} name="imgAfter" type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 2)} />

                            <div
                              onClick={browseimgAfter}
                              className="w-[32px] h-[32px] absolute -bottom-4 right-4 bg-[#F539F8] hover:bg-[#F539F8] rounded-full cursor-pointer"
                            >
                              <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16.5147 11.5C17.7284 12.7137 18.9234 13.9087 20.1296 15.115C19.9798 15.2611 19.8187 15.4109 19.6651 15.5683C17.4699 17.7635 15.271 19.9587 13.0758 22.1539C12.9334 22.2962 12.7948 22.4386 12.6524 22.5735C12.6187 22.6034 12.5663 22.6296 12.5213 22.6296C11.3788 22.6334 10.2362 22.6297 9.09365 22.6334C9.01498 22.6334 9 22.6034 9 22.536C9 21.4009 9 20.2621 9.00375 19.1271C9.00375 19.0746 9.02997 19.0109 9.06368 18.9772C10.4123 17.6249 11.7609 16.2763 13.1095 14.9277C14.2295 13.8076 15.3459 12.6913 16.466 11.5712C16.4884 11.5487 16.4997 11.5187 16.5147 11.5Z"
                                  fill="white"
                                />
                                <path
                                  d="M20.9499 14.2904C19.7436 13.0842 18.5449 11.8854 17.3499 10.6904C17.5634 10.4694 17.7844 10.2446 18.0054 10.0199C18.2639 9.76139 18.5261 9.50291 18.7884 9.24443C19.118 8.91852 19.5713 8.91852 19.8972 9.24443C20.7251 10.0611 21.5492 10.8815 22.3771 11.6981C22.6993 12.0165 22.7105 12.4698 22.3996 12.792C21.9238 13.2865 21.4443 13.7772 20.9686 14.2717C20.9648 14.2792 20.9536 14.2867 20.9499 14.2904Z"
                                  fill="white"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
            {currentStep === 2 && (
              <div className="py-24 px-48 flex justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                  <h5 className="text-center text-xl font-semibold mb-4">
                    Đăng Ký Người Bán
                  </h5>
                  <p className="text-gray-600 mb-2">
                    Tên Shop: {successData.dataShopName}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Số Điện Thoại: {successData.dataPhone}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Số Căn Cước Công Dân: {successData.dataNumberCard}
                  </p>
                  <p className="text-gray-700 py-2">
                    Trạng thái:{" "}
                    {successData.dataSeller === "Đã duyệt"
                      ? "Đã duyệt"
                      : "Đang chờ duyệt"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(true)}

        className="relative z-50"
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
            }`}
        ></div>

        {/* Dialog Content */}
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-transform duration-300 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}
        >
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="p-4 bg-blue-500 text-white text-lg font-semibold">
              Xác Thực Khuôn Mặt
            </div>

            {/* Camera View */}
            <div className="p-6 flex flex-col items-center justify-center space-y-4">
              {error ? (
                <p className="text-red-500 text-sm">{error}</p>
              ) : (
                <div className="relative w-48 h-48 rounded-full border-4 border-blue-500 overflow-hidden">
                  <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                  ></video>
                  {/* Spinning Border Animation */}
                  <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                </div>
              )}
              <p className="text-sm text-gray-500">
                Vui lòng đưa khuôn mặt vào khung camera để xác thực.
              </p>
              <input type="file" name="imageTest" onChange={handleImageTest} />

              {countdown !== null && (
                <p className="text-lg font-bold text-blue-500">{countdown}s</p>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-100 flex justify-end items-center">
              <button
                onClick={handleXacThuc}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Xác Thực
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      <ToastContainer />
    </Layout>
  );
}


