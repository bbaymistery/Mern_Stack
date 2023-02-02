import { GLOBALTYPES } from './globalTypes'
import { getDataAPI } from '../../utils/fetchData'


export const PROFILE_TYPES = {
    LOADING: 'LOADING_PROFILE',
    GET_USER: 'GET_PROFILE_USER',
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UNFOLLOW',
    GET_ID: 'GET_PROFILE_ID',
    GET_POSTS: 'GET_PROFILE_POSTS',
    UPDATE_POST: 'UPDATE_PROFILE_POST'
}


export const getProfileUsers = ({ id, auth }) => async (dispatch) => {
    dispatch({ type: PROFILE_TYPES.GET_ID, payload: id })

    try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: true })
        const res = getDataAPI(`/user/${id}`, auth.token)
        const users = await res;
        dispatch({ type: PROFILE_TYPES.GET_USER, payload: users.data })
        console.log(users, "usrse");
        dispatch({ type: PROFILE_TYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }

}


