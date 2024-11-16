import { data } from "autoprefixer";
import { axiosAuth } from "../../config/configAxios";

const account_id = sessionStorage.getItem("id_account");

const createUrl = (path, params = '') => `/api/v1/seller/bill/${path}${params}`;
const BillService = {
    getAll: (search, page, sortBy, sortColumn) => axiosAuth('null', 'get', createUrl('getAll', `?account_id=${account_id}&search=${search}&page=${page}&sortBy=${sortBy}&sortColumn=${sortColumn}`)),
    updateOrderStatus: (data) => axiosAuth('null', 'post', createUrl('updateOrderStatus'), data),
    huy: (data, content) => axiosAuth('null', "post", createUrl("huy", `?content=${content}`), data)
};

export default BillService;