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

        return axiosAuth(token, "post", url, formData);
    }




}
export default userEvaluateService;
