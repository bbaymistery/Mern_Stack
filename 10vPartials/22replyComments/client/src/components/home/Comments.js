import React, { useEffect, useState } from 'react'
import CommentDisplay from './comments/CommentDisplay'

const Comments = ({ post }) => {
  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState([])
  const [next, setNext] = useState(2)
  const [replyComments, setReplyComments] = useState([])

  useEffect(() => {
    const newCm = post.comments.filter(cm => !cm.reply)
    setComments(newCm)
    setShowComments(newCm.slice(newCm.length - next))
  }, [post.comments, next])


  useEffect(() => {
    const newRep = post.comments.filter(cm => cm.reply)
    setReplyComments(newRep)
  }, [post.comments])

  //gecici olarak kapatdik cunki mantk sehfdi tam commentleri goremmirik 
  //showCommments yerine comments ekledik 
  return (
    <div className='comments'>
      {comments.map((comment, index) => (
        <CommentDisplay key={index} comment={comment} post={post}
          replyCm={replyComments.filter(item => item.reply === comment._id)} />
      ))}
  {/* // !burdaki  mentig sehfdi commentler cox olanda gosterilmir Bunu sonra oxuyanda iyice arasdir ! */}

      {comments.length - next > 0 ?
        <div className="p-2 border-top" style={{ cursor: 'pointer', color: 'crimson', fontSize: "13px" }} onClick={() => setNext(next + 10)}>
          See more comments...
        </div>

        : comments.length > 2 &&
        <div className="p-2 border-top" style={{ cursor: 'pointer', color: 'crimson', fontSize: "13px" }} onClick={() => setNext(2)}>
          Hide comments...
        </div>}
    </div>
  )
}

export default Comments