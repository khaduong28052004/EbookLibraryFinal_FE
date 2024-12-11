import { axiosAuth } from '../../config/configAxios';

// const token = sessionStorage.getItem("token");
const url = (path = "", param = "") => `/api/v1/admin/product${path}${param}`

const token = "null";
const product = {
    findAllProduct: ({ searchItem, option, page, size, sortColumn, sortBy }) => axiosAuth(token, "get", url("", `?search=${searchItem}&option=${option}&page=${page = undefined ? 0 : page}&size=${size}&sortBy=${sortBy}&sortColumn=${sortColumn}`)),
    putStatus: ({ id, contents }) => axiosAuth(token, "put", url("", `?id=${id}&contents=${contents}&accountID=${sessionStorage.getItem("id_account")}`)),
    putActive: (id, status, contents) => axiosAuth(token, "put", url("/browse", `?id=${id}&status=${status}&contents=${contents}&accountID=${sessionStorage.getItem("id_account")}`)),
    findAllProductReport: ({ option, page, size, searchItem, sortColumn, sortBy }) => {
        const url = `/api/v1/admin/report/product?option=${option}&search=${searchItem}&page=${page === undefined ? 0 : page}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}&gender=`;
        return axiosAuth(token, "get", url);
    },
    putStatusProductReport: ({ id, contents }) => axiosAuth(token, "put", `/api/v1/admin/report/product?id=${id}&contents=${contents}&accountID=${sessionStorage.getItem("id_account")}`),

}
export default product;