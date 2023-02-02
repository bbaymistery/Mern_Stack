import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import LoadIcon from '../../images/loading.gif'
import { getSuggestions } from '../../redux/actions/suggestionsAction'

const RightSideBar = () => {
    const { auth, suggestions } = useSelector(state => state)
    const dispatch = useDispatch()

//https://www.youtube.com/watch?v=4QiR1V_C9yg&list=PLs4co9a6NhMyAfSnDg1MKGwLdLx0OA07d&index=28

    return (
        <div className="mt-3">
            <UserCard user={auth.user} />

            <div className="d-flex  align-items-center my-2">
                <h5 style={{ fontSize: "12px", }} className="text-danger">Suggestions for you</h5>
                {!suggestions.loading && <i className="fas fa-redo" style={{ cursor: 'pointer', fontSize: "12px", marginLeft: '10px', marginTop: "-8px" }} onClick={() => dispatch(getSuggestions(auth.token))} />}
            </div>

            {suggestions.loading
                ? <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
                : <div className="suggestions">
                    {suggestions.users.map(user => (
                        <UserCard key={user._id} user={user} > <FollowBtn user={user} /> </UserCard>
                    ))}
                </div>
            }

            <div style={{ opacity: 0.5 }}>
                <a href="https://www.youtube.com/c/DevATHTML" target="_blank" rel="noreferrer" style={{ wordBreak: 'break-all', fontSize: "12px" }} >
                    https://www.youtube.com/c/DevATHTML
                </a>
                <p style={{ wordBreak: 'break-all', fontSize: "12px" }} className="d-block">
                    Welcome to our channel "DevAT-VietNam"
                </p>

                <p style={{ wordBreak: 'break-all', fontSize: "12px" }}>
                    &copy; 2021 V-NETWORK FROM DEV A.T VIET NAM
                </p>
            </div>

        </div>
    )
}

export default RightSideBar
