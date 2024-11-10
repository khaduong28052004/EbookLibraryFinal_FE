import { axiosAuth } from '../../config/configAxios';

const token = "null";
// const token = sessionStorage.getItem("token");

const flashSale = {
    findAllFlashSale: ({ dateStart, dateEnd, currentPage, size, sortColumn, sortBy }) => {
        // const url = `/api/v1/admin/account/seller/browse?search=${¿searchItem}&gender=${gender}&page=${currentPage}&size=${size}&sortColumn=${sortColumn}&sortBy=${sortBy}`;

        const url = `/api/v1/admin/flashsale?dateStart=${dateStart}&dateEnd=${dateEnd}&page=${currentPage}&size=${size}&sortBy=${sortBy}&sortColumn=${sortColumn}`;
        console.log(token);
        return axiosAuth(token, "get", url);
    },
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