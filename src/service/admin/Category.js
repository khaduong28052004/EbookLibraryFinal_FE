import { axiosAuth } from '../../config/configAxios';

// const token = sessionStorage.getItem("token");
const token = "null";
const url = (path = "", param = "") => `/api/v1/admin/category${path}${param}`

const category = {
    findAllCategory: ({ page, size, searchItem, sortColumn, sortBy }) =>
        axiosAuth(token, "get", url("", `?&search=${searchItem}&page=${page === undefined ? 0 : page}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}`))
    ,
    findAllCategoryByIdParent: ({ idParent }) =>
        axiosAuth(token, "get", url("/getListByIdParent", `?&idParent=${idParent}`))
    ,
    post: ({ data }) => axiosAuth(token, "post", url("", ""), data)
    ,
    put: ({ data }) => axiosAuth(token, "put", url("", `?accountID=${sessionStorage.getItem("id_account")}`), data)
    ,
    delete: ({ id }) => axiosAuth(token, "delete", url("", `?accountID=${sessionStorage.getItem("id_account")}&id=${id}`))
}
export default category;