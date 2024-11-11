import { useState, useEffect } from "react";
import InputCom from "../../../Helpers/InputCom";
import { Link } from "react-router-dom";
import AuthService from "../../../../service/authService";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { uploadImages1 } from "../../../../service/dangKySellerService";
export default function ProfileTab() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    birthday: "",
    phone: "",
    fullNameAddress: "",
    background: "",
    avatar: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [notification, setNotification] = useState({ message: "", type: "" });

  const [imgAvartar, setimgAvartar] = useState(null);
  const [imgBackgrourd, setimgBackgrourd] = useState(null);
  const fetchData = async () => {
    const id = sessionStorage.getItem("id_account");
    if (!id) {
      console.error("Không tìm thấy ID tài khoản trong session storage.");
      return;
    }
    try {
      const userResponse = await axios.get(`http://localhost:8080/api/v1/user/${id}`);
      const userData = userResponse.data;
      const addressResponse = await axios.get(`http://localhost:8080/api/v1/user/rest/address/active/${id}`);
      const addresses = addressResponse.data.data;
      const activeAddress = addresses.find(address => address.status === true) || 'Chưa có địa chỉ';
      setFormData({
        username: userData.username || '',
        fullname: userData.fullname || '',
        email: userData.email || '',
        birthday: userData.birthday || '',
        phone: userData.phone || '',
        fullNameAddress: activeAddress.fullNameAddress,
        imgBackgrourd: userData.background,
        imgAvartar: userData.avatar,
      });
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu tài khoản", error);
      setNotification({ message: 'Không thể lấy dữ liệu tài khoản.', type: 'error' });
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field: ${name}, Value: ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //HÌNH
  const handleImageChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'avatar') {
          setimgAvartar(file); // Lưu file vào state
        } else if (type === 'background') {
          setimgBackgrourd(file); // Lưu file vào state
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification({ message: "", type: "" }); 
    setFormErrors({});  
    let isValid = true;

    const validations = {
      // nameShop: () => {
      //   if (!formData.nameShop) {
      //     setFormErrors((prev) => ({ ...prev, nameShop: 'Vui lòng nhập tên shop.' }));
      //     isValid = false;
      //   }
      // },
      username: () => {
        if (!formData.username) {
          setFormErrors((prev) => ({ ...prev, username: 'Vui lòng nhập username.' }));
          isValid = false;
        }
      },
      fullname: () => {
        if (!formData.fullname) {
          setFormErrors((prev) => ({ ...prev, fullname: 'Vui lòng nhập họ và tên.' }));
          isValid = false;
        }
      },
      email: () => {
        if (!formData.email) {
          setFormErrors((prev) => ({ ...prev, email: 'Vui lòng nhập email.' }));
          isValid = false;
        }
      },
      birthday: () => {
        if (!formData.birthday) {
          setFormErrors((prev) => ({ ...prev, birthday: 'Vui lòng chọn ngày sinh.' }));
          isValid = false;
        }
      },
      phone: () => {
        if (!formData.phone) {
          setFormErrors((prev) => ({ ...prev, phone: 'Vui lòng nhập số điện thoại.' }));
          isValid = false;
        } else if (!/^(09|03|07)\d{8}$/.test(formData.phone)) {
          setFormErrors((prev) => ({ ...prev, phone: 'Số điện thoại phải bắt đầu bằng 09, 03 hoặc 07 và có 10 số.' }));
          isValid = false;
        }
      }
    };
    console.log("Bắt đầu kiểm tra từng trường dữ liệu...");
    Object.values(validations).forEach((validate) => validate());
    console.log("Trạng thái hợp lệ sau khi kiểm tra:", isValid);
    console.log("Danh sách lỗi chi tiết:", formErrors);
        if (!isValid) {
      // setNotification({ message: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.', type: 'error' });
      toast.error("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.");// đăng nhập thất bại
      return;
    }
    try {
      const id = sessionStorage.getItem("id_account");
      if (imgAvartar || imgBackgrourd) {
        const formDataImages = new FormData();
        if (imgAvartar) formDataImages.append('imgAvartar', imgAvartar);
        if (imgBackgrourd) formDataImages.append('imgBackgrourd', imgBackgrourd);
        await uploadImages1(id, formDataImages);
      }
      const response = await AuthService.updateAccount(id, formData);
      console.log("data"+response )
      toast.success( 'Cập nhật tài khoản thành công!' );
      // setNotification({ message: "Cập nhật tài khoản thành công!", type: "success" });
      fetchData(); 
    } catch (error) {
      toast.error("Cập nhật thất bại vui lòng kiểm tra lại !");// đăng nhập thất bại
      // setNotification({ message: "Lỗi khi cập nhật tài khoản. Vui lòng thử lại.", type: "error" });
      console.error(error);
    }
  };


  return (
    <div className="flex flex-col space-y-8 p-20 bg-white rounded-lg shadow-lg">
      <ToastContainer />

      <form onSubmit={handleSubmit} className="w-[750px]">

        <div className='py-10 flex flex-row rounded-md'
          style={{
            backgroundImage: `url(${imgBackgrourd ? URL.createObjectURL(imgBackgrourd) : formData.imgBackgrourd})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
          <img className='rounded-full w-24 h-24 mx-6' alt="Avatar"
            src={imgAvartar ? URL.createObjectURL(imgAvartar) : formData.imgAvartar} />

          <p className='font-bold p-3 mt-3 text-xl text-black'>{formData.nameShop}</p>
        </div>

        <div className='flex flex-row'>
          <div className='m-3 w-1/2'>
            <label htmlFor="avt" className='text-base'>Chọn ảnh đại diện</label><br />
            <input className='my-3 w-full' id='avt' type="file" name="imgAvartar" accept="image/*" onChange={(e) => handleImageChange(e, 'avatar')} />
          </div>
          <div className='m-3 w-1/2'>
            <label htmlFor="cover" className='text-base'>Chọn ảnh bìa</label><br />
            <input className='my-3 w-full' id='cover' type="file" name="imgBackgrourd" accept="image/*" onChange={(e) => handleImageChange(e, 'background')} />
          </div>
        </div>
        <div className="input-item flex space-x-2.5 mb-8">

          <div className="w-1/2 h-full">
            <InputCom
              label={<span className="font-bold">Họ và tên*</span>}
              placeholder="Vui lòng nhập họ và tên"
              type="text"
              inputClasses="h-[50px]"
              value={formData.fullname}
              name="fullname"
              inputHandler={handleChange}
            />
            {formErrors.fullname && <p className="text-red-500">{formErrors.fullname}</p>}
          </div>
          <div className="w-1/2 h-full">
            <InputCom
              label={<span className="font-bold">Ngày tháng năm sinh*</span>}
              placeholder="Vui lòng chọn ngày sinh"
              type="date"
              inputClasses="h-[50px]"
              value={formData.birthday}
              name="birthday"
              inputHandler={handleChange}
            />
            {formErrors.birthday && <p className="text-red-500">{formErrors.birthday}</p>}
          </div>
        </div>
        <div className="input-item flex space-x-2.5 mb-8">
          <div className="w-1/2 h-full">
            <InputCom
              label={<span className="font-bold">Email*</span>}
              placeholder="Vui lòng nhập email"
              type="email"
              inputClasses="h-[50px]"
              value={formData.email}
              name="email"
              inputHandler={handleChange}
            />
            {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
          </div>
          <div className="w-1/2 h-full">
            <InputCom
              label={<span className="font-bold">Số điện thoại*</span>}
              placeholder="Vui lòng nhập số điện thoại"
              type="text"
              inputClasses="h-[50px]"
              value={formData.phone}
              name="phone"
              inputHandler={handleChange}
            />
            {formErrors.phone && <p className="text-red-500">{formErrors.phone}</p>}
          </div>
        </div>
        <div className="input-item mb-8">
          <div className="flex items-center">
            <div className="flex-1">
              <InputCom
                label={<span className="font-bold">Địa chỉ*</span>}
                placeholder="Vui lòng nhập địa chỉ"
                type="text"
                inputClasses="h-[50px]"
                value={formData.fullNameAddress}
                name="fullNameAddress"
                inputHandler={handleChange}
                readOnly
              />
            </div>
            <Link to="/profile#address" className="mt-7 ml-5 flex justify-end">
              <button className="min-w-[85px] rounded-md md:block hidden transition-transform transform hover:scale-105 bg-indigo-800 border-none bg-gradient-to-tr from-indigo-200 text-white p-2.5">
                Thay đổi
              </button>
              <PencilSquareIcon className="w-12 h-12 md:hidden block rounded-md bg-indigo-800 border-none bg-gradient-to-tr from-indigo-200 text-white p-2" />
            </Link>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button type="submit" className="min-w-[200px] rounded-md transition-transform transform hover:scale-105 bg-indigo-800 border-none bg-gradient-to-tr from-indigo-200 text-white p-3">
            Cập nhật thông tin
          </button>
        </div>
      </form>
    </div>
  );
}
