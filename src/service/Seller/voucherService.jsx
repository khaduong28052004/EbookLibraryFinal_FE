import axiosConfig, { axiosAuth } from "../../config/configAxios";

const account_id = sessionStorage.getItem('id_account');

const createUrl = (path, params = '') => `/api/v1/seller/voucher/${path}${params}`;

const VoucherService = {
  getData: (search, page, sortBy, sortColumn) => axiosAuth('null', 'get', createUrl('getAll', `?account_id=${account_id}&search=${search}&page=${page}&sortBy=${sortBy}&sortColumn=${sortColumn}`)),
  create: (data) => axiosAuth('null', 'post', createUrl('create'), data),
  update: (data) => axiosAuth('null', 'post', createUrl('update'), data),
  edit: (voucher_id) => axiosAuth('null', 'get', createUrl('edit', `?voucher_id=${voucher_id}`)),
  delete: (voucher_id) => axiosAuth('null', 'delete', createUrl('delete', `?voucher_id=${voucher_id}`)),
  getDetail: (voucher_id, page, search, sortBy, sortColumn) => axiosAuth('null', 'get', createUrl('getDetail', `?voucher_id=${voucher_id}&page=${page}&sortBy=${sortBy}&sortColumn=${sortColumn}&search=${search}`))
};

export default VoucherService;
