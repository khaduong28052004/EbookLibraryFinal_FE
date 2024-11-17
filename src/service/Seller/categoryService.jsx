import { data } from "autoprefixer";
import axiosConfig, { axiosAuth } from "../../config/configAxios";

const account_id = sessionStorage.getItem('id_account');

const createUrl = (path, params = '') => `/api/v1/seller/category/${path}${params}`;

const CategoryService = {
    getList: () => axiosAuth('null', 'get', createUrl('getAllList')),
    getListByIdParent: (idParent,) => axiosAuth('null', 'get', createUrl('getListByIdParent', `?idParent=${idParent}&account_id=${account_id}`)),
    getAllSeller: (search, pageNumber, sortBy, sortColumn) => axiosAuth('null', 'get', createUrl('getAllSeller', `?search=${search}&page=${pageNumber}&sortBy=${sortBy}&sortColumn=${sortColumn}&account_id=${account_id}`)),
    create: (data) => axiosAuth('null', 'post', createUrl('create'), data),
    update: (data) => axiosAuth('null', 'post', createUrl('update'), data),
    delete: (idCategory) => axiosAuth('null', 'delete', createUrl('delete', `?id=${idCategory}`)),
    edit: (category_id) => axiosAuth('null', 'get', createUrl('edit', `?category_id=${category_id}`))
};

export default CategoryService;
