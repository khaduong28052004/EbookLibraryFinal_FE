import { axiosAuth } from '../../config/configAxios';

const token = sessionStorage.getItem("token") 

const userOrderService = {

    fetchOrder: ({ userID, orderStatusId }) => {
        console.log("token BILL" ,token);
        console.log("orderStatusId BILL", orderStatusId)
        console.log("userID BILL", userID)
        
        const url = `http://localhost:8080/api/v1/user/bill/read?userId=${userID}&orderStatusFind=${orderStatusId}`;
        console.log("SAU FETCH BILL", userID)

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
