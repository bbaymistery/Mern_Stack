import { GLOBALTYPES, DeleteData } from '../actions/globalTypes'
import { postDataAPI, getDataAPI, deleteDataAPI } from '../../utils/fetchData'

export const MESS_TYPES = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE: 'ADD_MESSAGE',
    GET_CONVERSATIONS: 'GET_CONVERSATIONS',
    GET_MESSAGES: 'GET_MESSAGES',
    UPDATE_MESSAGES: 'UPDATE_MESSAGES',
    DELETE_MESSAGES: 'DELETE_MESSAGES',
    DELETE_CONVERSATION: 'DELETE_CONVERSATION',
    CHECK_ONLINE_OFFLINE: 'CHECK_ONLINE_OFFLINE'
}



export const addMessage = ({ msg, auth, socket }) => async (dispatch) => {
    dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg })

    // const { _id, avatar, fullname, username } = auth.user
    // socket.emit('addMessage', { ...msg, user: { _id, avatar, fullname, username } })

    // try {
    //     await postDataAPI('message', msg, auth.token)
    // } catch (err) {
    //     dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    // }
}
export const deleteMessages = ({ msg, data, auth }) => async (dispatch) => {

}