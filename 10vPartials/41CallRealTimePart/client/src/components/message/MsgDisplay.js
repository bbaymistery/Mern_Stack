import React from 'react'
import { imageShow, videoShow } from '../../utils/mediaShow'
import Avatar from '../Avatar'
import { deleteMessages } from '../../redux/actions/messageAction'
import { useSelector, useDispatch } from 'react-redux'

const MsgDisplay = ({ user, msg, theme, data }) => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    //mesaj silinende sol terefde son mesaj silinmir ona bakarsin
    const handleDeleteMessages = () => {
        if (!data) return;
        // bir sonraki turda funksyonalliq calisacag simdilik css kismini ekledim
        if (window.confirm('Do you want to delete?')) dispatch(deleteMessages({ msg, data, auth }))

    }

    return (
        <>
            <div className='chat_title' style={{ display: 'flex', alignItems: "center" }}>
                <Avatar src={user.avatar} size="small-avatar" />
                <span style={{ fontSize: '14px' }}>{user.username}</span>
            </div>
            <div className="you_content">
                {user._id === auth.user._id && <i className="fas fa-trash text-danger" onClick={handleDeleteMessages} />}
                {msg.text &&
                    <div className="chat_text" style={{ filter: theme ? 'invert(1)' : 'invert(0)', fontSize: "14px" }}>
                        {msg.text}
                    </div>}
                {msg.media.map((item, index) => (
                    <div key={index}>
                        {item.url.match(/video/i) ? videoShow(item.url, theme) : imageShow(item.url, theme)}
                    </div>))}
            </div>
            <div className="chat_time">{new Date(msg.createdAt).toLocaleString()}  </div>
        </>
    )
}

export default MsgDisplay