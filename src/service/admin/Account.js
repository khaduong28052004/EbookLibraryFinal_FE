import { axiosAuth } from '../../config/configAxios';

// const token = sessionStorage.getItem("token");
const token = "null";

const accountService = {
//adminv1 - user - seller
    findAllAccount: ({ currentPage, size, role, searchItem, gender, sortColumn, sortBy }) => {
        const url = `/api/v1/admin/account?role=${role}&search=${searchItem}&gender=${gender}&page=${currentPage}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}`;
        console.log(token);
        return axiosAuth(token, "get", url);
    },
//seller
    findAllSellerBrowse: ({ currentPage, size, searchItem, gender, sortColumn, sortBy }) => {
        const url = `/api/v1/admin/account/seller/browse?search=${searchItem}&gender=${gender}&page=${currentPage}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}`;
        console.log(token);
        return axiosAuth(token, "get", url);
    },
//adminv1
    post: ({ data }) => {
        const url = `/api/v1/admin/account/adminv1`;
        console.log(token);
        return axiosAuth(token, "post", url, data);
    },
//user
    putStatus: ({ id }) => {
        const url = `/api/v1/admin/account?id=${id}`;
        console.log(token);
        return axiosAuth(token, "put", url);
    },

    putActive: ({ id }) => {
        const url = `/api/v1/admin/account/seller/browse?id=${id}`;
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
