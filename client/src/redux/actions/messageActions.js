import {CLEAR_MESSAGES} from '../constants/messageConstants';

export const clear_message = () => (dispatch) => {
    dispatch({
        type: CLEAR_MESSAGES,
    })
}
