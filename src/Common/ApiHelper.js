import axios from "axios";

class ApiHelper {
    constructor() {
        this.baseUrl = "https://voltnest-server.onrender.com"
        // this.baseUrl = "http://192.168.1.2:5000"
    }
    listProduct() {
        return axios.get(this.baseUrl + "/product/list")
    }
    filteredProduct(data) {
        return axios.post(this.baseUrl + "/product/filter", data)
    }
    getProductById(id) {
        return axios.get(this.baseUrl + "/product/list/" + id)
    }
    registerUser(data) {
        return axios.post(this.baseUrl + "/user/register", data)
    }
    loginUser(data) {
        return axios.post(this.baseUrl + "/user/login", data)
    }
    addToCart(data) {
        return axios.post(this.baseUrl + "/cart/create", data)
    }
    listCart(userId) {
        return axios.get(this.baseUrl + "/cart/" + userId)
    }
    deleteCartItems(id) {
        return axios.delete(this.baseUrl + "/cart/delete/" + id)
    }
    emptyUserCart(userId) {
        return axios.delete(this.baseUrl + "/cart/empty/" + userId)
    }
    createAddress(data) {
        return axios.post(this.baseUrl + "/address/create", data)
    }
    listAddress(userId) {
        return axios.get(this.baseUrl + "/address/" + userId)
    }
    getAddressById(id) {
        return axios.get(this.baseUrl + "/address/list/" + id)
    }
    createOrder(data) {
        return axios.post(this.baseUrl + "/order/create", data)
    }
    verifyPayment(data) {
        return axios.post(this.baseUrl + "/order/verify/payment", data)
    }
    getOrderById(id) {
        return axios.get(this.baseUrl + "/order/list/" + id)
    }
    listOrder(userId) {
        return axios.get(this.baseUrl + "/order/" + userId)
    }
    updateOrder(data) {
        return axios.put(this.baseUrl + "/order/update", data)
    }
    listOrderByStatus(data) {
        return axios.post(this.baseUrl + "/order/list/status", data)
    }
    calculateUserScore(userId) {
        return axios.get(this.baseUrl + "/order/score/" + userId)
    }
}

const apiHelper = new ApiHelper()

export default apiHelper