import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import {
    loadProvinces,
    loadDistricts,
    loadWards,
    postAddress,
    putAddress,
    getOneAddress,
} from "../../../../service/addressService";
const ModelAddress = ({ isVisible, onClose, data, editingAddressId }) => {
    const accountId = localStorage.getItem('accountId'); // ID của tài khoản đăng nhập
    const [addresses, setAddresses] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wardCode, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState({
        id: "",
        name: "",
    });
    const [selectedDistrict, setSelectedDistrict] = useState({
        id: "",
        name: "",
    });
    const [selectedWard, setSelectedWard] = useState({ id: "", name: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [addressData, setAddressData] = useState({
        id: null,
        status: false, // trang tái của địa chỉ mặt định có được tích không
        phone: "",
        nameAddress: "",
        fullNameAddress: "", // tên đường cộng với data-name (commune), data-name (district), data-name (province)
        province: "", // lưu id của nó
        district: "", // lưu id của nó
        commune: "", // lưu id của nó
        wardCode: "",
        background: "",
        avatar: "",
        street: "",
    });
    const fetchAddresses = async () => {
        const id = sessionStorage.getItem("id_account") || 1;
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/user/rest/address/fill/${id}`, {
                params: { accountId }
            });
            setAddresses(response.data.data);
        } catch (error) {
            if (error.response) {
                // Lỗi phản hồi từ server (như 404, 500)
                console.error("Server responded with an error:", error.response.data);
                console.error("Status code:", error.response.status);
            } else if (error.request) {
                // Không nhận được phản hồi từ server
                console.error("No response received from the server:", error.request);
            } else {
                // Lỗi phát sinh trong quá trình thiết lập yêu cầu
                console.error("Error setting up the request:", error.message);
            }
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchAddresses();
    }, []);
    useEffect(() => {
        const fetchProvinces = async () => {
            setLoading(true);
            setError("");
            try {
                const provincesData = await loadProvinces();
                setProvinces(provincesData);
                console.log(provincesData);
            } catch (error) {
                setError("Failed to load provinces. Please try again.");
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
                setError("");
                try {
                    const districtsData = await loadDistricts(
                        parseInt(selectedProvince.id, 10)
                    );
                    setDistricts(districtsData);
                    console.log(districtsData);
                } catch (error) {
                    setError("Failed to load districts. Please try again.");
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
                setError("");
                try {
                    const wardsData = await loadWards(parseInt(selectedDistrict.id, 10));
                    setWards(wardsData);
                    console.log(wardsData);
                } catch (error) {
                    setError("Failed to load wards. Please try again.");
                } finally {
                    setLoading(false);
                }
            } else {
                setWards([]);
            }
        };
        fetchWards();
    }, [selectedDistrict]);
    // Update addressData with selected province, district, and ward
    useEffect(() => {
        setAddressData((prevData) => ({
            ...prevData,
            province: selectedProvince.id,
            district: selectedDistrict.id,
            wardCode: selectedWard.id,
        }));
    }, [
        selectedProvince,
        selectedDistrict,
        selectedWard,
    ]);
    const handleSave = async (event) => {
        if (!addressData.phone || addressData.phone.trim() === "") {
            toast.error("Vui lòng nhập số điện thoại!");
            return;
        }
        if (!addressData.province || addressData.province === "default") {
            toast.error("Vui lòng chọn Tỉnh/Thành Phố!");
            return;
        }
        if (!addressData.district || addressData.district === "default") {
            toast.error("Vui lòng chọn Quận/Huyện!");
            return;
        }
        if (!addressData.wardCode || addressData.wardCode === "default") {
            toast.error("Vui lòng chọn Xã/Phường!");
            return;
        }
        event.preventDefault();
        const id = sessionStorage.getItem("id_account") || 1;
        try {
            let data;
            if (addressData.id) {
                // const fullNameAddress = `${addressData.fullNameAddress}`;
                const fullNameAddress = [
                    addressData.street,
                    selectedWard?.name,
                    selectedDistrict?.name,
                    selectedProvince?.name
                ]
                    .filter((part) => part && part.trim() !== '') // Loại bỏ các phần tử null/undefined/rỗng
                    .join(', '); // Ghép lại thành chuỗi                // Tạo một bản sao của addressData và cập nhật fullNameAddress
                const updatedAddressData = {
                    ...addressData,
                    fullNameAddress: fullNameAddress,  // Cập nhật fullNameAddress vào bản sao
                };
                // Cập nhật địa chỉ
                try {
                    const data = await putAddress(id, updatedAddressData);
                    toast.success("Cập nhật địa chỉ thành công");
                } catch (error) {
                    toast.error("Có lỗi xảy ra khi cập nhật địa chỉ");
                }
            } else {
                // Creating new address
                const fullNameAddress = `${addressData.street},${selectedWard.name}, ${selectedDistrict.name}, ${selectedProvince.name}`;
                // Tạo một bản sao của addressData và cập nhật fullNameAddress
                const postAddressData = {
                    ...addressData,
                    fullNameAddress: fullNameAddress,  // Cập nhật fullNameAddress vào bản sao
                };
                // Cập nhật địa chỉ
                try {
                    data = await postAddress(id, postAddressData);
                    toast.success("Lưu địa chỉ thành công");
                } catch (error) {
                    toast.error("Có lỗi xảy ra khi cập nhật địa chỉ");
                }
            }
            console.log("Address processed:", data);
            fetchAddresses(); // Refresh the addresses list after operation
            onClose(); // Close the modal
        } catch (error) {
            console.error("Error processing address:", error);
            toast.error("Lỗi khi xử lý địa chỉ");
        }
    };

    useEffect(() => {
        const fetchAddressData = async () => {
            if (editingAddressId) {
                try {
                    const data = await getOneAddress(editingAddressId);
                    setAddressData((prevData) => ({
                        ...prevData,
                        ...data, // cập nhật đầy đủ dữ liệu từ API
                    }));
                    setSelectedProvince({ id: data.province, name: data.provinceName });
                    setSelectedDistrict({ id: data.district, name: data.districtName });
                    setSelectedWard({ id: data.wardCode, name: data.wardsName });
                    console.log("Tải dữ liệu chỉnh sửa thành công");
                } catch (error) {
                    console.log("Lỗi khi tải dữ liệu chỉnh sửa");
                }
            }
        };
        fetchAddressData();
    }, [editingAddressId]);


    const handleChange = (e) => {
        const { id, value } = e.target;
        setAddressData((prevData) => ({
            ...prevData,
            [id]: value,

        }));
    };
    const handleProvinceChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        setSelectedProvince({
            id: selectedOption.value,
            name: selectedOption.getAttribute("data-name"),
        });
    };
    const handleDistrictChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        setSelectedDistrict({
            id: selectedOption.value,
            name: selectedOption.getAttribute("data-name"),
        });
    };
    const handleWardChange = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        setSelectedWard({
            id: selectedOption.value,
            name: selectedOption.getAttribute("data-name"),
        });
    };
    if (!isVisible) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[600px] flex flex-col">
                <button
                    className="text-white text-xl place-self-end mb-1"
                    onClick={onClose}
                >
                    X
                </button>
                <div className="bg-white p-2 rounded">
                    <div>
                        <h2 className="p-2.5 font-bold text-lg">Địa Chỉ</h2>
                        <hr className="border-gray-500" />
                    </div>
                    <div className="p-2.5">
                        {loading && <p>Loading...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-6">
                                <label className="text-base" htmlFor="phone">
                                    Số điện thoại
                                </label>
                                <input
                                    className="my-2 placeholder-gray-500 border border-gray-400 rounded-sm p-2 w-full"
                                    type="text"
                                    id="phone"
                                    placeholder="Vui lòng nhập số điện thoại"
                                    value={addressData.phone}
                                    onChange={handleChange}
                                    required

                                />
                            </div>
                            <div className="col-span-6">
                                <label className="text-base" htmlFor="fullNameAddress">
                                    Số nhà/Đường
                                </label>
                                <input
                                    className="my-2 placeholder-gray-500 border border-gray-400 rounded-sm p-2 w-full"
                                    type="text"
                                    id="street"
                                    placeholder="Vui lòng nhập số nhà/đường"
                                    value={addressData.street}
                                    onChange={handleChange}
                                    required
                                />
                            </div>



                            <div className="col-span-6">
                                <label className="text-base" htmlFor="province">
                                    Tỉnh/Thành Phố
                                </label>
                                <select
                                    className="my-2 placeholder-gray-500 border border-gray-400 rounded-sm p-2 w-full"
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
                            <div className="col-span-6">
                                <label className="text-base" htmlFor="district">
                                    Quận/Huyện
                                </label>
                                <select
                                    className="my-2 placeholder-gray-500 border border-gray-400 rounded-sm p-2 w-full"
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
                            <div className="col-span-12">
                                <label className="text-base" htmlFor="wardCode">
                                    Xã/Phường
                                </label>
                                <select
                                    className="my-2 placeholder-gray-500 border border-gray-400 rounded-sm p-2 w-full"
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
                        <div className="flex justify-end mt-2">
                            <button
                                className="w-[150px] h-[35px] rounded text-white text-[15px]  
                            px-2 py-0 border bg-[#003EA1] transition-all duration-500 ease-in-out hover:opacity-90  mb-5"
                                onClick={handleSave}
                            >
                                Lưu địa chỉ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ModelAddress;