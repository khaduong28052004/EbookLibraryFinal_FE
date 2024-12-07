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
        console.log("idSeller", idSeller);
        return axiosAuth("null", "get", url);
    },


    createFollower: (idUser, idSeller) => {
        console.log("idSeller", idSeller);
        console.log("idUser", idUser);
        const url = `http://localhost:8080/api/v1/user/follower/create?id_user=${idUser}&id_shop=${idSeller}`;

        return axiosAuth("null", "get", url);
    },

    createReport: (idUser, idSeller, createAt, content, title) => {
        console.log("idSeller", idSeller);
        console.log("idUser", idUser);
        console.log("createAt", createAt);
        console.log("content", content);
        console.log("title", title);
        
        const url = `http://localhost:8080/api/v1/user/shop/createReport`;
        const data = {
            accountId: idUser,
            shopId: idSeller,
            status: false,
            createAt: createAt,
            content: content,
            title: title
        };
        return axiosAuth("null", "post", url, data);
    }
}
export default homeShopService;
