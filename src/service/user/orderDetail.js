import { axiosAuth } from '../../config/configAxios';

const token = sessionStorage.getItem("token") 

const userOrderDetailService = {

    fetchOrderDetail: ({ orderId }) => {
        console.log("token",token);
        console.log("orderId", orderId)
        
        const url = `http://localhost:8080/api/v1/user/billdetail/read?billId=${orderId}`;
      
        return axiosAuth(token, "get", url);
    },


    cancelOrderDetail: ({ billId }) => {
        const url = `http://localhost:8080/api/v1/user/billdetail/update_status/cancel/${billId}`;
        console.log(token);

        return axiosAuth(token, "post", url);
    },

    confirmOrderDetail: ({ billId }) => {
        console.log(token);
        console.log("billId", billId)

        const url = `http://localhost:8080/api/v1/user/billdetail/update_status/confirm/${billId}`;

        return axiosAuth(token, "post", url);
    },

    reOrderDetail: ({ billId }) => {
        const url = `http://localhost:8080/api/v1/user/billdetail/create/reorder/${billId}`;
        console.log(token);

        return axiosAuth(token, "post", url);
    },

}
export default userOrderDetailService;
