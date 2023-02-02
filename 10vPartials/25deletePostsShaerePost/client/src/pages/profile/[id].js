import React, { useEffect, } from 'react'

import Info from '../../components/profile/Info'

import { useSelector, useDispatch } from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import { getProfileUsers } from '../../redux/actions/profileAction'//!
import { useParams } from 'react-router-dom'//!
import Posts from '../../components/profile/Posts'

//*NIda li olanlar Tutorialda eslinde bu bolum eklenilib
//*bundan once burda gormusense demeli onceden copy past edibsen
const Profile = () => {
    const { profile, auth } = useSelector(state => state)
    const dispatch = useDispatch()//!
    const { id } = useParams()//!
//this id is user id
    //!auth
    useEffect(() => {
        //ilk serefirnde oz profilimi getirer eger oz profilime tiklarsa
        //yada basga profil secersem baskasin getirer
        if (profile.ids.every(item => item !== id)) {
            dispatch(getProfileUsers({ id, auth }))
        }
    }, [id, auth, dispatch, profile.ids])

    return (
        <div className="profile">
            {profile.loading
                ? <img className='d-block mx-auto my-4' alt="s" src={LoadIcon} />
                : <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />}


            <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
        </div>
    )
}

export default Profile
