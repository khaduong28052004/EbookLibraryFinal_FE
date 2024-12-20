import axiosConfig, { axiosAuth } from "../../config/configAxios";

const createUrl = (path, params = '') => `/api/v1/seller/product/${path}${params}`;

const SanPhamService = {
  getAll: (search, page, sortBy, sortColumn, size) => axiosAuth('null', 'get', createUrl('getAll', `?account_id=${sessionStorage.getItem('id_account')}&search=${search}&page=${page}&sortBy=${sortBy}&sortColumn=${sortColumn}&size=${size}`)),
  create: (data) => axiosAuth('null', 'post', createUrl('create'), data),
  createSaveImg: (idProduct, formData) => axiosAuth('null', 'post', createUrl('create/saveImg', `?product_id=${idProduct}`), formData),
  updateSaveImg: (idProduct, formData) => axiosAuth('null', 'post', createUrl('update/saveImg', `?product_id=${idProduct}`), formData),
  update: (data) => axiosAuth('null', 'post', createUrl('update'), data),
  edit: (product_id) => axiosAuth('null', 'get', createUrl('edit', `?product_id=${product_id}`)),
  delete: (product_id) => axiosAuth('null', 'delete', createUrl('delete', `?product_id=${product_id}`))
};

export default SanPhamService;
