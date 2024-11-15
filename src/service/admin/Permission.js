import { axiosAuth } from '../../config/configAxios';

// const token = sessionStorage.getItem("token");
const token = "null";

const permission = {
    findAllByRole: ({ currentPage, size, role, searchItem, sortColumn, sortBy }) => {
        const url = `/api/v1/admin/permission?role=${role}&search=${searchItem}&page=${currentPage}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}`;
        console.log(token);
        return axiosAuth(token, "get", url);
    },
    findlAllNotRole: ({ currentPage, size, role, sortColumn, sortBy }) => {
        const url = `/api/v1/admin/permission?role=${role}&page=${currentPage}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}`;
        console.log(token);
        return axiosAuth(token, "get", url);
    },
    findById: ({ id }) => {
        const url = `/api/v1/admin/permission?id=${id}`;
        console.log(token);
        return axiosAuth(token, "get", url);
    }
}
export default permission;