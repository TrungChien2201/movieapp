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
export const deleteProduct = payload => api.delete(`/delete-product/${payload.id}`)
export const updateProduct = payload => api.put(`/edit-product/${payload.id}`, payload.data)
export const searchProduct = payload => api.get(`/search-product/${payload}`)

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
    deleteProduct,
    updateProduct,
    searchProduct
}

export default apis
