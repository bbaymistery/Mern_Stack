import React, { useState, useEffect } from 'react'
import Avatar from '../Avatar'
import FollowBtn from '../FollowBtn'
import EditProfile from './EditProfile'

const Info = ({ id, auth, profile, dispatch }) => {
    const [userData, setUserData] = useState([])
    const [onEdit, setOnEdit] = useState(false)
    useEffect(() => {
        if (id === auth.user._id) {
            setUserData([auth.user])
        } else {
            const newData = profile.users.filter(user => user._id === id)
            setUserData(newData)
        }
    }, [id, auth, dispatch, profile.users])
    console.log(userData, "USERdata");
    console.log(auth, "auth");


    return (
        <div className="info">
            {userData.map((user, index) => (
                <div className="info_container" key={index}>
                    <Avatar src={user.avatar} size="supper-avatar" />

                    <div className="info_content">
                        <div className="info_content_title">
                            <h2>{user.username}</h2>
                            {user._id === auth.user._id ? <button className="btn btn-outline-info" onClick={() => setOnEdit(true)}> Edit Profile </button> : <FollowBtn user={user} />}
                        </div>

                        <div className="follow_btn">
                            <span style={{ fontSize: "13px" }} className="mr-4" >
                                {user.followers.length} Followers
                            </span>
                            <span style={{ fontSize: "13px" }} className="ml-4" >
                                {user.following.length} Following
                            </span>
                        </div>

                        <h6 >{user.fullname} <span className="text-danger">{user.mobile}</span></h6>
                        <p style={{ fontSize: "13px" }} className="m-0">{user.address} Qurtulus 93</p>
                        <h6 style={{ fontSize: "13px" }} className="m-0">{user.email}</h6>
                        <a style={{ fontSize: "13px" }} href={user.website} target="_blank" rel="noreferrer">
                            {user.website}
                        </a>
                        <p style={{ fontSize: "11px" }}>{user.story} </p>
                        {onEdit && <EditProfile setOnEdit={setOnEdit} />}
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default Info
