import { axiosAuth } from "../../config/configAxios";

const account_id = sessionStorage.getItem('id_account');

const createUrl = (path, params = '') => `/api/v1/seller/shop/${path}${params}`;

const ShopService = {
  get: () => axiosAuth('null', 'get', createUrl('get',`?account_id=${account_id}`)),
  update: (data) => axiosAuth('null', 'post', createUrl('update'), data),
  saveImg: (data) => axiosAuth('null', 'post', createUrl('create/saveImg', `?product_id=${idProduct}`), data),
};

export default ShopService;
