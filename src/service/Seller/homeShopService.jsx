import { axiosAuth } from '../../config/configAxios';

const token = sessionStorage.getItem("token")||"null";

const homeShopService = {

    fetchShopInfo: ( idSeller ) => {
        console.log("idSeller", idSeller)
        
        const url = `http://localhost:8080/api/v1/user/informationSeller/${idSeller}`;

        return axiosAuth("null", "get", url);
    },


    fetchVoucherShopHome: ( idSeller ) => {
        const url = `/api/v1/user/voucherAll/${idSeller}`;
        console.log(token);
        return axiosAuth("null", "get", url);
    },

   

}
export default homeShopService;
