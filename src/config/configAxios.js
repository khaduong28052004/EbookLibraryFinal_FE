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


const axiosAuth = (TOKEN, method, url, data) => {
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

  //  "Content-Type": "multipart/form-data",
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




axiosConfig.interceptors.request.use(config => {
  console.log('Request Config:', config);  // Debug the request configuration

  return config;// dataacouyy  = auh
},
  (error) => {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(config => {
  console.log('Request data:', config);  // Debug the request configuration
  return config;
},
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;
export { axiosAuth };
