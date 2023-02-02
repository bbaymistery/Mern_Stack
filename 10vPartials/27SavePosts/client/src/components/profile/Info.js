import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Avatar from '../Avatar'
import FollowBtn from '../FollowBtn'
import EditProfile from './EditProfile'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import Followers from './Followers'
import Following from './Following'
//daha once auth,profile i   stateden id ni useParamsdan 
//dispatchi ise normal import ederek getrb .
//{{ id, auth, profile, dispatch }>BUNLAR eslinde yeni olandi}
const Info = ({ id, auth, profile, dispatch }) => {
    const [userData, setUserData] = useState([])
    const { theme } = useSelector(state => state)
    const [onEdit, setOnEdit] = useState(false)
    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)
    useEffect(() => {
        if (id === auth.user._id) {
            setUserData([auth.user])
        } else {
            const newData = profile.users.filter(user => user._id === id)
            setUserData(newData)
        }
    }, [id, auth, dispatch, profile.users])


    //eger followersin modali ve ya onEditin modali popup olarsa 
    //otomatikmen Appjsde  status|| modal &&mode     true olur 
    useEffect(() => {
        if (showFollowers || showFollowing || onEdit) {
            dispatch({ type: GLOBALTYPES.MODAL, payload: true })
        } else {
            dispatch({ type: GLOBALTYPES.MODAL, payload: false })
        }
    }, [showFollowers, showFollowing, onEdit, dispatch])
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
                            <span style={{ fontSize: "13px" }} onClick={() => setShowFollowers(true)} className="mr-4" >
                                {user.followers.length} Followers
                            </span>
                            <span style={{ fontSize: "13px" }} onClick={() => setShowFollowing(true)} className="ml-4" >
                                {user.following.length} Following
                            </span>
                        </div>
                        <h6 >{user.fullname} <span  className={`${theme ? 'text-success' : 'text-danger'}`}>{user.mobile}</span></h6>
                        <p style={{ fontSize: "13px" }} className="m-0">{user.address} Qurtulus 93</p>
                        <h6 style={{ fontSize: "13px" }} className="m-0">{user.email}</h6>
                        <a style={{ fontSize: "13px" }} href={`https://www.${user.website}`} target="_blank" rel="noreferrer">
                            {user.website}
                        </a>
                        <p style={{ fontSize: "11px" }}>{user.story} </p>
                        {onEdit && <EditProfile setOnEdit={setOnEdit} />}

                        { showFollowers &&  <Followers  users={user.followers}  setShowFollowers={setShowFollowers} />  }
                        {   showFollowing &&  <Following users={user.following}  setShowFollowing={setShowFollowing} />  }
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default Info
