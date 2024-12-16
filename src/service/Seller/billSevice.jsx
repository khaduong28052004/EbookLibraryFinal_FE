import { data } from "autoprefixer";
import { axiosAuth } from "../../config/configAxios";


const createUrl = (path, params = '') => `/api/v1/seller/bill/${path}${params}`;
const BillService = {
    getAll: (search, page, sortBy, sortColumn, size) => axiosAuth('null', 'get', createUrl('getAll', `?account_id=${sessionStorage.getItem("id_account")}&search=${search}&page=${page}&sortBy=${sortBy}&sortColumn=${sortColumn}&size=${size}`)),
    updateOrderStatus: (data) => axiosAuth('null', 'post', createUrl('updateOrderStatus'), data),
    huy: (data, content) => axiosAuth('null', "post", createUrl("huy", `?content=${content}`), data)
};

export default BillService;