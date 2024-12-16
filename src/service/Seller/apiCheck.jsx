import { axiosAuthPython, axiosAuth } from "../../config/configAxios";

const checkService = {
    checkText: (data) => axiosAuthPython('null', 'post', `/check-text`, data),
    checkImage: (data) => axiosAuthPython('null', 'post', `/check-images`, data),
    apiChatBot: (key) => axiosAuth('null', 'get', `/api/v1/chatBot/search?key=${key}`),
    apiChatBotBill: (key) => axiosAuth('null', 'get', `/api/v1/chatBot/searchBill?key=${key}&account_id=${sessionStorage.getItem("id_account")}`)

}

export default checkService;
