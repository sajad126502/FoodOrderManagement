import { SAVE_SHIPPING_ADDRESS, USER_SPECIFIC_ORDERS } from "../constants/orderConstants"
import { START_LOADING, STOP_LOADING } from './../constants/loadingConstants';
import { SHOW_ERROR_MESSAGE } from './../constants/messageConstants';
import axios from 'axios';


export const saveShippingAddress = data => async dispatch => {
    dispatch({
        type: SAVE_SHIPPING_ADDRESS,
        payload: data
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
}


export const getUserSpecificOrders = () => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch({ type: START_LOADING });
        const response = await axios.post(`/api/order/userspecificorders`, user, config);
        dispatch({ type: STOP_LOADING });
        dispatch({ type: USER_SPECIFIC_ORDERS, payload: response.data.orders });
    } catch (err) {

        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err.response.data.errorMessage });
    }

}


