import { axiosAuth } from '../../config/configAxios';

const token = "null";

const Thongke = {
    doanhThu: ({ dateStart, dateEnd, currentPage, size, searchItem, sortColumn, sortBy }) => {
        if (sortBy == null || sortBy == undefined) {
            sortBy = '';
        } else if (sortColumn == null || sortColumn == undefined) {
            sortColumn = '';
        } else {
            sortBy = sortBy;
            sortColumn = sortColumn;
        }
        const url = `/api/v1/admin/orderstatistacal/revenue?dateStart=${dateStart}&dateEnd=${dateEnd}&search=${searchItem}&page=${currentPage}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}`;
        console.log(token);
        console.log(url);
        return axiosAuth(token, "get", url);
    },
    product: ({ dateStart, dateEnd, option, currentPage, size, searchItem, sortColumn, sortBy }) => {
        if (sortBy == null || sortBy == undefined) {
            sortBy = '';
        } else if (sortColumn == null || sortColumn == undefined) {
            sortColumn = '';
        } else {
            sortBy = sortBy;
            sortColumn = sortColumn;
        }
        const url = `/api/v1/admin/orderstatistacal/product?dateStart=${dateStart}&dateEnd=${dateEnd}&option=${option}&search=${searchItem}&page=${currentPage}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}`;
        console.log(token);
        console.log(url);
        return axiosAuth(token, "get", url);
    },
    bill: ({ dateStart, dateEnd, orderStatusId, currentPage, size, sortColumn, sortBy }) => {
        if (sortBy == null || sortBy == undefined) {
            sortBy = '';
        } else if (sortColumn == null || sortColumn == undefined) {
            sortColumn = '';
        } else {
            sortBy = sortBy;
            sortColumn = sortColumn;
        }
        const url = `/api/v1/admin/orderstatistacal/bill?dateStart=${dateStart}&dateEnd=${dateEnd}&orderStatusId=${orderStatusId}&page=${currentPage}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}`;
        console.log(token);
        console.log(url);
        return axiosAuth(token, "get", url);
    },
    khachHang: ({ dateStart, dateEnd, searchItem, option, currentPage, size, sortColumn, sortBy }) => {
        if (sortBy == null || sortBy == undefined) {
            sortBy = '';
        } else if (sortColumn == null || sortColumn == undefined) {
            sortColumn = '';
        } else {
            sortBy = sortBy;
            sortColumn = sortColumn;
        }
        const url = `/api/v1/admin/orderstatistacal/account?dateStart=${dateStart}&dateEnd=${dateEnd}&search=${searchItem}&option=${option}&page=${currentPage}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}`;
        console.log(token);
        console.log(url);
        return axiosAuth(token, "get", url);
    },
    nguoiban: ({ dateStart, dateEnd, searchItem, option, currentPage, size, sortColumn, sortBy }) => {
        if (sortBy == null || sortBy == undefined) {
            sortBy = '';
        } else if (sortColumn == null || sortColumn == undefined) {
            sortColumn = '';
        } else {
            sortBy = sortBy;
            sortColumn = sortColumn;
        }
        const url = `/api/v1/admin/orderstatistacal/seller?dateStart=${dateStart}&dateEnd=${dateEnd}&search=${searchItem}&option=${option}&page=${currentPage}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}`;
        console.log(token);
        console.log(url);
        return axiosAuth(token, "get", url);
    }

}
export default Thongke;