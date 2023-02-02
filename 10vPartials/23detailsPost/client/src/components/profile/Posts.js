import React, { useEffect, useState } from 'react'
import PostThumb from '../PostThumb'

const Posts = ({ id, auth, profile, dispatch }) => {
  const [posts, setPosts] = useState([])
  const [result, setResult] = useState(9)
  const [load, setLoad] = useState(false)
  useEffect(() => {
    profile.posts.forEach(data => {
      if (data._id === id) {
        setResult(data.result)
        setPosts(data.posts)
      }
    })
  }, [profile.posts, id])

  const handleLoadMore = async () => {
    setLoad(true)

    setLoad(false)
  }
  return (
    <div>
      <PostThumb posts={posts} result={result} />

    </div>
  )
}

export default Posts