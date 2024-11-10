import axiosConfig, { axiosAuth } from "../../config/configAxios";

const account_id = sessionStorage.getItem('id_account');

const createUrl = (path, params = '') => `/api/v1/seller/product/${path}${params}`;

const SanPhamService = {
  getAll: (search, page) => axiosAuth('null', 'get', createUrl('getAll', `?account_id=${account_id}&search=${search}&page=${page}`)),
  create: (data) => axiosAuth('null', 'post', createUrl('create'), data, true),
  update: (data) => axiosAuth('null', 'post', createUrl('update'), data, true),
  edit: (product_id) => axiosAuth('null', 'get', createUrl('edit', `?product_id=${product_id}`)),
  delete: (product_id) => axiosAuth('null', 'delete', createUrl('delete', `?product_id=${product_id}`))
};

export default SanPhamService;
