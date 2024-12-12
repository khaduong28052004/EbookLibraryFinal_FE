import { axiosAuth } from '../../config/configAxios';

const token = sessionStorage.getItem("token") || "null";

const homeShopService = {

    fetchShopInfo: (idSeller, userID) => {
        console.log("idSeller", idSeller)
        console.log("userID", userID)
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

    createReport: ({userId, sellerId, content, title, images}) => {
        const url = `/api/v1/user/shop/createReport/saveImg`;

        const formData = new FormData();
        formData.append('accountId', userId);
        formData.append('content', content || "");
        formData.append('shopId', sellerId);
        formData.append('status', false);
        formData.append('createAt', new Date());
        formData.append('title', title);
        
        // Thêm ảnh (MultipartFile array)
         if (images && images.length > 0) {
            images.forEach((image, index) => {
                formData.append(`images[${index}]`, image);
                console.log(`images[${index}]:`, image);
            });
        }
    
        console.log("idSeller formData", sellerId);
        console.log("idUser formData", userId);
        console.log("createAt", new Date());
        console.log("content", content);
        console.log("title", title);
        console.log("images", images);

        return axiosAuth("null", "post", url, formData);
    }
}
export default homeShopService;
