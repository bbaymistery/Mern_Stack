import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Send from '../../../images/send.svg'

const CardFooter = ({ post }) => {
  const [isShare, setIsShare] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleUnSavePost = (par) => {

  }
  const handleSavePost = (par) => {

  }
  return (
    <div className='card_footer'>
      <div className="card_icon_menu">
        <div>
          <i className='far fa-heart'></i>
          <Link to={`/post/${post?._id}`} className="text-dark">  <i className="far fa-comment" /> </Link>
          <img style={{ marginTop: '15px' }} src={Send} alt="Send" onClick={() => setIsShare(!isShare)} />
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

    </div>
  )
}

export default CardFooter