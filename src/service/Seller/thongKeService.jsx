import { axiosAuth } from "../../config/configAxios";

const createUrl = (path, params = '') => `/api/v1/seller/thongKe/${path}${params}`;

const ThongKeService = {
    bill: (dateStart, dateEnd, page, sortBy, sortColumn,size) => axiosAuth('null', 'get', createUrl('bill', `?account_id=${sessionStorage.getItem('id_account')}&dateStart=${dateStart}&dateEnd=${dateEnd}&page=${page}&sortBy=${sortBy}&sortColumn=${sortColumn}&size=${size}`)),
    khachHang: (search, page, sortBy, sortColumn, size) => axiosAuth('null', 'get', createUrl('khachHang', `?account_id=${sessionStorage.getItem('id_account')}&search=${search}&page=${page}&sortBy=${sortBy}&sortColumn=${sortColumn}&size=${size}`)),
    sanPham: (search, page, sortBy, sortColumn, size) => axiosAuth('null', 'get', createUrl('sanPham', `?account_id=${sessionStorage.getItem('id_account')}&search=${search}&page=${page}&sortBy=${sortBy}&sortColumn=${sortColumn}&size=${size}`))
};

export default ThongKeService;