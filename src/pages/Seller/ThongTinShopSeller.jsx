import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

import {
  ArrowPathIcon,
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import ShopService from '../../service/Seller/ShopService';
import { toast, ToastContainer } from 'react-toastify';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import axios from 'axios';
import { uploadImages1 } from "../../service/dangKySellerService";
import AuthService from "../../service/authService";

import {
  loadProvinces,
  postAddress,
  loadDistricts,
  loadWards,
  putAddress,
  getOneAddress,
} from '../../service/addressService';
import { useLocation } from 'react-router-dom';
const ShopSeller = () => {
  const [data, setData] = useState({
    id: null,
    avatar: null,
    background: null,
    fullname: '',
    shopName: '',
    posts: 0,
    followers : null,
    following: 0,
    phone: '',
    email: '',
    fullNameAddress: '', // tên đường cộng với data-name (commune), data-name (district), data-name (province)
    province: '', // lưu id của nó
    district: '', // lưu id của nó
    commune: '', // lưu id của nó
    wardCode: '',
  });
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [error, setError] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wardCode, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({
    id: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);

  const [selectedDistrict, setSelectedDistrict] = useState({
    id: '',
    name: '',
  });
  const [selectedWard, setSelectedWard] = useState({ id: '', name: '' });
  const [imgAvartar, setimgAvartar] = useState(null);
  const [imgBackgrourd, setimgBackgrourd] = useState(null);
  const [dragActive, setDragActive] = useState({
    avatar: false,
    background: false,
  });
  const location = useLocation();
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading(true);
      setError('');
      try {
        const provincesData = await loadProvinces();
        setProvinces(provincesData);
        console.log(provincesData);
      } catch (error) {
        setError('Failed to load provinces. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProvinces();
  }, []);
  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvince.id) {
        setLoading(true);
        setError('');
        try {
          const districtsData = await loadDistricts(
            parseInt(selectedProvince.id, 10),
          );
          setDistricts(districtsData);
          console.log(districtsData);
        } catch (error) {
          setError('Failed to load districts. Please try again.');
        } finally {
          setLoading(false);
        }
      } else {
        setDistricts([]);
        setWards([]);
      }
    };
    fetchDistricts();
  }, [selectedProvince]);
  useEffect(() => {
    const fetchWards = async () => {
      if (selectedDistrict.id) {
        setLoading(true);
        setError('');
        try {
          const wardsData = await loadWards(parseInt(selectedDistrict.id, 10));
          setWards(wardsData);
          console.log(wardsData);
        } catch (error) {
          setError('Failed to load wards. Please try again.');
        } finally {
          setLoading(false);
        }
      } else {
        setWards([]);
      }
    };
    fetchWards();
  }, [selectedDistrict]);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  useEffect(() => {
    const fetchdata = async () => {
      if (editingAddressId) {
        try {
          const data = await getOneAddress(editingAddressId);
          setData((prevData) => ({
            ...prevData,
            ...data, // cập nhật đầy đủ dữ liệu từ API
          }));
          setSelectedProvince({ id: data.province, name: data.provinceName });
          setSelectedDistrict({ id: data.district, name: data.districtName });
          setSelectedWard({ id: data.wardCode, name: data.wardsName });
          console.log('Tải dữ liệu chỉnh sửa thành công');
        } catch (error) {
          console.log('Lỗi khi tải dữ liệu chỉnh sửa');
        }
      }
    };
    // console.log('hhbh' + editingAddressId);
    fetchdata();
  }, [editingAddressId]);

  const handleProvinceChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setSelectedProvince({
      id: selectedOption.value,
      name: selectedOption.getAttribute('data-name'),
    });
  };
  const handleDistrictChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setSelectedDistrict({
      id: selectedOption.value,
      name: selectedOption.getAttribute('data-name'),
    });
  };
  const [image, setImage] = useState({
    avatar: null,
    background: null,
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, [location]);
  const handleImageChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      handleFile(file, type);
    }
  };
  const handleFile = (file, type) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Vui lòng chỉ tải lên tệp hình ảnh');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File quá lớn. Vui lòng chọn file nhỏ hơn 5MB');
      return;
    }

    if (type === 'avatar') {
      setimgAvartar(file);
    } else if (type === 'background') {
      setimgBackgrourd(file);
    }
  };
 
  const loadData = async () => {
    try {
      const id = sessionStorage.getItem('id_account'); // Lấy id từ sessionStorage
  
      // Gọi API lấy thông tin shop
      const shopResponse = await axios.get(
        `http://localhost:8080/api/v1/seller/shop/followers/count?shop_id=${id}`
      );
      const followers = shopResponse.data.result; // Số lượng followers
  
      const shopfollowingResponse = await axios.get(
        `http://localhost:8080/api/v1/seller/shop/following/count?account_id=${id}`
      );
      const following = shopfollowingResponse.data.result; // Số lượng following

      const postResponse = await axios.get(
        `http://localhost:8080/api/v1/seller/shop/posts/count?account_id=${id}`
      );
      const posts = postResponse.data.result; // Số lượng post
      // Gọi API lấy thông tin tài khoản
      const accountResponse = await ShopService.get();

      const account = accountResponse.data.result;
  
      // Gọi API lấy địa chỉ
      const addressResponse = await axios.get(
        `http://localhost:8080/api/v1/user/rest/address/active/${id}`
      );
      const addresses = addressResponse.data.data;
  
      const activeAddress =
        addresses.find((address) => address.status === true) ||
        { fullNameAddress: 'Chưa có địa chỉ', id: null };
  
      // Cập nhật state
      setData({
        imgAvartar: account.avatar,
        imgBackgrourd: account.background,
        fullname: account.fullname,
        shopName: account.shopName,
        posts, // Số bài viết
        followers, // Số lượng followers
        following, // Số người đang theo dõi
        phone: account.phone || '', // Số điện thoại
        fullNameAddress: activeAddress.fullNameAddress || 'Chưa có địa chỉ',
        email: account.email || 'Chưa có email', // Email
      });
  
      setEditingAddressId(activeAddress.id); // Cập nhật id địa chỉ đang chỉnh sửa
      console.log('Địa chỉ đang chỉnh sửa:', activeAddress.id);
    } catch (error) {
      toast.error('Không thể tải thông tin từ server.');
      console.error('Lỗi khi tải dữ liệu:', error);
    }
  };
  
  const handleWardChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setSelectedWard({
      id: selectedOption.value,
      name: selectedOption.getAttribute('data-name'),
    });
  };
  const handleSave = async (event) => {
    if (!data.phone || data.phone.trim() === '') {
      toast.error('Vui lòng nhập số điện thoại!');
      return;
    }
    if (!data.province || data.province === 'default') {
      toast.error('Vui lòng chọn Tỉnh/Thành Phố!');
      return;
    }

    if (!data.district || data.district === 'default') {
      toast.error('Vui lòng chọn Quận/Huyện!');
      return;
    }

    if (!data.wardCode || data.wardCode === 'default') {
      toast.error('Vui lòng chọn Xã/Phường!');
      return;
    }
    event.preventDefault();
    const id = sessionStorage.getItem('id_account') || 1;
  try {
    // Kiểm tra nếu có `data.id` để xác định là cập nhật hay thêm mới
    if (data.id) {
      // Tạo fullNameAddress bằng cách nối các trường
      const fullNameAddress = [
        data.fullNameAddress || '',
        selectedWard?.name || '',
        selectedDistrict?.name || '',
        selectedProvince?.name || '',
      ]
        .filter((part) => part.trim() !== '') // Loại bỏ phần rỗng
        .join(', '); // Nối các phần bằng dấu phẩy
      // Cập nhật dữ liệu địa chỉ
      const updatedAddressData = {
        ...data,
        fullNameAddress: fullNameAddress,
      };
      try {
        if (imgAvartar || imgBackgrourd) {
          const formDataImages = new FormData();
          if (imgAvartar) formDataImages.append('imgAvartar', imgAvartar);
          if (imgBackgrourd) formDataImages.append('imgBackgrourd', imgBackgrourd);
          await uploadImages1(id, formDataImages); // Upload hình ảnh
        }
        // Cập nhật thông tin tài khoản
        await AuthService.updateAccount(id, data);
        await putAddress(id, updatedAddressData);
        toast.success('Cập nhật thành công!');
      } catch (error) {
        toast.error('Có lỗi xảy ra khi cập nhật!');
        console.error(error);
      }
    }
    console.log('Address processed:', data);
    setIsOpen(false); // Đóng modal sau khi xử lý thành công
  } catch (error) {
    console.error('Error processing address:', error);
    toast.error('Lỗi khi xử lý địa chỉ!');
  }
  };
  
  
  return (
    <>
    <ToastContainer /> 
      <Breadcrumb pageName="Thông Tin Chung" status="Quản Trị" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <img
             src={
              imgBackgrourd ? URL.createObjectURL(imgBackgrourd) : data.imgBackgrourd
            }
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4"
            >
              <input
                id="cover"
                name="backgrourd"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'background')}
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
              <span>Edit</span>
            </label>
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full  sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-md">
              <img
                className=" border rounded-full  mx-auto    h-30 w-full max-w-30"
                src={
                  imgAvartar ? URL.createObjectURL(imgAvartar) : data.imgAvartar
                }
              />
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
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
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                    fill=""
                  />
                </svg>
                <input
                  name="imgAvartar"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'avatar')}
                  // type="file"
                  // name="profile"
                  id="profile"
                  // className="sr-only"
                />
              </label>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {data.shopName}
            </h3>

            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {data.posts}
                </span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {data.followers}
                </span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-black dark:text-white">
                  {data.following}
                </span>
                <span className="text-sm">Following</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <PhoneIcon className="h-5 w-5 mr-1" /> {data.phone}{' '}
              <MapPinIcon className="h-5 w-5 ml-3 mr-1" />{' '}
              {data.fullNameAddress}
              <button
                onClick={() => {
                  setIsOpen(true);
                }}
                // onClick={() => {
                //   setIsOpen(true);
                // }}
                className="flex cursor-pointer items-center justify-center ml-3 gap-2 rounded bg-primary px-4 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4"
              >
                <ArrowPathIcon className="text-white h-5 w-5" />
                <span>Edit</span>
              </button>
            </div>
            <div className="flex justify-center pt-2">
              <EnvelopeIcon className="h-5 w-5 mr-2 mt-0.5" />
              {data.email}

              <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-9999"
              >
                <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-semibold text-xl text-black dark:text-white">
                          Liên Hệ
                        </h3>
                      </div>
                      <form>
                        <div className="p-6.5">
                          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                              <label className="mb-2.5 block text-black dark:text-white">
                                Email
                              </label>
                              <input
                                type="text"
                                id="email"
                                placeholder="Vui lòng nhập email"
                                value={data.email}
                                onChange={handleChange}
                                required
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              />
                            </div>

                            <div className="w-full xl:w-1/2">
                              <label className="mb-2.5 block text-black dark:text-white">
                                Tỉnh, Thành Phố
                              </label>
                              <select
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                id="province"
                                value={selectedProvince.id}
                                onChange={handleProvinceChange}
                                required
                              >
                                <option value="">Chọn tỉnh/thành phố</option>
                                {provinces.map((province) => (
                                  <option
                                    key={province.ProvinceID}
                                    value={province.ProvinceID}
                                    data-name={province.ProvinceName}
                                  >
                                    {province.ProvinceName}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                              <label className="mb-2.5 block text-black dark:text-white">
                                Số Nhà, Đường
                              </label>
                              <input
                                type="text"
                                name="fullNameAddress"
                                id="fullNameAddress"
                                value={data.fullNameAddress}
                                onChange={handleChange}
                                required
                                placeholder="Số nhà, đường..."
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              />
                            </div>
                            <div className="w-full xl:w-1/2">
                              <label className="mb-2.5 block text-black dark:text-white">
                                Quận, Huyện
                              </label>
                              <select
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                id="district"
                                value={selectedDistrict.id}
                                onChange={handleDistrictChange}
                                required
                              >
                                <option value="">Chọn quận/huyện</option>
                                {districts.map((district) => (
                                  <option
                                    key={district.DistrictID}
                                    value={district.DistrictID}
                                    data-name={district.DistrictName}
                                  >
                                    {district.DistrictName}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                              <label className="mb-2.5 block text-black dark:text-white">
                                Số Điện Thoại
                              </label>
                              <input
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Vui lòng nhập số điện thoại"
                                value={data.phone}
                                onChange={handleChange}
                                required
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              />
                            </div>

                            <div className="w-full xl:w-1/2">
                              <label className="mb-2.5 block text-black dark:text-white">
                                Xã, Phường
                              </label>
                              <select
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                id="wardCode"
                                value={selectedWard.id}
                                onChange={handleWardChange}
                                required
                              >
                                <option value="">Chọn xã/phường</option>
                                {wardCode.map((ward) => (
                                  <option
                                    key={ward.WardCode}
                                    value={ward.WardCode}
                                    data-name={ward.WardName}
                                  >
                                    {ward.WardName}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            onClick={handleSave}
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                          >
                            Xác Nhận
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsOpen(false);
                            }}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          >
                            Hủy
                          </button>
                        </div>
                      </form>
                    </DialogPanel>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSeller;
