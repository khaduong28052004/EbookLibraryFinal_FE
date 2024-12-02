import { axiosAuth } from '../../config/configAxios';

const token = sessionStorage.getItem("token");


const userEvaluateService = {
    createEvaluate: ({ star, content, orderDetailId, productId, accountId, images }) => {
        const url = `/api/v1/user/evaluate/create/saveImg`;
        console.log('Token:', token);

        const formData = new FormData();
        formData.append('star', star);
        formData.append('content', content || "");
        formData.append('billDetailId', orderDetailId);
        formData.append('productId', productId);
        formData.append('accountId', accountId);

        if (images && images.length > 0) {
            images.forEach((image, index) => {
                formData.append(`images[${index}]`, image);
                console.log(`images[${index}]:`, image);
            });
        }

        console.log("star", star)
        console.log("content", content)
        console.log("orderDetailId", orderDetailId)
        console.log("productId", productId)
        console.log("accountId", accountId)

        return axiosAuth("null", "post", url, formData);
    }




}
export default userEvaluateService;
