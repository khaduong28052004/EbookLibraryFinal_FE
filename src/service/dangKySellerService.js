import axios from 'axios';

const API_CHECK_CARDID = 'https://api.fpt.ai/vision/idr/vnm';
const API_Java = 'http://103.72.99.71:8000/api/v1/user/registerSeller';
const API_KEY = 'aOL8KstO8whE27tr8Wv1SLqTPMfHXVpB';
export const fetchCheckImgCard = async (image) => { // để gọi API
  try {
    const response = await axios.post(API_CHECK_CARDID, image, { // Gửi yc post image lên api
      headers: {
        'api-key': API_KEY,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error fetching cardid:', error.response || error.message);
  }
};

export const fetchRegisterSell = async (id, accountData) => {
  try {
    const response = await axios.put(`${API_Java}/${id}`, accountData, {});
    console.log('hsh' + response);
    return response.data;
  } catch (error) {
    console.error('Error fetching cardid:', error.response || error.message);
    throw error;
  }
};

export const uploadImages = async (id, formData) => {
  try {
    const response = await axios.post(`${API_Java}/uploadImg/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading images:', error.response || error.message);
    throw error;
  }
};
export const uploadImages1 = async (id, formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/user/saveImg/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading images:', error.response || error.message);
    throw error;
  }
};

export const uploadImageAvt = async (id, formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/user/uploadAvatar/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading images:', error.response || error.message);
    throw error;
  }
};

export const uploadImageBR = async (id, formData) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/user/uploadBackground/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading images:', error.response || error.message);
    throw error;
  }
};

export const getSeller = async (id) => {
  try {
    const response = await axios.get(`${API_Java}/${id}`, {});
    return response.data;
  } catch (error) {
    console.error('Error getSellerL ', error.response || error.message);
    throw error;
  }
};
// Thêm hàm kiểm tra CCCD trong cơ sở dữ liệu
export const checkCCCDInDatabase = async (numberId) => {
  try {
    const response = await axios.get(`${API_Java}/check-cccd/${numberId}`);
    console.log('API Response:', response.data); // Log phản hồi để kiểm tra
    return response.data.exists; // Giả sử API trả về { exists: true/false }
  } catch (error) {
    console.error(
      'Error checking CCCD in database:',
      error.response ? error.response.data : error.message,
    );
    throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
  }
};

export const checkFaceAi = async (formData) => {
  try {

    const response = await axios.post(
      'https://api.fpt.ai/dmp/liveness/v3',
      formData,
      {
        headers: {
          'api-key': '3CT6PAFJr8llQf1jZZTAOitFpWEz370K',
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response; 
  } catch (error) {
    console.log(error);
  }
};
// F8hVeJrRG1wr8TJEEyTw5MTB0kFNmo3o