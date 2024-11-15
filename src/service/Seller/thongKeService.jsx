import { axiosAuth } from "../../config/configAxios";

const account_id = sessionStorage.getItem("id_account");

const createUrl = (path, params = '') => `/api/v1/seller/thongKe/${path}${params}`;

const ThongKeService = {
    bill: (dateStart, dateEnd, page, sortBy, sortColumn) => axiosAuth('null', 'get', createUrl('bill', `?account_id=${account_id}&dateStart=${dateStart}&dateEnd=${dateEnd}&page=${page}&sortBy=${sortBy}&sortColumn=${sortColumn}`)),
    khachHang: (search, page, sortBy, sortColumn) => axiosAuth('null', 'get', createUrl('khachHang', `?account_id=${account_id}&search=${search}&page=${page}&sortBy=${sortBy}&sortColumn=${sortColumn}`)),
    sanPham: (search, page, sortBy, sortColumn) => axiosAuth('null', 'get', createUrl('sanPham', `?account_id=${account_id}&search=${search}&page=${page}&sortBy=${sortBy}&sortColumn=${sortColumn}`))
};

export default ThongKeService;