import axiosConfig, { axiosAuth } from "../../config/configAxios";

const account_id = sessionStorage.getItem('id_account');

const createUrl = (path, params = '') => `/api/v1/seller/product/${path}${params}`;

const SanPhamService = {
  getAll: (search, page, sortBy, sortColumn) => axiosAuth('null', 'get', createUrl('getAll', `?account_id=${account_id}&search=${search}&page=${page}&sortBy=${sortBy}&sortColumn=${sortColumn}`)),
  create: (data) => axiosAuth('null', 'post', createUrl('create'), data),
  createSaveImg: (formData) => axiosAuth('null', 'post', createUrl('create/saveImg'), formData, true),
  updateSaveImg: (formData) => axiosAuth('null', 'post', createUrl('update/saveImg'), formData, true),
  update: (data) => axiosAuth('null', 'post', createUrl('update'), data),
  edit: (product_id) => axiosAuth('null', 'get', createUrl('edit', `?product_id=${product_id}`)),
  delete: (product_id) => axiosAuth('null', 'delete', createUrl('delete', `?product_id=${product_id}`))
};

export default SanPhamService;
