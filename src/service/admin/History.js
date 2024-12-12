import { axiosAuth } from '../../config/configAxios';

// const token = sessionStorage.getItem("token");
const url = (path = "", param = "") => `/api/v1/admin/log${path}${param}`

const token = "null";
const history = {
    findAllHistory: ({ searchItem, AccountID, page, size, sortColumn, sortBy }) => axiosAuth(token, "get", url("", `?search=${searchItem}&AccountID=${AccountID}&page=${page = undefined ? 0 : page}&size=${size}&sortBy=${sortBy}&sortColumn=${sortColumn}`)),
}
export default history;