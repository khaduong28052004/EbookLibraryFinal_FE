import { axiosAuth } from '../../config/configAxios';

const token = sessionStorage.getItem("token") 

const userOrderService = {

    fetchOrder: ({ userID, orderStatusId }) => {
        console.log("token",token);
        console.log("orderStatusId", orderStatusId)
        console.log("userID", userID)
        
        const url = `http://localhost:8080/api/v1/user/bill/read?userId=${userID}&orderStatusFind=${orderStatusId}`;
      
        return axiosAuth(token, "get", url);
    },


    cancelOrder: ({ billId }) => {
        const url = `http://localhost:8080/api/v1/user/bill/update_status/cancel/${billId}`;
        console.log(token);

        return axiosAuth(token, "post", url);
    },

    confirmOrder: ({ billId }) => {
        console.log(token);
        console.log("billId", billId)

        const url = `http://localhost:8080/api/v1/user/bill/update_status/confirm/${billId}`;

        return axiosAuth(token, "post", url);
    },

    reOrder: ({ billId }) => {
        const url = `http://localhost:8080/api/v1/user/bill/create/reorder/${billId}`;
        console.log(token);

        return axiosAuth(token, "post", url);
    },

}
export default userOrderService;
