import { useState, useEffect } from "react";
import InputCom from "../../../Helpers/InputCom";
import { Link } from "react-router-dom";
import AuthService from "../../../../service/authService";
import { PencilSquareIcon, PhotoIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { uploadImageAvt,uploadImageBR } from "../../../../service/dangKySellerService";

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
  const [dragActive, setDragActive] = useState({ avatar: false, background: false });

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
    if (name === 'birthday') {
      const today = new Date();
      const selectedDate = new Date(value);

      if (selectedDate > today) {
        setFormErrors(prev => ({
          ...prev,
          birthday: 'Ngày sinh không thể lớn hơn ngày hiện tại'
        }));
        return;
      } else {
        setFormErrors(prev => ({
          ...prev,
          birthday: undefined
        }));
      }
    }

    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDrag = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(prev => ({ ...prev, [type]: true }));
    } else if (e.type === "dragleave") {
      setDragActive(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [type]: false }));

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file, type);
    }
  };

  const handleFile = (file, type) => {
    if (!file.type.startsWith('image/')) {
      toast.error("Vui lòng chỉ tải lên tệp hình ảnh");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File quá lớn. Vui lòng chọn file nhỏ hơn 5MB");
      return;
    }

    if (type === 'avatar') {
      setimgAvartar(file);
    } else if (type === 'background') {
      setimgBackgrourd(file);
    }
  };

  const handleImageChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      handleFile(file, type);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification({ message: "", type: "" });
    setFormErrors({});
    let isValid = true;

    const validations = {
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
        const today = new Date();
        const selectedDate = new Date(formData.birthday);
        if (selectedDate > today) {
          setFormErrors((prev) => ({ ...prev, birthday: 'Ngày sinh không thể lớn hơn ngày hiện tại' }));
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

    Object.values(validations).forEach((validate) => validate());

    if (!isValid) {
      toast.error("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.");
      return;
    }

    try {
      const id = sessionStorage.getItem("id_account");
    
      // Upload avatar nếu có
      if (imgAvartar) {
        const formDataAvt = new FormData();
        formDataAvt.append("imgAvatar", imgAvartar);
        await uploadImageAvt(id, formDataAvt);
      }
    
      // Upload background nếu có
      if (imgBackgrourd) {
        const formDataBg = new FormData();
        formDataBg.append("imgBackground", imgBackgrourd);
        await uploadImageBR(id, formDataBg);
      }
    
      // Cập nhật thông tin tài khoản
      const response = await AuthService.updateAccount(id, formData);
      toast.success("Cập nhật tài khoản thành công!");
      fetchData();
    } catch (error) {
      toast.error("Cập nhật thất bại, vui lòng kiểm tra lại!");
      console.error("Error:", error);
    }
    
  };

  return (
    <div className="flex flex-col space-y-8 items-center bg-white rounded-lg">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="w-[750px] mt-0">
        <div className=' border py-10 flex flex-row rounded-md'
          style={{
            backgroundImage: `url(${imgBackgrourd ? URL.createObjectURL(imgBackgrourd) : formData.imgBackgrourd})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
          <img className=' border rounded-full w-24 h-24 mx-6'
            src={imgAvartar ? URL.createObjectURL(imgAvartar) : formData.imgAvartar} />
          <p className='font-bold p-3 mt-3 text-xl text-black'>{formData.nameShop}</p>
        </div>
        <br />
        <div className='flex flex-row gap-6 mb-8'>
          <div className='flex-1'>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh đại diện</label>
            <div
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${dragActive.avatar ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                } border-dashed rounded-md hover:border-blue-500 transition-colors`}
              onDragEnter={e => handleDrag(e, 'avatar')}
              onDragLeave={e => handleDrag(e, 'avatar')}
              onDragOver={e => handleDrag(e, 'avatar')}
              onDrop={e => handleDrop(e, 'avatar')}
            >
              <div className="space-y-1 text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="avatar-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Tải ảnh lên</span>
                    <input id="avatar-upload" name="imgAvartar" type="file" className="sr-only" accept="image/*" onChange={(e) => handleImageChange(e, 'avatar')} />
                  </label>
                  <p className="pl-1">hoặc kéo thả</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG tối đa 5MB</p>
              </div>
            </div>
          </div>

          <div className='flex-1'>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh bìa</label>
            <div
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${dragActive.background ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                } border-dashed rounded-md hover:border-blue-500 transition-colors`}
              onDragEnter={e => handleDrag(e, 'background')}
              onDragLeave={e => handleDrag(e, 'background')}
              onDragOver={e => handleDrag(e, 'background')}
              onDrop={e => handleDrop(e, 'background')}
            >
              <div className="space-y-1 text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="background-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Tải ảnh lên</span>
                    <input id="background-upload" name="imgBackgrourd" type="file" className="sr-only" accept="image/*" onChange={(e) => handleImageChange(e, 'background')} />
                  </label>
                  <p className="pl-1">hoặc kéo thả</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG tối đa 5MB</p>
              </div>
            </div>
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
              id="fullname"
              inputHandler={handleChange}
            />
            {formErrors.fullname && <p className="text-red-500 text-sm mt-1">{formErrors.fullname}</p>}
          </div>
          <div className="w-1/2 h-full">
            <InputCom
              label={<span className="font-bold">Ngày tháng năm sinh*</span>}
              placeholder="Vui lòng chọn ngày sinh"
              type="date"
              inputClasses="h-[50px]"
              value={formData.birthday}
              name="birthday"
              id="birthday"
              inputHandler={handleChange}
              max={new Date().toISOString().split('T')[0]}
            />
            {formErrors.birthday && <p className="text-red-500 text-sm mt-1">{formErrors.birthday}</p>}
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
              id="email"
              inputHandler={handleChange}
            />
            {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
          </div>
          <div className="w-1/2 h-full">
            <InputCom
              label={<span className="font-bold">Số điện thoại*</span>}
              placeholder="Vui lòng nhập số điện thoại"
              type="text"
              inputClasses="h-[50px]"
              value={formData.phone}
              name="phone"
              id="phone"
              inputHandler={handleChange}
            />
            {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
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
                id="fullNameAddress"
                inputHandler={handleChange}
                readOnly
              />
            </div>
            <Link to="/profile#address" className="mt-7 ml-5 flex justify-end">
              <button className="flex items-center justify-center w-[100px] h-[35px] rounded text-[#003EA1] text-[15px]  
                                                                                px-2 py-0 border border-[#003EA1] transition-all duration-500 ease-in-out hover:bg-gray-200 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#003EA1" class="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
              <PencilSquareIcon className="w-12 h-12 md:hidden block rounded-md bg-[#83bef2] hover:bg-[#44dbe6bb] text-white p-2" />
            </Link>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button type="submit" className=" bg-[#003EA1]  rounded text-white  text-sm font-bold text-center px-6 py-1  hover:opacity-90 ">
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}