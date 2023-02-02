import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
// import UserCard from '../UserCard'
import LoadIcon from '../../images/loading.gif'
import UserCard from '../UserCard'

const Search = () => {
    const [users, setUsers] = useState([])
    const [load, setLoad] = useState(false)
    const [search, setSearch] = useState('')

    const dispatch = useDispatch()
    const { auth } = useSelector(state => state)


    const handleSearch = async (e) => {
        e.preventDefault()
        if (!search) return;

        try {
            setLoad(true)
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            // req.query.username     seklinde backenden alrq

            setUsers(res.data.users)
            setLoad(false)
        } catch (err) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } })
        }
    }

    const handleClose = () => {
        setSearch('')
        setUsers([])
    }
    const handleSearching = (e) => {
        if (e.target.value.length === 0) setUsers([])
        setSearch(e.target.value.toLowerCase().replace(/ /g, ''))
    }


    return (
        <form className="search_form" onSubmit={handleSearch}>
            <input type="text" name="search" style={{ fontSize: "14px", padding: "10px 4px" }} value={search} id="search" title="Enter to Search" onChange={(e) => handleSearching(e)} />
            <div className="search_icon" style={{ opacity: search ? 0 : 0.3, top: "60%" }}><span>Enter to Search</span> </div>
            {search && (<div className="close_search" onClick={handleClose} style={{ opacity: users.length === 0 ? 0 : 1, fontSize: "24px", top: "18px" }} >  &times; </div>)}
            <button type="submit" style={{ display: 'none' }}>Search</button>
            {load && <img style={{ transform: "translateY(0%)" }} className="loading" src={LoadIcon} alt="loading" />}
            <div className="users"> {search && users?.map(user => (<UserCard key={user._id} user={user} border="border" handleClose={handleClose} />))} </div>
        </form>
    )
}

export default Search
