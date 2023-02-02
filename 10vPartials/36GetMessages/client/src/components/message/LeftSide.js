import React, { useState, useEffect, useRef } from 'react'
import UserCard from '../UserCard'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { useHistory, useParams } from 'react-router-dom'
import { getConversations, MESS_TYPES } from '../../redux/actions/messageAction'


const LeftSide = () => {
    const { auth, message } = useSelector(state => state)
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])

    const history = useHistory()
    const { id } = useParams()
    const pageEnd = useRef()

    const handleSearch = async (e) => {
        //headerdeki gibi
        e.preventDefault()
        if (!search) return setSearchUsers([]);

        try {
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            // req.query.username     seklinde backenden alrq

            setSearchUsers(res.data.users)
        } catch (err) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
        }
    }


    const handleAddUser = (user) => {
        setSearch('')
        setSearchUsers([])
        dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...user, text: '', media: [] } })
        return history.push(`/message/${user._id}`)

    }

    const isActive = (user) => {
        if (id === user._id) return 'active';
        return ''
    }

    useEffect(() => {
        if (message.firstLoad) return;
        dispatch(getConversations({ auth }))
    }, [dispatch, auth, message.firstLoad])

    return (
        <>
            <form className="message_header" onSubmit={handleSearch} >
                <input type="text" value={search} placeholder="Enter to Search..." onChange={e => setSearch(e.target.value)} />
                <button type="submit" style={{ display: 'none' }}>Search</button>
            </form>
            <div className="message_chat_list">
                <div className="message_chat_list">
                    {searchUsers.length !== 0 ?
                        <>{searchUsers.map(user => <div key={user._id} className={`message_user ${isActive(user)}`} onClick={() => handleAddUser(user)}> <UserCard user={user} /> </div>)} </>
                        : <>
                            {/*  dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...user, text: '', media: [] } })
                        bununla ekliyoruz ve sonra render edilir
                        */}
                            {message?.users.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`} onClick={() => handleAddUser(user)}>
                                    <UserCard user={user} msg={true}>
                                        <i className="fas fa-circle text-success" />

                                    </UserCard>
                                </div>))}</>}

                    <button ref={pageEnd} style={{ opacity: 0 }} >Load More</button>
                </div>
                <button ref={pageEnd} style={{ opacity: 0 }} >Load More</button>
            </div>
        </>
    )
}

export default LeftSide