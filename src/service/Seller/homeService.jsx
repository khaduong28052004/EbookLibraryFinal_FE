import axiosConfig, { axiosAuth } from "../../config/configAxios";

const account_id = sessionStorage.getItem('id_account');

const createUrl = (path, params = '') => `/api/v1/seller/home/${path}${params}`;

const HomeService = {
  getData: (year) => axiosAuth('null', 'get', createUrl('getData', `?account_id=${account_id}&year=${year}`)),
  getYears: () => axiosAuth('null', 'get', createUrl('getYears', `?account_id=${account_id}`)),
};

export default HomeService;
