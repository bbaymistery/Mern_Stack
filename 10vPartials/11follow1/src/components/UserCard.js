import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserCard = ({ children, user, border, handleClose, setShowFollowers, setShowFollowing, msg }) => {

    const { theme } = useSelector(state => state)

    const handleCloseAll = () => {
        if (handleClose) handleClose()
        if (setShowFollowers) setShowFollowers(false)
        if (setShowFollowing) setShowFollowing(false)
    }

    const showMsg = (user) => {
        return (
            <>
                <div style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}>
                    {user.text}
                </div>
                {user.media.length > 0 && <div> {user.media.length} <i className="fas fa-image" /> </div>}

                {
                    user.call &&
                    <span className="material-icons">
                        {
                            user.call.times === 0
                                ? user.call.video ? 'videocam_off' : 'phone_disabled'
                                : user.call.video ? 'video_camera_front' : 'call'
                        }
                    </span>
                }
            </>
        )
    }


    return (
        <div className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}>
            <div>
                <Link to={`/profile/${user._id}`} onClick={handleCloseAll} className="d-flex align-items-center">

                    <Avatar src={user.avatar} size="small-avatar" />

                    <div className="ml-2" style={{ transform: 'translateY(-2px)' }}>
                        <span style={{ fontSize: "12px" }} className="d-block">{user.username}</span>
                        <span style={{ fontSize: "12px",marginTop:"10px" }} className="d-block">  {msg ? showMsg(user) : user.fullname}</span>

                    
                    </div>
                </Link>
            </div>
            {children}
        </div>
    )
}

export default UserCard
