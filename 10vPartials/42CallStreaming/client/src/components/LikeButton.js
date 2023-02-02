import React from 'react'
import { useSelector } from 'react-redux'

const LikeButton = ({ isLike, handleLike, handleUnLike, fz = false }) => {
    const { theme } = useSelector(state => state)

    return (
        <div className='d-flex' >
            {isLike ?
                <i className="fas fa-heart text-danger" onClick={handleUnLike} style={{ filter: theme ? 'invert(1)' : 'invert(0)', fontSize: `${fz ? "15px" : ""}` }} />
                : <i style={{ fontSize: `${fz ? "15px" : ""}` }} className="far fa-heart" onClick={handleLike} />}
        </div>
    )
}

export default LikeButton
