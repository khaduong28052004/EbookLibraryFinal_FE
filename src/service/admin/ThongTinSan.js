import { axiosAuth } from '../../config/configAxios';

const token = "null";
const url = (path = "", param = "") => `/api/v1/admin/thongtinsan${path}${param}`

const thongTinSan = {
    getThongTinSan: () => axiosAuth(token, "get", url("", "")),
    putThongTinSan: (data) => axiosAuth(token, "put", url("/thongtinchung", ""), data),
    putChinhSach: (data) => axiosAuth(token, "put", url("/chinhsach", ""), data),
    postChuDe: (id, images) => axiosAuth(token, "post", url("/chude/saveImg", `?id=${id}`), images),
}
export default thongTinSan;