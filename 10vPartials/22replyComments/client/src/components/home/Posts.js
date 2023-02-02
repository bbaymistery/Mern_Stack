import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PostCard from '../PostCard'

import LoadIcon from '../../images/loading.gif'
import LoadMoreBtn from '../LoadMoreBtn'
import { getDataAPI } from '../../utils/fetchData'
import { POST_TYPES } from '../../redux/actions/postAction'
const Posts = () => {
    const { homePosts, auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    const [load, setLoad] = useState(false)
    return (
        <div className='posts'>
            {homePosts.posts.map(post => <PostCard key={post._id} post={post} theme={theme} />)}
        </div>
    )
}

export default Posts