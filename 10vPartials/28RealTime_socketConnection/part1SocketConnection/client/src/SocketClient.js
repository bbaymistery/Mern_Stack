import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"



//11.27
const SocketClient = () => {
  const { auth, socket, notify, online, call } = useSelector(state => state)
  const dispatch = useDispatch()
  // joinUser
  useEffect(() => socket.emit('joinUser', auth.user), [socket, auth.user])
  return (
    <div>SocketClient</div>
  )
}

export default SocketClient
