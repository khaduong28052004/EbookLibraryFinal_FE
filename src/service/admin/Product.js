import { axiosAuth } from '../../config/configAxios';

// const token = sessionStorage.getItem("token");
const url = (path = "", param = "") => `/api/v1/admin/product${path}${param}`

const token = "null";
const product = {
    findAllProduct: ({ searchItem, option, page, size, sortColumn, sortBy }) => axiosAuth(token, "get", url("", `?search=${searchItem}&option=${option}&page=${page = undefined ? 0 : page}&size=${size}&sortBy=${sortBy}&sortColumn=${sortColumn}`)),
    putStatus: ({ id }) => axiosAuth(token, "put", url("", `?id=${id}`)),
    putActive: ( id, status ) => axiosAuth(token, "put", url("/browse", `?id=${id}&status=${status}`)),
}
export default product;