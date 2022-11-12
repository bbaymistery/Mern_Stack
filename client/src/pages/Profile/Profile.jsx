import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/index'
import { getMyProfileInfromation } from '../../redux/apiCalls';
import profileImage from '../../images/Profile.png'
import './Profile.css'
import Loader from '../../components/Loader/Loader'
const Profile = () => {
    // const { currentUser: { status, user } } = useSelector((state) => state.user);
    const myProfileState = useSelector((state) => state.profile)
    const dispatch = useDispatch()

    useEffect(() => {
        getMyProfileInfromation(dispatch)
    }, [dispatch])
    // console.log(myProfileState);
    if (!myProfileState.myProfileStatus) {
        return <Loader />
    }
    return (
        <div>
            <Navbar />
            {myProfileState?.myProfileStatus ?
                <>
                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            <img src={myProfileState.myProfile?.avatar?.url ? myProfileState.myProfile?.avatar?.url : profileImage} alt={myProfileState.myProfile?.name} />
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Name</h4>
                                <p>{myProfileState.myProfile?.name}</p>
                            </div>
                            <div>
                                <h4>Lastname</h4>
                                <p>{myProfileState.myProfile?.lastname}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{myProfileState.myProfile?.email}</p>
                            </div>
                            <div>
                                <h4>Username</h4>
                                <p>{myProfileState.myProfile?.username}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(myProfileState.myProfile?.createdAt).substr(0, 10)}</p>
                            </div>

                            <div>
                                <Link to="/orders/me">My Orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </>
                :
                ""}
        </div>
    )
}

export default Profile