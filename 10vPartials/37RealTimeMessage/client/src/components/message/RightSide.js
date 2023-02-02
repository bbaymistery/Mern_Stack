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
import { addMessage, getMessages, MESS_TYPES } from '../../redux/actions/messageAction'
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
  const pageEnd = useRef()

  const [page, setPage] = useState(0)
  const [isLoadMore, setIsLoadMore] = useState(0)

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
      recipient: id,//recipient mesaji gonderdigimiz wexs
      text,
      media: newArr,
      createdAt: new Date().toISOString()
    }

    setLoadMedia(false)
    //await yazrqki bu islem tamamlansn sonra o birine gecsin
    await dispatch(addMessage({ msg, auth, socket }))
    //mesaj gonderilennen sonra asagiya scrollasin
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
    if (newUser) {
      setUser(newUser)
    }

  }, [message.users, id])

  useEffect(() => {
    // const newData = message.data.find(item => item._id === id)
    const newData = message.data.filter(item => item.sender === id || item.sender === auth.user._id)

    if (newData) {
      setData(newData)

    }
  }, [message.data, id, auth.user._id])

  useEffect(() => {
    const getMessagesData = async () => {
      //enter searchin altinda userler gelennen sonra her bir user arasinda gecit
      // edende ilk bos sehfe gorsensin deye asagidakini yazdk
      dispatch({ type: MESS_TYPES.GET_MESSAGES, payload: { messages: [] } })
      setPage(1) //niye ? 
      await dispatch(getMessages({ auth, id }))
      if (refDisplay.current) {
        //gecit edende asagiya scollasin(sagdaki mesaj kutusu)
        setTimeout(() => {

          refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }, 50)
      }
    }
    getMessagesData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id,])
  // Load More
  useEffect(() => {

    //her yuxari scrolladigimizda 9tane mesaj geler
    const observer = new IntersectionObserver(entries => {

      if (entries[0].isIntersecting) {
        console.log("calisiyorum 1");
        setPage(p => p + 1)

      }
    }, { threshold: 0.1 })

    observer.observe(pageEnd.current)
  }, [setPage])
  // Load More
  useEffect(() => {
    //her yuxari scrolladigimizda 9tane mesaj geler

    if (message.resultData >= (page - 1) * (9) && page > 1) {
      dispatch(getMessages({ auth, id, page }))
    }
  }, [message.resultData, auth, dispatch, id, page])


  //yazi yazmaya basloyanda asgi scrollasin
  useEffect(() => {
    if (refDisplay.current) refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })

  }, [text])
  return (
    <>
      <div className="message_header" style={{ cursor: 'pointer' }}>
        {user.length !== 0 && <UserCard user={user} >
          <i style={{ fontSize: "13px" }} className="fas fa-trash text-danger"></i>
        </UserCard>}
      </div>

      <div className="chat_container">
        <div className="chat_display" ref={refDisplay}>

          <button style={{ marginTop: '-25px', opacity: 0 }} ref={pageEnd}>
            Load more
          </button>

          {/* messaglarin gorunmesi o ve men */}
          {
            data.map((msg, index) => (
              <div key={index}>
                {msg.sender !== auth.user._id &&
                  <div className="chat_row other_message">
                    <MsgDisplay user={user} msg={msg} theme={theme} />
                  </div>}

                {msg.sender === auth.user._id &&
                  <div className="chat_row you_message">
                    {/* setDATA YANINDAKI DATA NI BURDA KULLANDK */}
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