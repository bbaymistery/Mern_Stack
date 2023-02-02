import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GLOBALTYPES } from "./redux/actions/globalTypes"
import { NOTIFY_TYPES } from "./redux/actions/notifyAction"
import audiobell from './audio/got-it-done-613.mp3'
import { POST_TYPES } from "./redux/actions/postAction"
import { MESS_TYPES } from "./redux/actions/messageAction"
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

      //her bildirim gelende bu ses cixar
      if (notify.sound) audioRef.current.play()
      spawnNotification(
        msg.user.username + ' ' + msg.text,
        msg.user.avatar,
        msg.url,
        'V-NETWORK'
      )
    })

    return () => socket.off('createNotifyToClient')
  }, [socket, dispatch, notify.sound])

  useEffect(() => {
    socket.on('removeNotifyToClient', msg => dispatch({ type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg }))
    return () => socket.off('removeNotifyToClient')
  }, [socket, dispatch])




  //!Message
  useEffect(() => {
    socket.on('addMessageToClient', msg => {
      dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg })
      //eger yeni bir user ekleyib mesaj yazsak Asaguidakini yaziriqki canli  gorunsun
      //dk 16.57
      //https://www.youtube.com/watch?v=KQ_xDW9z_dQ&list=PLs4co9a6NhMyAfSnDg1MKGwLdLx0OA07d&index=41
      dispatch({
        type: MESS_TYPES.ADD_USER,
        payload: {
          ...msg.user,
          text: msg.text,
          media: msg.media
        }
      })
    })

    return () => socket.off('addMessageToClient')
  }, [socket, dispatch])


  //!Check User Online / Offline
  useEffect(() => {
    socket.emit('checkUserOnline', auth.user)
  }, [socket, auth.user])

  useEffect(() => {
    socket.on('checkUserOnlineToMe', data => {
      //burda foreach ediririk
      data.forEach(item => {
        if (!online.includes(item.id)) {
          dispatch({ type: GLOBALTYPES.ONLINE, payload: item.id })
        }
      })
    })

    return () => socket.off('checkUserOnlineToMe')
  }, [socket, dispatch, online])





  useEffect(() => {
    //burda foreach etmirik

    socket.on('checkUserOnlineToClient', id => {
      if (!online.includes(id)) {
        dispatch({ type: GLOBALTYPES.ONLINE, payload: id })
      }
    })

    return () => socket.off('checkUserOnlineToClient')
  }, [socket, dispatch, online])


  //?Check User Offline
  useEffect(() => {
    socket.on('CheckUserOffline', id => {
      dispatch({ type: GLOBALTYPES.OFFLINE, payload: id })
    })

    return () => socket.off('CheckUserOffline')
  }, [socket, dispatch])

  //!Call User
  useEffect(() => {
    socket.on('callUserToClient', data => {
      // console.log(data )
      dispatch({ type: GLOBALTYPES.CALL, payload: data })
    })

    return () => socket.off('callUserToClient')
  }, [socket, dispatch])

  useEffect(() => {
    socket.on('userBusy', data => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: `${call.username} is busy!` } })
    })

    return () => socket.off('userBusy')
  }, [socket, dispatch, call])

  return (
    <>
      <audio controls ref={audioRef} style={{ display: 'none' }} >
        <source src={audiobell} type="audio/mp3" />
      </audio>
    </>
  )
}

export default SocketClient
