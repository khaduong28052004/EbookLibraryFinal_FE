import axios from "axios";

const API_BASE_URL = "https://online-gateway.ghn.vn/shiip/public-api/master-data";
const API_JAVA = "http://localhost:8080/api/v1/user/rest/address";
const token = "fef32ec4-536b-11ef-9303-6e4f5409b172";

// Load provinces
export const loadProvinces = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/province`, {
      headers: {
        "Content-Type": "application/json",
        Token: token,
      },
    });
    return response.data.data; // Giả sử dữ liệu bạn cần nằm trong `response.data.data`
  } catch (error) {
    console.error("Error fetching provinces:", error.response || error.message);
    throw error;
  }
}

// Load districts
export const loadDistricts = async (provinceId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/district`, 
      { province_id: provinceId }, 
      {
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
      }
    );
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching districts:", error.response || error.message);
    throw error;
  }
}

// Load wards
export const loadWards = async (districtId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ward`, 
      { district_id: districtId }, 
      {
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
      }
    );
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching wards:", error.response || error.message);
    throw error;
  }
}

// Load address by ID
export const loadAddress = async (id) => {
  try {
    const response = await axios.get(`${API_JAVA}/fill/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching address:", error.response || error.message);
    throw error;
  }
};

// Post new address
export const postAddress = async (id, addressData) => {
  try {
    const response = await axios.post(`${API_JAVA}/create/${id}`,addressData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching addresses:", error.response || error.message);
    throw error;
  }
};

export const deleteAddress = async (id) => {
  try {
    const response = await axios.delete(`${API_JAVA}/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.message;
  } catch (error) {
    console.error("Error fetching addresses:", error.response || error.message);
    throw error;
  }
};

export const getOneAddress = async (id) => {
  try {
    const response = await axios.get(`${API_JAVA}/getOne/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching addresses:", error.response || error.message);
    throw error;
  }
};

export const putAddress = async (idAdd,addressData) => {
  
  try {
    const response = await axios.put(`${API_JAVA}/update/${idAdd}`,addressData, {
      headers: {
        "Content-Type": "application/json",
            
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching addresses:", error.response || error.message);
    throw error;
  }
};