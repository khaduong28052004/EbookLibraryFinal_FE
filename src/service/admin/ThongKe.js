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
    }

}
export default Thongke;