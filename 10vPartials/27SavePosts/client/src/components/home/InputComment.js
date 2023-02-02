import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../redux/actions/commentAction'
import Icons from '../Icons'

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState('')

  const { auth, theme } = useSelector(state => state)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false)
      return;
    }
    
    setContent('')
    // commentCtrl da tag ve repllayda var ama simdilik gondermiyoruz 
    const newComment = {
      content,
      likes: [],
      user: auth.user,//kim cvb verirse odur 
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,//  hansi commentden sohbet gedirse odur 
      tag: onReply && onReply.user //burda kime cvb veriremse tag dir 

    }

    dispatch(createComment({ post, newComment, auth }))
    if (setOnReply) return setOnReply(false);

  }

  return (
    <form className="card-footer comment_input" onSubmit={handleSubmit} style={{ height: "50px" }} >
      {children}
      <input
        type="text"
        value={content}
        placeholder="Add your comments..."
        onChange={e => setContent(e.target.value)}
        style={{
          filter: theme ? 'invert(1)' : 'invert(0)',
          color: theme ? 'white' : '#111', background: theme ? 'rgba(0,0,0,.03)' : '',
          fontSize: "13px"
        }} />

      <div style={{ marginBottom: "16px" }}>
        <Icons setContent={setContent} content={content} theme={theme} />
      </div>
      &nbsp;
      &nbsp;
      <button type="submit" className="postBtn" style={{ fontSize: "13px" }} >
        Post
      </button>
    </form>
  )
}

export default InputComment