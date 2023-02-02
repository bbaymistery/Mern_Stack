import { GLOBALTYPES } from './globalTypes'
import { postDataAPI, deleteDataAPI, getDataAPI, patchDataAPI } from '../../utils/fetchData'

export const NOTIFY_TYPES = {
    GET_NOTIFIES: 'GET_NOTIFIES',
    CREATE_NOTIFY: 'CREATE_NOTIFY',
    REMOVE_NOTIFY: 'REMOVE_NOTIFY',
    UPDATE_NOTIFY: 'UPDATE_NOTIFY',
    UPDATE_SOUND: 'UPDATE_SOUND',
    DELETE_ALL_NOTIFIES: 'DELETE_ALL_NOTIFIES'
}

export const createNotify = ({ msg, auth, socket }) => async (dispatch) => {
    try {
        const res = await postDataAPI('notify', msg, auth.token)
        console.log(res);

        //bunu yazdkdan sonra socketServer.js e yazirig
        //(ordaki msg olan) => ...res.data.notify, user: username: auth.user.username,avatar: auth.user.avatar
        socket.emit('createNotify', { ...res.notify, user: { username: auth.user.username, avatar: auth.user.avatar } })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { err } })
    }
}

export const removeNotify = ({ msg, auth, socket }) => async (dispatch) => {
    try {
        await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token)

        socket.emit('removeNotify', msg)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { err } })
    }
}

export const getNotifies = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI('notifies', token)

        dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies })


    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}


export const isReadNotify = ({ msg, auth }) => async (dispatch) => {
    //update on front side 
    dispatch({ type: NOTIFY_TYPES.UPDATE_NOTIFY, payload: { ...msg, isRead: true } })
    try {
        //on back side
        await patchDataAPI(`/isReadNotify/${msg._id}`, null, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const deleteAllNotifies = (token) => async (dispatch) => {
    dispatch({ type: NOTIFY_TYPES.DELETE_ALL_NOTIFIES, payload: [] })
    try {
        await deleteDataAPI('deleteAllNotify', token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}