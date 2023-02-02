import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDiscoverPosts, DISCOVER_TYPES } from '../redux/actions/discoverAction'
import LoadIcon from '../images/loading.gif'
import PostThumb from '../components/PostThumb'
import { getDataAPI } from '../utils/fetchData'
import LoadMoreBtn from '../components/LoadMoreBtn'
// https://www.youtube.com/watch?v=DdhioMB0Quc&list=PLs4co9a6NhMyAfSnDg1MKGwLdLx0OA07d&index=26
const Discover = () => {
  const { auth, discover } = useSelector(state => state)
  const dispatch = useDispatch()

  const [load, setLoad] = useState(false)
  useEffect(() => {
    if (!discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.token))
    }
  }, [dispatch, auth.token, discover.firstLoad])
  const handleLoadMore = async(par) => {
    // setLoad(true)
   //burasi calismaz cunki Back enndde agreevate calismadi
    // const res = await getDataAPI(`post_discover?num=${discover.page * 9}`, auth.token)
    // dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data })
    // setLoad(false)
  }
  return (
    <div>
      {discover.loading ? <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" /> : <PostThumb posts={discover.posts} result={discover.result} />}

      {load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />}

      {/* {!discover.loading && <LoadMoreBtn result={discover.result} page={discover.page} load={load} handleLoadMore={handleLoadMore} />} */}

    </div>
  )
}

export default Discover