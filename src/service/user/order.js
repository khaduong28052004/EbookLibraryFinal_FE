import axiosConfig, { axiosAuth } from "../../config/configAxios";

const token = sessionStorage.getItem("token")
const createUrl = (path, params = '') => `/api/v1/user/bill/${path}${params}`;

const userOrderService = {
    fetchOrder: (userID, orderStatusId) => axiosAuth('null', 'get', createUrl('read', `?userId=${userID}&orderStatusFind=${orderStatusId}`)),
    cancelOrder: (billId) => axiosAuth('null', 'post', createUrl('update_status/cancel/', `${billId}`)),
    confirmOrder: (billId) => axiosAuth('null', 'post', createUrl('update_status/confirm/', `${billId}`)),
    reOrder: (billId) => axiosAuth('null', 'post', createUrl('create/reorder/', `${billId}`))
}
export default userOrderService;
