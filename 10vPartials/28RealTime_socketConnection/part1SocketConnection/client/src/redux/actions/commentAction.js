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

        //burda ise commentin icerisinde ki useri degisirik
        const newData = { ...res.newComment, user: auth.user }
        const newPost = { ...post, comments: [...post.comments, newData] }
        dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const updateComment = ({ comment, post, content, auth }) => async (dispatch) => {
    //add comment inside that post cmment
    const newComments = EditData(post.comments, comment._id, { ...comment, content })
    const newPost = { ...post, comments: newComments }

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    try {
        let res = await patchDataAPI(`comment/${comment._id}`, { content }, auth.token)
        // console.log(res);

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const likeComment = ({ comment, post, auth }) => async (dispatch) => {

    //*updating on front side start*************************===>
    //tek kommentin icindeki like guncellenir
    const newComment = { ...comment, likes: [...comment.likes, auth.user] }
    //  post.comments.map(item => (item._id === comment._id ? newComment : item));
    //bir postun icinde sayili commentler var Ve her bini map ederek yuxardaki komment ile yer degisdiririk
    //cunki newCommente yeni bir like eklenilib
    const newComments = EditData(post.comments, comment._id, newComment)
    //sonra o postun icindede genel commentleri update edirik
    const newPost = { ...post, comments: newComments }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    //*updating on front side finish*************************===>

    try {
        let res = await patchDataAPI(`comment/${comment._id}/like`, null, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const unLikeComment = ({ comment, post, auth }) => async (dispatch) => {

    const newComment = { ...comment, likes: DeleteData(comment.likes, auth.user._id) }

    const newComments = EditData(post.comments, comment._id, newComment)

    const newPost = { ...post, comments: newComments }

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })

    try {
        let res = await patchDataAPI(`comment/${comment._id}/unlike`, null, auth.token)
        // console.log(res);

    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

//27.32  https://www.youtube.com/watch?v=IzChpzKBCAY&list=PLs4co9a6NhMyAfSnDg1MKGwLdLx0OA07d&index=24
export const deleteComment = ({ post, comment, auth, socket }) => async (dispatch) => {

    //biz her reply edende Reply icine comment._id seklinde deger atiyirdik
    //inputCommente componentine bax
    //Yani burdada o spesifik commenti tapiriq (butun o post commentlerinin icinnen)
    const deleteArr = [...post.comments.filter(cm => cm.reply === comment._id), comment]

    const newPost = {
        ...post,
        comments: post.comments.filter(cm => !deleteArr.find(da => cm._id === da._id))
    }
    // console.log({ post });
    // console.log({ deleteArr });

    // console.log({ newPost });

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })


    try {
        deleteArr.forEach(item => { deleteDataAPI(`comment/${item._id}`, auth.token)})
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }

}