import { axiosAuth } from '../../config/configAxios';
// const token = sessionStorage.getItem("token");
const token = "null";
const url = (path = "", param = "") => `/api/v1/admin/chietkhau${path}${param}`

const chietKhauService = {
    findAllChietKhau: (page, size, searchItem, sortColumn, sortBy) =>
        // axiosAuth(token, "get", url("", `?search=${searchItem}&page=${page === undefined ? 0 : page}&size=${size === undefined ? 0 : size}&sortColumn=${sortColumn === undefined ? 0 : sortColumn}&sortBy=${sortBy === undefined ? 0 : sortBy}`))
        axiosAuth(token, "get", url("", `?search=${searchItem}&page=${page === undefined ? 0 : page}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}`))
    ,
    findById: (id) =>
        axiosAuth(token, "get", url("", `?id=${id}`))
    ,
    post: (data) => axiosAuth(token, "post", url("", `?accountID=${sessionStorage.getItem("id_account")}`), data),
    put: (data) => axiosAuth(token, "put", url("", `?accountID=${sessionStorage.getItem("id_account")}`), data),
    delete: (id) => axiosAuth(token, "delete", url("", `?&id=${id}&accountID=${sessionStorage.getItem("id_account")}`))

}
export default chietKhauService;
