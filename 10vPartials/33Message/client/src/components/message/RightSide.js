import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import UserCard from '../UserCard'
import MsgDisplay from './MsgDisplay'

const RightSide = () => {
  const { auth, message,} = useSelector(state => state)

  const { id } = useParams()
  const [user, setUser] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    const newUser = message.users.find(user => user._id === id)
    if (newUser) setUser(newUser)

  }, [message.users, id])

  return (
    <>
      <div className="message_header" style={{ cursor: 'pointer' }}>
        <UserCard user={user} >
          <i style={{ fontSize: "13px" }} className="fas fa-trash text-danger"></i>
        </UserCard>
      </div>

      <div className="chat_container">
        <div className="chat_display">
          <div className="chat_row other_messsage">
            <MsgDisplay user={user} />
          </div>
          <div className="chat_row you_message">
            <MsgDisplay user={auth.user} />
          </div>
          <form action="" className="chat_input">
            <input style={{fontSize:"13px"}} value={text} onChange={e => setText(e.target.value)} type="text" placeholder="Enter you message" />
            <button type="submit" disabled={text ? false : true} className="material-icons">
              near_me
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default RightSide