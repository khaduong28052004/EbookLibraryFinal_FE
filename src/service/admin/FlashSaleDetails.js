import { axiosAuth } from '../../config/configAxios';

// const token = "null";
const token = sessionStorage.getItem("token");

const flashSaleDetails = {
    findListByFlashSale: ({ id, page, size, sortBy, sortColumn }) => {
        const url = `/api/v1/admin/flashsaledetails?idFlashSale=${id}&page=${page}&size=${size}&sortBy=${sortBy}&sortColumn=${sortColumn}`;
        console.log(token);
        return axiosAuth(token, "get", url);
    },
    findListNotFalshSale: ({ id, page, size, sortBy, sortColumn }) => {
        const url = `/api/v1/admin/flashsaledetails/notflashsale?idFlashSale=${id}&page=${page}&size=${size}&sortBy=${sortBy}&sortColumn=${sortColumn}`;
        console.log(token);
        return axiosAuth(token, "get", url);
    },
    post: ({ data }) => {
        const url = `/api/v1/admin/flashsaledetails`;
        console.log(token);
        return axiosAuth(token, "post", url, data);
    },
    put: ({ data }) => {
        const url = `/api/v1/admin/flashsaledetails`;
        console.log(token);
        return axiosAuth(token, "put", url, data);
    },
    delete: ({ id }) => {
        const url = `/api/v1/admin/flashsaledetails?id=${id}`;
        console.log(token);
        return axiosAuth(token, "delete", url);
    }
}
export default flashSaleDetails;