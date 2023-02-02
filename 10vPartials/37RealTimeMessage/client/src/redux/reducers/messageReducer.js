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
        //payload = {sender: auth.user._id,recipient: id,text,media: newArr,createdAt: new Date().toISOString() }
        case MESS_TYPES.ADD_MESSAGE:
            return {
                ...state,
                data: [...state.data, action.payload],
                users: state.users.map(user =>
                    user._id === action.payload.recipient || user._id === action.payload.sender
                        ? {
                            ...user,
                            text: action.payload.text,
                            media: action.payload.media,
                            call: action.payload.call
                        }
                        : user
                )
            };

        case MESS_TYPES.GET_CONVERSATIONS:
            return {
                ...state,
                users: action.payload.newArr,
                resultUsers: action.payload.result,
                firstLoad: true
            };
        case MESS_TYPES.GET_MESSAGES:
            return {
                ...state,
                // data: [...state.data, action.payload]
                data: action.payload.messages,
                resultData: action.payload.result
            };
        default:
            return state;
    }
}

export default messageReducer;