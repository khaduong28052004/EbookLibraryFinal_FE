import { axiosAuth, axiosAuthPython } from "../../config/configAxios";

const SearchService = {
    searchByIds: (idProducts, page) => axiosAuth('null', 'get', `api/v1/user/searchImage?idProducts=${idProducts}&page=${page}`),
    searchAudio: (text, page) => axiosAuth('null', 'get', `api/v1/user/search/audio?text=${text}&page=${page}`),
    searchImage: (data) => axiosAuthPython('null', 'post', `search-image`, data),
};

export default SearchService;
