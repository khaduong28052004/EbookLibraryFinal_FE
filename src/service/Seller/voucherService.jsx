import axiosConfig, { axiosAuth } from "../../config/configAxios";

const createUrl = (path, params = '') => `/api/v1/seller/voucher/${path}${params}`;

const VoucherService = {
  getData: (search, page, sortBy, sortColumn, size) => axiosAuth('null', 'get', createUrl('getAll', `?account_id=${sessionStorage.getItem('id_account')}&search=${search}&page=${page}&sortBy=${sortBy}&sortColumn=${sortColumn}&size=${size}`)),
  getDataAdmin: (search, page, sortBy, sortColumn, size) => axiosAuth('', 'get', createUrl('getAllAdmin', `?search=${search}&page=${page}&sortBy=${sortBy}&sortColumn=${sortColumn}&size=${size}`)),
  create: (data) => axiosAuth('null', 'post', createUrl('create'), data),
  update: (data) => axiosAuth('null', 'post', createUrl('update'), data),
  edit: (voucher_id) => axiosAuth('null', 'get', createUrl('edit', `?voucher_id=${voucher_id}`)),
  delete: (voucher_id) => axiosAuth('null', 'delete', createUrl('delete', `?voucher_id=${voucher_id}`)),
  getDetail: (voucher_id, page, search, sortBy, sortColumn, size) => axiosAuth('null', 'get', createUrl('getDetail', `?voucher_id=${voucher_id}&page=${page}&sortBy=${sortBy}&sortColumn=${sortColumn}&search=${search}&size=${size}`))
};

export default VoucherService;
