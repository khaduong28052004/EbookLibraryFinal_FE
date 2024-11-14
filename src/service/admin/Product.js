import { axiosAuth } from '../../config/configAxios';

// const token = sessionStorage.getItem("token");
const token = "null";
const product = {
    findAllProduct: ({ searchItem, option, currentPage, size, sortColumn, sortBy }) => {
        const url = `/api/v1/admin/product?search=${searchItem}&option=${option}&page=${currentPage}&size=${size}&sortBy=${sortBy}&sortColumn=${sortColumn}`;
        console.log(token);
        return axiosAuth(token, "get", url);
    },
    putStatus: ({ id }) => {
        const url = `/api/v1/admin/product?id=${id}`;
        console.log(token);
        return axiosAuth(token, "put", url);
    },
    putActive: ({ id, status }) => {
        const url = `/api/v1/admin/product/browse?id=${id}&status=${status}`;
        console.log(token);
        return axiosAuth(token, "put", url);
    }
}
export default product;