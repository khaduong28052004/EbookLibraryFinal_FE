import { axiosAuth } from '../../config/configAxios';

// const token = sessionStorage.getItem("token");
const token = "null";

const accountService = {
    //adminv1 - user - seller đã duyệt
    findAllAccount: ({ currentPage, size, role, searchItem, gender, sortColumn, sortBy }) => {
        const url = `/api/v1/admin/account?role=${role}&search=${searchItem}&gender=${gender}&page=${currentPage}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}`;
        console.log(token);
        return axiosAuth(token, "get", url);
    },
    //seller
    findAllSellerNotBrowse: ({ currentPage, size, searchItem, gender, sortColumn, sortBy }) => {
        const url = `/api/v1/admin/account/seller/notbrowse?search=${searchItem}&gender=${gender}&page=${currentPage}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}`;
        console.log(token);
        return axiosAuth(token, "get", url);
    },
    //adminv1
    post: ({ data }) => {
        const url = `/api/v1/admin/account/adminv1`;
        console.log(token);
        return axiosAuth(token, "post", url, data);
    },
    //user - seller
    putStatus: ({ id }) => {
        const url = `/api/v1/admin/account?id=${id}`;
        console.log(token);
        return axiosAuth(token, "put", url);
    },
    //seller
    putActive: ({ id, status }) => {
        const url = `/api/v1/admin/account/seller/browse?id=${id}&status=${status}`;
        console.log(token);
        return axiosAuth(token, "put", url);
    },
    // adminv1
    delete: ({ id }) => {
        const url = `/api/v1/admin/account?id=${id}`;
        console.log(token);
        return axiosAuth(token, "put", url);
    },
}
export default accountService;
