import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
})

export const insertMovie = payload => api.post(`/movie`, payload)
export const getAllMovies = () => api.get(`/movies`)
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getMovieById = id => api.get(`/movie/${id}`)
export const login = payload => api.post(`/login`, payload)
export const register  = payload => api.post(`/register`, payload)
export const forgotPassword = payload => api.post(`/forgot`,payload)
export const createProduct = payload => api.post(`/create-product`,payload)
export const getProduct = () => api.get(`/get-product`)
export const getProductDetail = id => api.get(`/product-detail/${id}`)
export const deleteProduct = payload => api.delete(`/delete-product/${payload.id}`)
export const updateProduct = payload => api.put(`/edit-product/${payload.id}`, payload.data)
export const searchProduct = payload => api.get(`/search-product/${payload}`)
export const getProductPage = page => api.get(`/product/${page}`)
export const CreateStore = payload => api.post(`/create-store/${payload.id}`,payload.store)
export const getStore = userId => api.get(`/get-store/${userId}`)
export const deleteStore = id => api.delete(`/delete-store/${id}`);
export const deleteProductStore = payload => api.post(`delete-product-store`, payload);
export const getCity = () => axios.get('/api/city');
export const getDistrict = city => axios.get(`/api/district/${city}`);
export const getCommune = district => axios.get(`/api/commune/${district}`);
export const CreateOrder = payload => axios.post(`/api/create-order`, payload);
export const getOrder = id => axios.get(`/api/get-order/${id}`);

// admin

export const getAccount = () => axios.get(`/api/get-account`);
export const getAllOrder = () => axios.get(`/api/get-all-order`);
export const deleteAccount = id => axios.delete(`/api/delete-account/${id}`);
export const editAccount = payload => axios.put(`/api/edit-account`,payload);
export const deleteOrder = id => axios.delete(`/api/delete-order/${id}`);
export const editOrder = payload => axios.put(`/api/edit-order`, payload);


const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    login,
    register,
    forgotPassword,
    createProduct,
    getProduct,
    getProductDetail,
    deleteProduct,
    updateProduct,
    searchProduct,
    getProductPage,
    CreateStore,
    deleteStore,
    getStore,
    deleteProductStore,
    getCity,
    getDistrict,
    getCommune,
    CreateOrder,
    getOrder,

    // admin
    getAccount,
    deleteAccount,
    editAccount, 
    getAllOrder, 
    deleteOrder, 
    editOrder
    
}

export default apis
