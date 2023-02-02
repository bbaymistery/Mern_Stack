import { GLOBALTYPES } from './globalTypes'
import { getDataAPI, postDataAPI } from '../../utils/fetchData'

export const login = (data) => async (dispatch) => {
    try {
        if (data) {

            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
            const datas = await postDataAPI('login', data)
            dispatch({ type: GLOBALTYPES.AUTH, payload: { token: datas.access_token, user: datas.user } })

            localStorage.setItem("firstLogin", true)
            dispatch({ type: GLOBALTYPES.ALERT, payload: { success: datas.msg } })
        }

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}


export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin")
    if (firstLogin) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        try {
            const res = await postDataAPI('refresh_token')
            console.log(res);

            dispatch({ type: GLOBALTYPES.AUTH, payload: { token: res?.access_token, user: res?.user } })
            dispatch({ type: GLOBALTYPES.ALERT, payload: {} })

        } catch (err) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err?.response?.msg } })
        }
    }
}


