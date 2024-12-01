import { axiosAuthPython } from "../../config/configAxios";

const checkService = () => {
    checkText: (data) => axiosAuthPython('null', 'post', `check-text`, data);
    checkImage: (data) => axiosAuthPython('null', 'post', `check-images`, data)
}

export default checkService;
