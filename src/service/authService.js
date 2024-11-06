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
};

export default AuthService;