import { SAVE_SHIPPING_ADDRESS } from "../constants/orderConstants"


const INITAL_STATE = {
    shippingAddress: {},

};

const orderReducer = (state = INITAL_STATE, action) => {
    switch (action.type) {
            case SAVE_SHIPPING_ADDRESS:
                return {
                    ...state,
                    shippingAddress: action.payload,
                }
        
            default:
                return state;
                
    }

}

export default orderReducer;