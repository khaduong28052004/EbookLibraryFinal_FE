import { axiosAuth } from '../../config/configAxios';

// const token = sessionStorage.getItem("token");
const token = "null";

const home = {
    findAllHome: () => axiosAuth(token, "get", "/api/v1/admin/home"),
}
export default home;