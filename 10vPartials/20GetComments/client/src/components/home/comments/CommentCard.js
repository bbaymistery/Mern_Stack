import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Avatar from '../../Avatar'
import { useSelector } from 'react-redux'
import LikeButton from '../../LikeButton'
import CommentMenu from './CommentMenu'

const CommentCard = ({ children, comment, post, commentId }) => {
    const { auth, theme } = useSelector(state => state)
    const [content, setContent] = useState('')
    const [readMore, setReadMore] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)
    const [onEdit, setOnEdit] = useState(false)

 

    //eger like olunubsa direk girmizi olarag geler
    useEffect(() => {
        setContent(comment.content)
        setIsLike(false)
        if (comment.likes.find(like => like._id === auth.user._id)) {
            setIsLike(true)
        }
    }, [comment, auth.user._id])


    //backend gosulmadan like eder
    const handleLike = async () => {
        if (loadLike) return;
        setIsLike(true)
        setLoadLike(true)
        setLoadLike(false)
    }

    //backend gosulmadan unlike eder
    const handleUnLike = async () => {
        if (loadLike) return;
        setIsLike(false)
        setLoadLike(true)
        setLoadLike(false)
    }

    //commenti yazb send edende direk gorunur olmuycak birinci
    //bulanti olcak sonr gorunur olcak
    const styleCard = {

        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? 'inherit' : 'none'
    }
    return (
        <div className='comment_card mt-2' style={styleCard} >
            <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
                <Avatar src={comment.user.avatar} size="small-avatar" />
                <h6 className="mx-1">{comment.user.username}</h6>
            </Link>
            <div className="comment_content">
                <div className="flex-fill" style={{
                    fontSize: "12px",
                    filter: theme ? 'invert(1)' : 'invert(0)',
                    color: theme ? 'white' : '#111',
                }}>
                    <span> {content.length < 100 ? content : readMore ? content + ' ' : content.slice(0, 100) + '....'}   </span>
                    {content.length > 100 && <span className="readMore" onClick={() => setReadMore(!readMore)}>   {readMore ? 'Hide content' : 'Read more'} </span>}

                    <div style={{ cursor: 'pointer' }}>
                        <small className="text-muted mr-3"> {moment(comment.createdAt).fromNow()}  </small>
                        <small className="font-weight-bold mr-3"> {comment.likes.length} likes </small>
                        <small className="font-weight-bold mr-3"> reply </small>
                    </div>
                </div>
                <div className="d-flex align-items-center mx-2" style={{ cursor: 'pointer', }}>
                    <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
                    <LikeButton fz={true} isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
                </div>
            </div>
        </div>
    )
}

export default CommentCard