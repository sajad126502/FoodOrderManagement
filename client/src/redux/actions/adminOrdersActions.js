import { GET_ALL_ORDERD_PRODUCTS, GET_SINGLE_USER_ORDERD_PRODUCTS, UPDATE_ORDER_STATUS } from "../constants/orderConstants"
import { START_LOADING, STOP_LOADING } from './../constants/loadingConstants';
import { SHOW_ERROR_MESSAGE } from './../constants/messageConstants';
import axios from 'axios';
export const getAllOrderdProducts = () => async dispatch => {


    try {

        dispatch({ type: START_LOADING });
        const response = await axios.get("/api/order/getall");
        dispatch({ type: STOP_LOADING });
        dispatch({ type: GET_ALL_ORDERD_PRODUCTS, payload: response.data.orders });
    } catch (err) {

        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err.response.data.errorMessage });
    }


}
export const getSingleUserOrderdProducts = (id) => async dispatch => {
    console.log(id)

    try {

        dispatch({ type: START_LOADING });
        const response = await axios.get(`/api/order/single/${id}`);
        dispatch({ type: STOP_LOADING });
        dispatch({ type: GET_SINGLE_USER_ORDERD_PRODUCTS, payload: response.data.singleUserOrders });
    } catch (err) {

        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err.response.data.errorMessage });
    }


}
export const updateOrderStatus = (data) => async dispatch => {
    console.log("updateOrderStatus")
    console.log(data)

    try {

        dispatch({ type: START_LOADING });
        const response = await axios.put(`/api/order/single/updatestatus`, data);
        dispatch({ type: STOP_LOADING });
        dispatch({ type: UPDATE_ORDER_STATUS, payload: response.data.singleUserOrders });
    } catch (err) {

        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err.response.data.errorMessage });
    }


}