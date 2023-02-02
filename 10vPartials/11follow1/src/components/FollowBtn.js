import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { follow, unfollow, } from '../redux/actions/profileAction'
//unfollow
const FollowBtn = ({ user }) => {
    const [followed, setFollowed] = useState(false)

    const { auth, profile, socket } = useSelector(state => state)
    const dispatch = useDispatch()

    const [load, setLoad] = useState(false)
    //mesela herhansi bir profili arayb uzerine tikladigimizda eger onu izliyorsak
    //follow sozu degisilib followed olar 
    useEffect(() => {
        if (auth.user.following.find(item => item._id === user._id))
            setFollowed(true)

        return () => setFollowed(false)
    }, [auth.user.following, user._id])

    const handleFollow = async () => {
        setFollowed(true)
        dispatch(follow({ users: profile.users, user, auth }))

        // if (auth.user.following.find(item => item._id === user._id)) {
        // }
        // return () => setFollowed(false
    }

    const handleUnFollow = async () => {
        // if (load) return;
        setFollowed(false)
        // setLoad(true)
        dispatch(unfollow({ users: profile.users, user, auth }))
        // setLoad(false)
    }

    return (
        <>
            {followed ? <button className="btn btn-outline-danger" onClick={handleUnFollow}> UnFollow</button>
                : <button className="btn btn-outline-info" onClick={handleFollow}> Follow </button>}
        </>
    )
}

export default FollowBtn
