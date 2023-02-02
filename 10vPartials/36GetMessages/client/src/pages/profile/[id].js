import React, { useEffect, useState, } from 'react'

import Info from '../../components/profile/Info'

import { useSelector, useDispatch } from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'
import { useParams } from 'react-router-dom'
import Posts from '../../components/profile/Posts'
import Saved from '../../components/profile/Saved'


const Profile = () => {
    const { profile, auth } = useSelector(state => state)
    const dispatch = useDispatch()
    //this id is user id
    const { id } = useParams()
    const [saveTab, setSaveTab] = useState(false)

    useEffect(() => {
        //ilk serefirnde oz profilimi getirer eger oz profilime tiklarsa
        //yada basga profil secersem baskasin getirer
        if (profile.ids.every(item => item !== id)) {
            dispatch(getProfileUsers({ id, auth }))
        }
    }, [id, auth, dispatch, profile.ids])

    return (
        <div className="profile">
            <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

            {auth.user._id === id &&
                <div className="profile_tab">
                    <button className={saveTab ? '' : 'active'} onClick={() => setSaveTab(false)}>Posts</button>
                    <button className={saveTab ? 'active' : ''} onClick={() => setSaveTab(true)}>Saved</button>
                </div>}

            {profile.loading
                ? <img className="d-block mx-auto" src={LoadIcon} alt="loading" />
                : <>{saveTab ? <Saved auth={auth} dispatch={dispatch} /> : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />}</>}
        </div>
    )
}

export default Profile
