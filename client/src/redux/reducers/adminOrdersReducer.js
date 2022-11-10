import { GET_ALL_ORDERD_PRODUCTS, GET_SINGLE_USER_ORDERD_PRODUCTS, UPDATE_ORDER_STATUS } from "../constants/orderConstants";

const INITIAL_STATE = {
    orders: {
        allUserOrders:[],
        singleUserOrders:null
    }
}

const adminOrdersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_ORDERD_PRODUCTS:
            return {
                orders:{...state.orders,allUserOrders:[ action.payload]}
            }
            case GET_SINGLE_USER_ORDERD_PRODUCTS:
                return {
                    orders: {...state.orders,singleUserOrders:action.payload}
                }
            case UPDATE_ORDER_STATUS:
                return {
                    orders: {...state.orders,singleUserOrders:action.payload}
                }
        
        default:
            return state;
    }
};
export default adminOrdersReducer;
