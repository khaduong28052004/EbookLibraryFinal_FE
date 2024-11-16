import axios from "axios";

const API_CHECK_CARDID = "https://api.fpt.ai/vision/idr/vnm";
const API_Java = "http://localhost:8080/api/v1/user/registerSeller";
const API_KEY = "fuQcjc2PpqcvT7N1QNLo0mcOkoB1MMoX";
export const fetchCheckImgCard = async (image) => {
    try {
        const response = await axios.post(API_CHECK_CARDID, image, {
            headers: {
                "api-key": API_KEY, 
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching cardid:", error.response || error.message);
    }
};

export const fetchRegisterSell = async (id, accountData) => {
    try {
        const response = await axios.put(`${API_Java}/${id}`, accountData, {});
        console.log("hsh" + response)
        return response.data;
    } catch (error) {
        console.error("Error fetching cardid:", error.response || error.message);
        throw error;
    }
};

export const uploadImages = async (id, formData) => {
    try {
        const response = await axios.post(`${API_Java}/uploadImg/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading images:", error.response || error.message);
        throw error;
    }
};
export const uploadImages1 = async (id, formData) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/v1/user/saveImg/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading images:", error.response || error.message);
        throw error;
    }
};
export const getSeller = async (id) => {
    try {
        const response = await axios.get(`${API_Java}/${id}`, {
        });
        return response.data;
    } catch (error) {
        console.error("Error getSellerL ", error.response || error.message);
        throw error;
    }
}
// Thêm hàm kiểm tra CCCD trong cơ sở dữ liệu
export const checkCCCDInDatabase = async (numberId) => {
    try {
        const response = await axios.get(`${API_Java}/check-cccd/${numberId}`);
        console.log("API Response:", response.data); // Log phản hồi để kiểm tra
        return response.data.exists; // Giả sử API trả về { exists: true/false }
    } catch (error) {
        console.error("Error checking CCCD in database:", error.response ? error.response.data : error.message);
        throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
    }
};