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

    fetchTopProducts: (idSeller) => {
        const url = `/api/v1/user/shop/fetchTopProducts?id_Shop=${idSeller}`;
        console.log("idSeller", idSeller);
        return axiosAuth("null", "get", url);
    },


    createFollower: (idUser, idSeller) => {
        console.log("idSeller", idSeller);
        console.log("idUser", idUser);
        const url = `http://localhost:8080/api/v1/user/follower/create?id_user=${idUser}&id_shop=${idSeller}`;

        return axiosAuth("null", "get", url);
    },

    createReport: (idUser, idSeller, createAt, content, title, images) => {
        const url = `http://localhost:8080/api/v1/user/shop/createReport`;

        console.log("idSeller formData", idSeller);
        console.log("idUser formData", idUser);
        console.log("createAt", createAt);
        console.log("content", content);
        console.log("title", title);
        console.log("images", images);

        const formData = new FormData();
        formData.append('accountId', idUser);
        formData.append('content', content || "");
        formData.append('shopId', idSeller);
        formData.append('status', false);
        formData.append('createAt', new Date(createAt).toISOString());
        formData.append('title', title);

        if (images && images.length > 0) {
            images.forEach((image) => {
                formData.append('images', image); // Tất cả file dùng key 'images'
            });
        }

        return axiosAuth("null", "post", url, formData);
    }
}
export default homeShopService;
