import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const FollowBtn = ({ user }) => {
    const [followed, setFollowed] = useState(false)

    const { auth, profile, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const [load, setLoad] = useState(false)

    // useEffect(() => {
    //     if(auth.user.following.find(item => item._id === user._id)){
    //         setFollowed(true)
    //     }
    //     return () => setFollowed(false)
    // }, [auth.user.following, user._id])

    const handleFollow = async () => {

    }

    const handleUnFollow = async () => {

    }

    return (
        <>
            {followed ? <button className="btn btn-outline-danger" onClick={handleUnFollow}> UnFollow</button>
                : <button className="btn btn-outline-info" onClick={handleFollow}> Follow </button>}
        </>
    )
}

export default FollowBtn
