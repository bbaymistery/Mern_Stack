import React from 'react'
import CommentDisplay from './comments/CommentDisplay'

const Comments = ({post}) => {
  return (
    <div className='comments'>
      {post.comments.map((comment,index)=>(
           <CommentDisplay key={comment._id} comment={comment} post={post}/>
      ))}
    </div>
  )
}

export default Comments