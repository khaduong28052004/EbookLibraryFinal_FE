import { axiosAuth, axiosAuthPython } from "../../config/configAxios";

const SearchService = {
    searchByIds: (idProducts, page) => axiosAuth('null', 'get', `api/v1/user/searchImage?idProducts=${idProducts}&page=${page}`),
    searchAudio: (text, page) => axiosAuth('null', 'get', `api/v1/user/search/audio?text=${text}&page=${page}`),
    searchImage: (data) => axiosAuthPython('null', 'post', `search-image`, data),
    filtercategoryAudio: (id_categories, page) => axiosAuth('null', 'get', `api/v1/user/filtercategory/audio?id_categories=${id_categories}&page=${page}`),
    filterPriceAudio: (priceMin, priceMax, page) => axiosAuth('null', 'get', `api/v1/user/filterprice/audio?priceMin=${priceMin}&priceMax=${priceMax}&page=${page}`),
};

export default SearchService;
