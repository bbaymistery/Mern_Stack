import React from 'react'
import CommentCard from './CommentCard'

const CommentDisplay = ({ comment, post }) => {
    return (
        <div className='comment_display'>
            <CommentCard comment={comment} post={post} commentId={comment._id} >

            </CommentCard>
        </div>
    )
}

export default CommentDisplay