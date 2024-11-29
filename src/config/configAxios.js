import axios from 'axios';
import queryString from 'query-string';
//http://localhost:8080

// axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.baseURL = import.meta.env.VITE_API_BASEURL;

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: params => queryString.stringify(params),
});

const axiosConfigPython = axios.create({
  baseURL: import.meta.env.VITE_API_PYTHON,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: params => queryString.stringify(params),
});


const axiosInstance = axios.create({
  baseURL: 'https://api.hunter.io/v2',
  timeout: 10000, // Timeout nếu cần
});

 const verifyEmail = async (email) => {
  try {
    const response = await axiosInstance.get('/email-verifier', {
      params: { 
        email, 
        api_key: process.env.VITE_TOKEN_HUNTER // Token từ môi trường
      },
    });
    return response.data; // Trả về dữ liệu nếu thành công
  } catch (error) {
    console.error("Lỗi khi xác thực email:", error);
    return false; // Trả về false nếu lỗi
  }
};


const axiosAuth = (TOKEN, method, url, data, status) => {
  const token = sessionStorage.getItem("accessToken");
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  };
  if (TOKEN != "null") {
    headers = {
      Authorization: `Bearer ${TOKEN}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  } else {
    headers = {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${TOKEN}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    };
  }

  if (url.includes('/saveImg')) {
    headers["Content-Type"] = "multipart/form-data"; // Thay đổi Content-Type cho multipart
  } else {
    headers["Content-Type"] = "application/json"; // Giữ nguyên cho các yêu cầu JSON
  }

  return axiosConfig({
    method: method,
    headers: headers,
    url: url,
    data: data,
  });
};


const axiosAuthPython = (TOKEN, method, url, data) => {
  const token = sessionStorage.getItem("accessToken");
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  };
  if (TOKEN != "null") {
    headers = {
      Authorization: `Bearer ${TOKEN}`,
    }
  } else {
    headers = {
      "Content-Type": "multipart/form-data",
    };
  }

  return axiosConfigPython({
    method: method,
    headers: headers,
    url: url,
    data: data,
  });
};




axiosConfig.interceptors.request.use(config => {
  console.log('Request Config:', config);  // Debug the request configuration

  return config;// dataacouyy  = auh
},
  (error) => {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(response => {
  console.log('Request data:', response);  // Debug the request configuration
  return response;
},
  (error) => {
    return Promise.reject(error);
  }
);

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {                        `1`11`111`1111`11111`111111`1111111`11111111`111111111`1111111111 e //       if (error.response.status === 401 && !error.config._retry) {
//           error.config._retry = true;
//           const { data } = await axios.post('/api/v1/user/token', {
//               refreshToken: localStorage.getItem('refreshToken'),
//           });
//           localStorage.setItem('accessToken', data.accessToken);
//           axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
//           return axios(error.config);
//       }
//       return Promise.reject(error);
//   }
// );



export default axiosConfig;
export { axiosAuth, verifyEmail, axiosAuthPython };
