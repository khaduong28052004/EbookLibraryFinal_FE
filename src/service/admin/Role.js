import { axiosAuth } from '../../config/configAxios';

// const token = sessionStorage.getItem("token");
const token = "null";
const url = (path = "", param = "") => `/api/v1/admin/role${path}${param}`;

const role = {
    findAllRoleNhanVien: ({ page, size, searchItem, sortColumn, sortBy }) => axiosAuth(token, "get", url("", `?search=${searchItem}&page=${page === undefined ? 0 : page}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}`)),
    findAllRoleNotNhanVien: () => axiosAuth(token, "get", url("/listnotnhanvien", "")),
    post: ({ data }) => axiosAuth(token, "post", url("", ""), data),
    put: ({ data }) => axiosAuth(token, "put", url("", ""), data),
    delete: ({ id }) => axiosAuth(token, "delete", url("", `?id=${id}`)),
}
export default role;