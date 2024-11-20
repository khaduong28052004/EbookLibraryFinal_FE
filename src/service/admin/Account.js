import { axiosAuth } from '../../config/configAxios';
// const token = sessionStorage.getItem("token");
const token = "null";
const url = (path = "", param = "") => `/api/v1/admin/account${path}${param}`

const accountService = {
    //adminv1 - user - seller đã duyệt
    findAllAccount: ({ page, size, role, searchItem, sortColumn, sortBy }) => 
        axiosAuth(token, "get", url("", `?role=${role}&search=${searchItem}&page=${page === undefined ? 0 : page}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}&gender=`))
    ,    //seller
    findAllSellerNotBrowse: ({ page, size, searchItem, sortColumn, sortBy }) => 
        axiosAuth(token, "get", url("/seller/notbrowse", `?search=${searchItem}&page=${page === undefined ? 0 : page}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}&gender=`)),
    //adminv1
    post: ({ data }) => axiosAuth(token, "post", url("/adminv1"), data),
    //user - seller
    putStatus: ({ id }) => axiosAuth(token, "put", url("", `?id=${id}`)),
    //seller
    putActive: ( id, status ) => axiosAuth(token, "put", url("/seller/browse", `?id=${id}&status=${status}`)),
    // adminv1
    // delete: ({ id }) => axiosAuth(token, "put", url("", `?id=${id}`)),
    findAllAccountReport: ({ page, size, searchItem, sortColumn, sortBy }) => {
        const url =`/api/v1/admin/report/account?search=${searchItem}&page=${page === undefined ? 0 : page}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}&gender=`;
        return axiosAuth(token, "get", url);
    }

}
export default accountService;
