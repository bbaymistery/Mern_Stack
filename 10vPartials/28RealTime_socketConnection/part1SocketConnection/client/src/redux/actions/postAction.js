import { GLOBALTYPES } from "./globalTypes"
import { imageUpload } from '../../utils/imageUpload'
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI, } from '../../utils/fetchData'

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
        // console.log(res);

        dispatch({ type: POST_TYPES.CREATE_POST, payload: { ...res.newPost, user: auth.user } })
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const getPosts = (token) => async (dispatch) => {
    try {
        dispatch({ type: POST_TYPES.LOADING_POST, payload: true })
        const res = await getDataAPI('posts', token)

        dispatch({ type: POST_TYPES.GET_POSTS, payload: { ...res.data, page: 2 } })
        dispatch({ type: POST_TYPES.LOADING_POST, payload: false })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const updatePost = ({ content, images, auth, status }) => async (dispatch) => {
    let media = []
    //herhalda new image olanda url dee bir sey olmur
    //ona gore !img.url e esit olmayanlar newImgOlarakKayda gecer
    const imgNewUrl = images.filter(img => !img.url)
    const imgOldUrl = images.filter(img => img.url)

    //yani eger degisiklik yoxdursa
    if (status.content === content && imgNewUrl.length === 0 && imgOldUrl.length === status.images.length) return;

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
        if (imgNewUrl.length > 0) media = await imageUpload(imgNewUrl)

        let url = `post/${status._id}`
        let body = { content, images: [...imgOldUrl, ...media] }
        const res = await patchDataAPI(url, body, auth.token)

        dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost })

        dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } })
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}
export const likePost = ({ post, auth, socket }) => async (dispatch) => {
    //updating on front side
    const newPost = { ...post, likes: [...post.likes, auth.user] }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    try {
        let a = await patchDataAPI(`post/${post._id}/like`, null, auth.token)
        console.log(a, "likeee");
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}
/*
!CardFotterDeki useEffecti yazmamizin sebebi
! front terefde update eidirikki direk girmizi ike isaresi dussun

   Sehfe acilanda eger menim id im karsi terefin
  postlarinin like nin icinde var ise kirmizi olarak isaretlenir
  useEffect(() => {
    if (post.likes.find(like => like._id === auth.user._id)) {
      setIsLike(true)
    } else {
      setIsLike(false)
    }
  }, [post.likes, auth.user._id])
*/
export const unLikePost = ({ post, auth, socket }) => async (dispatch) => {
    //updating on front side
    const newPost = { ...post, likes: post.likes.filter(like => like._id !== auth.user._id) }
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost })
    try {
        let res = await patchDataAPI(`post/${post._id}/unlike`, null, auth.token)
        console.log(res, "inlike");
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const getPost = ({ detailPost, id, auth }) => async (dispatch) => {
    if (detailPost.every(post => post._id !== id)) {
        try {
            const res = await getDataAPI(`post/${id}`, auth.token)
            dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post })
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.msg }
            })
        }
    }
}
export const deletePost = ({ post, auth, socket }) => async (dispatch) => {
    dispatch({ type: POST_TYPES.DELETE_POST, payload: post })
    try {
        const res = await deleteDataAPI(`post/${post._id}`, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const savePost = ({ post, auth }) => async (dispatch) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, post._id] }
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })
    try {
        await patchDataAPI(`savePost/${post._id}`, null, auth.token)
    } catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
    }
}

export const unSavePost = ({ post, auth }) => async (dispatch) => {
    const newUser = { ...auth.user, saved: auth.user.saved.filter(id => id !== post._id) }
    dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } })
    try {
        await patchDataAPI(`unSavePost/${post._id}`, null, auth.token)
    } catch (err) {
        dispatch({  type: GLOBALTYPES.ALERT,  payload: { error: err.response.data.msg }  })
    }
}