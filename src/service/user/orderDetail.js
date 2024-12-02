import { axiosAuth } from '../../config/configAxios';


const token = sessionStorage.getItem("token")
const createUrl = (path, params = '') => `/api/v1/user/billdetail/${path}${params}`;

const userOrderDetailService = {
    fetchOrderDetail: (orderId) => axiosAuth('null', 'get', createUrl('read', `?billId=${orderId}`)),
    cancelOrderDetail: (billId) => axiosAuth('null', 'post', createUrl('update_status/cancel/', `${billId}`)),
    confirmOrderDetail: (billId) => axiosAuth('null', 'post', createUrl('update_status/confirm/', `${billId}`)),
    reOrder: (billId) => axiosAuth('null', 'post', createUrl('create/reorder/', `${billId}`)) 

}
export default userOrderDetailService;
