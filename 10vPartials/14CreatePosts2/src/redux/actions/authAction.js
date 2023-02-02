import { GLOBALTYPES } from './globalTypes'
import { postDataAPI } from '../../utils/fetchData'
import valid from '../../utils/valid'

export const login = (data) => async (dispatch) => {
    try {
        if (data) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
            const datas = await postDataAPI('login', data)
            if (datas?.access_token) {
                dispatch({ type: GLOBALTYPES.AUTH, payload: { token: datas.access_token, user: datas.user } })
                localStorage.setItem("firstLogin", true)
            }
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
            //bunu ekledik cunki her reloaddda bizde profile/ape/refresh seklinde
            //request gonderirdi 
            const method = "POST"
            const baseUrl = `http://localhost:3000/api/refresh_token`;
            const headers = { "Content-Type": "application/json", }
            const response = await fetch(baseUrl, { method, headers });
            const res = await response.json();
            dispatch({ type: GLOBALTYPES.AUTH, payload: { token: res?.access_token, user: res?.user } })
            dispatch({ type: GLOBALTYPES.ALERT, payload: {} })
        } catch (err) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err?.response?.msg } })
        }
    }
}


export const register = (data) => async (dispatch) => {
    const check = valid(data)
    if (check.errLength > 0) return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg })

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })

        const res = await postDataAPI('register', data)
        dispatch({ type: GLOBALTYPES.AUTH, payload: { token: res.access_token, user: res.user } })

        localStorage.setItem("firstLogin", true)
        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.msg } })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.msg } })
    }
}


export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('firstLogin')
        await postDataAPI('logout')
        window.location.href = "/"
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { err } })
    }
}