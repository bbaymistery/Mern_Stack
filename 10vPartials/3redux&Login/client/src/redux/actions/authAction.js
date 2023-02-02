import { GLOBALTYPES } from './globalTypes'
import { postDataAPI } from '../../utils/fetchData'

export const login = (data) => async (dispatch) => {
    try {
        if (data) {

            dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
            const datas = await postDataAPI('login', data)
            console.log(datas, "logindatas");
            dispatch({ type: GLOBALTYPES.AUTH, payload: { token: datas.access_token, user: datas.user } })

            localStorage.setItem("firstLogin", true)
            dispatch({ type: GLOBALTYPES.ALERT, payload: { success: datas.msg } })
        }

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}





