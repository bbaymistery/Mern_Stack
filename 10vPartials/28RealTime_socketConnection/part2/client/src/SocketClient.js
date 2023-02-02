import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GLOBALTYPES } from "./redux/actions/globalTypes"
import { POST_TYPES } from "./redux/actions/postAction"


const SocketClient = () => {
  const { auth, socket, notify, online, call } = useSelector(state => state)
  const dispatch = useDispatch()
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
  return (
    <div>SocketClient</div>
  )
}

export default SocketClient
