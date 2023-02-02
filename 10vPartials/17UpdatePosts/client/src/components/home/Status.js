import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../Avatar'
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
const Status = () => {
  const { auth } = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div className='status my-3 d-flex'>
      <Avatar src={auth.user.avatar} size="big-avatar" />

      {/* */}
      <button className="statusBtn flex-fill " onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })} style={{ fontSize: "14px" }}>
        {auth.user.username}, what are you thinking ?
      </button>
    </div>
  )
}

export default Status