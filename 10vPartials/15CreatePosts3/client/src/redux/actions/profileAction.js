import { GLOBALTYPES } from './globalTypes'
import { getDataAPI } from '../../utils/fetchData'
import { imageUpload } from '../../utils/imageUpload'

import { patchDataAPI } from '../../utils/fetchData'

export const PROFILE_TYPES = {
    LOADING: 'LOADING_PROFILE',
    GET_USER: 'GET_PROFILE_USER',
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UNFOLLOW',
    GET_ID: 'GET_PROFILE_ID',
    GET_POSTS: 'GET_PROFILE_POSTS',
    UPDATE_POST: 'UPDATE_PROFILE_POST'
}

//get user (ctrl)
export const getProfileUsers = ({ id, auth }) => async (dispatch) => {
    // dispatch({ type: PROFILE_TYPES.GET_ID, payload: id })

    try {
        dispatch({ type: PROFILE_TYPES.LOADING, payload: true })
        const res = getDataAPI(`/user/${id}`, auth.token)
        const users = await res;
        dispatch({ type: PROFILE_TYPES.GET_USER, payload: users.data })
        // console.log(users, "usrse");
        dispatch({ type: PROFILE_TYPES.LOADING, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }

}

//updateUser (ctrl)
export const updateProfileUser = ({ userData, avatar, auth }) => async (dispatch) => {
    if (!userData.fullname) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Please add your full name." } })
    if (userData.fullname.length > 25) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Your full name too long." } })
    if (userData.story.length > 200) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Your story too long." } })

    try {
        let media;
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        if (avatar) media = await imageUpload([avatar])

        let data = { ...userData, avatar: avatar ? media[0].url : auth.user.avatar }
        const res = await patchDataAPI("user", data, auth.token)
        console.log(res, "updateProfileUser");

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                ...auth,
                user: {
                    ...auth.user,
                    ...userData,
                    avatar: avatar ? media[0].url : auth.user.avatar,
                }
            }
        })

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}
//user => follow edecegim wexs
//auth => men


//useri al =>...user,
//ve onun follewrslerin icine eski followersleri serpisdir=> followers: [...user.followers,
//  ,yanina men useri ekle=> followers: [...user.followers, auth.user]
//newUser = { ...user, followers: [...user.followers, auth.user] }
//yani onun followerslerinde birdene artsin
export const follow = ({ users, user, auth }) => async (dispatch) => {
    let newUser;
    if (users.every(item => item._id !== user._id)) {
        newUser = { ...user, followers: [...user.followers, auth.user] }
    } else {

        //burda eger birden cox user var ise o birden coxunun her birin
        //followersin icine yeni followeri ekliyor
        users.forEach(item => {
            if (item._id === user._id) {
                newUser = { ...item, followers: [...item.followers, auth.user] }
            }
        })
    }
    //!follow tklaninca onun followersinde bir nefer artar
    dispatch({ type: PROFILE_TYPES.FOLLOW, payload: newUser })

    //menim followingim birdene artar
    dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
            ...auth,
            user: { ...auth.user, following: [...auth.user.following, newUser] }
        }
    })

    try {
        const res = await patchDataAPI(`user/${user._id}/follow`, null, auth.token)

        console.log(res, "res");

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }


}



export const unfollow = ({ users, user, auth }) => async (dispatch) => {
    let newUser;
    if (users.every(item => item._id !== user._id)) {
        newUser = { ...user, followers: user.followers.filter(item => item._id !== auth.user._id) }
    } else {
        users.forEach(item => {
            if (item._id === user._id) newUser = { ...user, followers: user.followers.filter(item => item._id !== auth.user._id) }
        })
    }
    // //!unfollow tklaninca onun followersinde bir nefer  aazalar
    dispatch({ type: PROFILE_TYPES.UNFOLLOW, payload: newUser })

    //menim followingim birdene azalar
    dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
            ...auth,
            user: { ...auth.user, following: auth.user.following.filter((item) => item._id !== newUser._id) }
        }
    })

    try {
        const res = await patchDataAPI(`user/${user._id}/unfollow`, null, auth.token)
        console.log("unfiollow,  ", res);



    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.msg }
        })
    }


}
