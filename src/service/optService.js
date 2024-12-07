import { Axios } from "axios";
import axiosConfig, { axiosAuth } from "../config/configAxios";


const otpService = {
  login: ({ username, password }) => {
    const url = "/api/v1/login";
    return axiosAuth("null", "post", url, { username, password });
  },


  otpV2: (data) => {
    console.log("trong đây nè:", data);
    // console.log(methodopt);
    const url = "/api/v1/user/send-otpe";
    return axiosAuth("null", "post", url, data);
    // return;
  },

  registerV2: (data, otp) => {
    // http://localhost:8080/api/v2/user/register?otp=773117
    // const url = `/api/v2/user/register?otp=${encodeURIComponent(otp)}&email=${encodeURIComponent(email)}`;   //&email=${encodeURIComponent(email)}
    const url = `/api/v2/user/register?otp=${encodeURIComponent(otp)}`;
    return axiosAuth("null", "POST", url, data);
  },

  UpdatePass: (id, repass, oldpass) => {
    const url = `/api/v1/user/updatePass?id=${encodeURIComponent(id)}&repass=${encodeURIComponent(repass)}&oldpass=${encodeURIComponent(oldpass)}`;
    return axiosAuth("null", "post", url);
  },

};

export default otpService;