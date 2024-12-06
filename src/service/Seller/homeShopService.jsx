import { axiosAuth } from '../../config/configAxios';

const token = sessionStorage.getItem("token") || "null";

const homeShopService = {

    fetchShopInfo: (idSeller, userID) => {
        console.log("idSeller", idSeller)
        const data = {
            userID: userID,
            sellerID: idSeller
        };
   
        // const url = `http://localhost:8080/api/v1/user/informationSelle${idSeller}`;
        const url = "/api/v1/user/informationSeller";
        return axiosAuth("null", "post", url, data);
    },


    fetchVoucherShopHome: (idSeller) => {
        const url = `/api/v1/user/voucherAll/${idSeller}`;
        console.log(token);
        return axiosAuth("null", "get", url);
    },

    
    fetchProductShopHome: (idSeller) => {
        const url = `/api/v1/user/shop/selectall?id_Shop=${idSeller}`;
        console.log("idSeller",idSeller);
        return axiosAuth("null", "get", url);
    },



}
export default homeShopService;
