import { Axios } from "axios";
import axiosConfig,{axiosAuth} from "../config/configAxios";


const AuthService = {
  login: ({ username, password }) => {
    const url = "/api/v1/login";
    return axiosAuth("null", "post", url, { username, password });
  },

  dangky: ({ username, password }) => {
    const url = "/api/v1/register"; // Update if the endpoint is for registration
    return axiosAuth("", "post", url, { username, password });
  },
  GoogleLogin: (email)=>{
    const url = "/api/v1/user/loginGoogle";
    return  axiosAuth("","post",url, email);
  },
  setItem: (response) => {
    // Tạo đối tượng user từ các thuộc tính của response
    const user = {
      username: response.username || null,
      id_account: response.id_account,
      avatar: response.avatar,
      roles: response.roles,
    };
    // Lưu riêng token
    sessionStorage.setItem("token", response.accessToken);
    // const token = sessionStorage.getItem("token");
    sessionStorage.setItem("id_account", response.id_account);
    // Lưu user dưới dạng chuỗi JSON
    sessionStorage.setItem("user", JSON.stringify(user));
    return;
  },
  logout: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    return;
  },
  getItem: (key) => {
    const data = sessionStorage.getItem(key);
    return data;
  },
  register: (data) => {
    const url = "/api/v1/user/register";
    return axiosAuth("", "post", url, data);
  },
  UpdatePass: (id, repass, oldpass) => {
    const url = `/api/v1/user/updatePass?id=${encodeURIComponent(id)}&repass=${encodeURIComponent(repass)}&oldpass=${encodeURIComponent(oldpass)}`;
    return axiosAuth("null", "post", url);
  },
  Otp: ({email}) => {
    const url = "/api/v1/otp/generate";
    return axiosAuth("null", "post", url,{email});
  },
  verifyOTP: (data) => {
    const url = "/api/v1/otp/verify";
    return axiosAuth("null", "post", url,data);
  },


  
};

export default AuthService;