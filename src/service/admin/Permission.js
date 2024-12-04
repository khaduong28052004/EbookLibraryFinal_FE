import { axiosAuth } from '../../config/configAxios';

// const token = sessionStorage.getItem("token");
const token = "null";
const url = (path = "", param = "") => `/api/v1/admin/permission${path}${param}`

const permission = {
    findAllByRole: ({ page, size, role, searchItem, sortColumn, sortBy }) => axiosAuth(token, "get", url("", `?role=${role}&search=${searchItem}&page=${page}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}`)),
    findlAllNotRole: ({ page, size, role, searchItem, sortColumn, sortBy }) => axiosAuth(token, "get", url("/notrole", `?role=${role}&search=${searchItem}&page=${page}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}`)),
    findById: ({ id }) => axiosAuth(token, "get", url("", `?id=${id}`)),
}
export default permission;