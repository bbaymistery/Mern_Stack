import React from 'react'
import Avatar from '../Avatar'

const MsgDisplay = ({ user }) => {
    return (
        <>
            <div className='chat_title' style={{display:'flex',alignItems:"center"}}>
                <Avatar src={user.avatar} size="small-avatar" />
                <span style={{fontSize:'14px'}}>{user.username}</span>
            </div>

            <div className="chat_text" style={{fontSize:'14px'}}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia molestias blanditiis sunt nesciunt sint, obcaecati dolores?

            </div>
            <div className="chat_time">
                April 2021
            </div>
        </>
    )
}

export default MsgDisplay