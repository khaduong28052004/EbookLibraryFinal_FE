import { axiosAuth } from '../../config/configAxios';

const token = sessionStorage.getItem("token") 

const homeShopService = {

    fetchShopInfo: ({ idSeller }) => {
        console.log("idSeller", idSeller)
        
        const url = `http://localhost:8080/api/user/informationSeller/${idSeller}`;

        return axiosAuth(token, "get", url);
    },


    fetchVoucherShopHome: ({ idSeller }) => {
        const url = `http://localhost:8080/api/user/voucherall/${idSeller}`;
        console.log(token);

        return axiosAuth(token, "get", url);
    },

   

}
export default homeShopService;
