import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GLOBALTYPES } from "./redux/actions/globalTypes"
import { NOTIFY_TYPES } from "./redux/actions/notifyAction"
import { POST_TYPES } from "./redux/actions/postAction"
const spawnNotification = (body, icon, url, title) => {
  let options = { body, icon }
  let n = new Notification(title, options)

  n.onclick = e => {
    e.preventDefault()
    window.open(url, '_blank')
  }
}


const SocketClient = () => {
  const { auth, socket, notify, online, call } = useSelector(state => state)
  const dispatch = useDispatch()
  const audioRef = useRef()

  // joinUser
  useEffect(() => socket.emit('joinUser', auth.user), [socket, auth.user])

  //!Likes
  /*
   socket serverde "likeToClient "  i  yazb bura gecid eledik
   dk 24.50 e bak Asahidakini yazannan sonra nece oldu bax.
   https://www.youtube.com/watch?v=TvdlzevMpxY&list=PLs4co9a6NhMyAfSnDg1MKGwLdLx0OA07d&index=30
  */
  useEffect(() => {
    socket.on('likeToClient', newPost => dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost }))
    return () => socket.off('likeToClient')
  }, [socket, dispatch])

  useEffect(() => {
    socket.on('unLikeToClient', newPost => dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost }))
    return () => socket.off('unLikeToClient')
  }, [socket, dispatch])


  //!Comments
  useEffect(() => {
    socket.on('createCommentToClient', newPost => dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost }))
    return () => socket.off('createCommentToClient')
  }, [socket, dispatch])

  useEffect(() => {
    socket.on('deleteCommentToClient', newPost => dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost }))
    return () => socket.off('deleteCommentToClient')
  }, [socket, dispatch])


  //!Follow
  useEffect(() => {
    socket.on('followToClient', newUser => dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } }))
    return () => socket.off('followToClient')
  }, [socket, dispatch, auth])

  useEffect(() => {
    socket.on('unFollowToClient', newUser => dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } }))
    return () => socket.off('unFollowToClient')
  }, [socket, dispatch, auth])


  //!Notification
  useEffect(() => {
    socket.on('createNotifyToClient', msg => {
      dispatch({ type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg })
    })

    return () => socket.off('createNotifyToClient')
  }, [socket, dispatch,])

  useEffect(() => {
    socket.on('removeNotifyToClient', msg => dispatch({ type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg }))
    return () => socket.off('removeNotifyToClient')
  }, [socket, dispatch])
  return (
    <div></div>
  )
}

export default SocketClient
