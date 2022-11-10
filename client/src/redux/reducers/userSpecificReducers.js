import { USER_SPECIFIC_ORDERS } from "../constants/orderConstants";


const INITAL_STATE = {
    orders: [],

};

const userSpecificOrders= (state = INITAL_STATE, action) => {
    switch (action.type) {
            case USER_SPECIFIC_ORDERS:
                return {
                    orders: action.payload,
                }
        
            default:
                return state;
                
    }

}

export default userSpecificOrders;