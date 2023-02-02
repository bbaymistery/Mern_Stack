import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import UserCard from '../UserCard'
import MsgDisplay from './MsgDisplay'
import { imageUpload } from '../../utils/imageUpload'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import Icons from '../Icons'
import { imageShow, videoShow } from '../../utils/mediaShow'
import { addMessage } from '../../redux/actions/messageAction'
import LoadIcon from '../../images/loading.gif'

const RightSide = () => {
  const { auth, message, theme, socket } = useSelector(state => state)
  const dispatch = useDispatch()

  const { id } = useParams()
  const [user, setUser] = useState([])
  const [text, setText] = useState('')
  const [media, setMedia] = useState([])
  const [loadMedia, setLoadMedia] = useState(false)
  const [data, setData] = useState([])

  const refDisplay = useRef()



  //same as StatusModa;
  const handleChangeMedia = (e) => {
    const files = [...e.target.files]
    let err = ""
    let newMedia = []
    files.forEach(file => {
      if (!file) return err = "File does not exist."
      if (file.size > 1024 * 1024 * 5) return err = "The image/video largest is 5mb."
      return newMedia.push(file)
    })
    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
    setMedia([...media, ...newMedia])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim() && media.length === 0) return;
    setText('')
    setMedia([])
    setLoadMedia(true)

    let newArr = [];
    if (media.length > 0) newArr = await imageUpload(media)

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString()
    }

    setLoadMedia(false)
    await dispatch(addMessage({ msg, auth, socket }))
    if (refDisplay.current) refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })

  }
  //same as StatusModa;
  const handleDeleteMedia = (index) => {
    const newArr = [...media]
    newArr.splice(index, 1)
    setMedia(newArr)
  }
  useEffect(() => {
    const newUser = message.users.find(user => user._id === id)
    if (newUser) setUser(newUser)

  }, [message.users, id])
  useEffect(() => {
    const newData = message.data.find(item => item._id === id)
    if (newData) {
      setData(newData.messages)

    }
  }, [message.data, id])
  return (
    <>
      <div className="message_header" style={{ cursor: 'pointer' }}>
        {user.length !== 0 && <UserCard user={user} >
          <i style={{ fontSize: "13px" }} className="fas fa-trash text-danger"></i>
        </UserCard>}
      </div>

      <div className="chat_container" ref={refDisplay}>
        <div className="chat_display">
          {/* messaglarin gorunmesi o ve men */}
          {
            message.data.map((msg, index) => (
              <div key={index}>
                {msg.sender !== auth.user._id &&
                  <div className="chat_row other_message">
                    <MsgDisplay user={user} msg={msg} theme={theme} />
                  </div>}

                {msg.sender === auth.user._id &&
                  <div className="chat_row you_message">
                    <MsgDisplay user={auth.user} msg={msg} theme={theme} data={data} />
                  </div>}
                  {/* //message send tikliyannan sonra asagud a loading olar  */}
                {loadMedia && <div className="chat_row you_message"> <img src={LoadIcon} alt="loading" /> </div>}
              </div>))}


          <div className="show_media" style={{ display: media.length > 0 ? 'grid' : 'none' }} >
            {media.map((item, index) => (
              <div key={index} id="file_media">
                {item.type.match(/video/i) ? videoShow(URL.createObjectURL(item), theme) : imageShow(URL.createObjectURL(item), theme)}
                <span onClick={() => handleDeleteMedia(index)} >&times;</span>
              </div>))}
          </div>
          <form className="chat_input" onSubmit={handleSubmit} >
            <input type="text" placeholder="Enter you message..." value={text} onChange={e => setText(e.target.value)}
              style={{
                filter: theme ? 'invert(1)' : 'invert(0)',
                background: theme ? '#040404' : '',
                color: theme ? 'white' : '',
                fontSize: '14px'
              }} />

            <Icons setContent={setText} content={text} theme={theme} />

            <div className="file_upload">
              <i style={{ fontSize: "23px" }} className="fas fa-image text-danger" />
              <input type="file" name="file" id="file" multiple accept="image/*,video/*" onChange={handleChangeMedia} />
            </div>
            <button type="submit" className="material-icons" disabled={(text || media.length > 0) ? false : true}>
              near_me
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default RightSide