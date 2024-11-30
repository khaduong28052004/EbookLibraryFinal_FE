import { axiosAuth, axiosAuthPython } from "../../config/configAxios";

const SearchService = {
    searchByIds: (idProducts) => axiosAuth('null', 'get', `api/v1/user/searchImage?idProducts=${idProducts}`),
    searchImage: (data) => axiosAuthPython('null', 'post', `search-image`, data),
};

export default SearchService;
