import { axiosAuth } from '../../config/configAxios';

// const token = sessionStorage.getItem("token");
const token = "null";

const rolePermission = {
    create: ({ data }) => axiosAuth(token, "post", "/api/v1/admin/rolepermission", data),
    delete: ({ id }) => axiosAuth(token, "delete", `/api/v1/admin/rolepermission?id=${id}`),
}
export default rolePermission;