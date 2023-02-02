import { MESS_TYPES } from '../actions/messageAction'
import { EditData, DeleteData } from '../actions/globalTypes'

const initialState = {
    users: [],
    resultUsers: 0,
    data: [],
    firstLoad: false
}

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case MESS_TYPES.ADD_USER:
            //yani gonderiln user users icinde yoxdursa anlaminda yazb galiba
            if (state.users.every(item => item._id !== action.payload._id)) {
                return {
                    ...state,
                    users: [action.payload, ...state.users]
                };
            }
            return state;

        default:
            return state;
    }
}

export default messageReducer;