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

        // socket.emit('createNotify', {
        //     ...res.data.notify,
        //     user: {
        //         username: auth.user.username,
        //         avatar: auth.user.avatar
        //     }
        // })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { err } })
    }
}

export const removeNotify = ({ msg, auth, socket }) => async (dispatch) => {
    try {
        await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token)

        // socket.emit('removeNotify', msg)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { err } })
    }
}
