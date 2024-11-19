import { axiosAuth } from '../../config/configAxios';

const token = "null";
// const token = sessionStorage.getItem("token");
const url = (path = "", param = "") => `/api/v1/admin/flashsale${path}${param}`

const flashSale = {
    findAllFlashSale: ({ dateStart, dateEnd, currentPage, size, sortColumn, sortBy }) => axiosAuth(token, "get", url("", `?dateStart=${dateStart}&dateEnd=${dateEnd}&page=${currentPage === undefined ? 0 : currentPage}&size=${size}&sortBy=${sortBy}&sortColumn=${sortColumn}`)),
    findListByIdParent: ({ id }) => {
        const url = `/api/v1/admin/category/getListByIdParent?idParent=${id}`;
        console.log(token);
        return axiosAuth(token, "get", url);
    },
    findById: ({ id }) => {
        const url = `/api/v1/admin/flashsale?id=${id}`;
        console.log(token);
        return axiosAuth(token, "get", url);
    },
    post: ({ data }) => {
        const url = `/api/v1/admin/flashsale`;
        console.log(token);
        return axiosAuth(token, "post", url, data);
    },
    put: ({ data }) => {
        const url = `/api/v1/admin/flashsale`;
        console.log(token);
        return axiosAuth(token, "put", url, data);
    },
    delete: ({ id }) => {
        const url = `/api/v1/admin/flashsale?id=${id}`;
        console.log(token);
        return axiosAuth(token, "delete", url);
    },
}
export default flashSale;