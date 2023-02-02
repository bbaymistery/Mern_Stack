import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Send from '../../../images/send.svg'
import { likePost, unLikePost } from '../../../redux/actions/postAction'
import { BASE_URL } from '../../../utils/config'
import LikeButton from '../../LikeButton'
import ShareModal from '../../ShareModal'

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)
  const [isShare, setIsShare] = useState(false)

  const [saved, setSaved] = useState(false)
  const { auth, theme } = useSelector(state => state)
  const dispatch = useDispatch()
  // Sehfe acilanda eger menim id im karsi terefin
  //postlarinin like nin icinde var ise kirmizi olarak isaretlenir
  useEffect(() => {
    if (post.likes.find(like => like._id === auth.user._id)) {
      setIsLike(true)
    } else {
      setIsLike(false)
    }
  }, [post.likes, auth.user._id])

  const handleLike = async () => {
    if (loadLike) return;
    setLoadLike(true)
    await dispatch(likePost({ post, auth, }))
    setLoadLike(false)
  }

  const handleUnLike = async () => {
    if (loadLike) return;
    setLoadLike(true)
    await dispatch(unLikePost({ post, auth, }))
    setLoadLike(false)
  }

  const handleUnSavePost = (par) => {

  }
  const handleSavePost = (par) => {

  }

  return (
    <div className='card_footer'>
      <div className="card_icon_menu">
        <div style={{ display: "flex", alignItems: "center" }}>
          <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
          <Link to={`/post/${post?._id}`} className="text-dark">  <i className="far fa-comment" /> </Link>
          <img src={Send} alt="Send" onClick={() => setIsShare(!isShare)} />
        </div>
        {saved ? <i className="fas fa-bookmark text-info" onClick={handleUnSavePost} /> : <i className="far fa-bookmark" onClick={handleSavePost} />}
      </div>
      <div className="d-flex justify-content-between">
        <h6 style={{ padding: '0 25px', cursor: 'pointer' }}>
          {post?.likes?.length} likes
        </h6>

        <h6 style={{ padding: '0 25px', cursor: 'pointer' }}>
          {post?.comments?.length} comments
        </h6>
      </div>
      {isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme} />}
    </div>
  )
}

export default CardFooter