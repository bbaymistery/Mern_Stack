import { GLOBALTYPES } from "./globalTypes"
import { imageUpload } from '../../utils/imageUpload'
import { postDataAPI,  } from '../../utils/fetchData'

export const POST_TYPES = {
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
    GET_POST: 'GET_POST',
    DELETE_POST: 'DELETE_POST'
}
export const createPost = ({ content, images, auth }) => async (dispatch) => {
    let media = []
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        if (images.length > 0) media = await imageUpload(images)
        const res = await postDataAPI('posts', { content, images: media }, auth.token)
        console.log(res);
        
        dispatch({ type: POST_TYPES.CREATE_POST, payload: { ...res.data, user: auth.user } })
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}
