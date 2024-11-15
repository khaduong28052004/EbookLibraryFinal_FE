import axiosConfig, { axiosAuth } from "../../config/configAxios";

const account_id = sessionStorage.getItem('id_account');

const createUrl = (path, params = '') => `/api/v1/seller/evalue/${path}${params}`;

const HomeService = {
  getData: (search, page, sortBy, sortColumn) => axiosAuth('null', 'get', createUrl('getAll', `?account_id=${account_id}&search=${search}&page=${page}&sortBy=${sortBy}&sortColumn=${sortColumn}`)),
  phanHoi: (data) => axiosAuth('null', 'post', createUrl('phanHoi'), data),
};

export default HomeService;
