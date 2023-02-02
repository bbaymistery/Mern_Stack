import { GLOBALTYPES, EditData, DeleteData } from './globalTypes'
import { POST_TYPES } from './postAction'
import { postDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData'


export const createComment = ({ post, newComment, auth, socket }) => async (dispatch) => {
    //first we add new comment to that post
    const newPost = { ...post, comments: [...post.comments, newComment] }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    try {
        const data = { ...newComment, postId: post._id, postUserId: post.user._id }
        const res = await postDataAPI('comment', data, auth.token)
        const newData = { ...res.newComment, user: auth.user }
        const newPost = { ...post, comments: [...post.comments, newData] }
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}
//25 https://www.youtube.com/watch?v=T7BkGzocAa4&list=PLs4co9a6NhMyAfSnDg1MKGwLdLx0OA07d&index=20