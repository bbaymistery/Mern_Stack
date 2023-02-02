import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkImage } from '../../utils/imageUpload'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { updateProfileUser } from '../../redux/actions/profileAction'
// import { updateProfileUser } from '../../redux/actions/profileAction'

const EditProfile = ({ setOnEdit }) => {
    const initState = { fullname: '', mobile: '', address: '', website: '', story: '', gender: '' }
    const [userData, setUserData] = useState(initState)
    const { fullname, mobile, address, website, story, gender } = userData

    const [avatar, setAvatar] = useState('')

    const { auth, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => setUserData(auth.user), [auth.user])


    const changeAvatar = (e) => {
        const file = e.target.files[0]
        const err = checkImage(file)
        if (err) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
        setAvatar(file)
    }

    const handleInput = e => setUserData({ ...userData, [e.target.name]: e.target.value })


    const handleSubmit = e => {
        e.preventDefault()
        dispatch(updateProfileUser({ userData, avatar, auth }))
        setOnEdit(false)
    }

    return (
        <div className="edit_profile">
            <button className="btn btn-danger btn_close" onClick={() => setOnEdit(false)}>
                Close
            </button>

            <form onSubmit={handleSubmit} style={{ marginTop: "100px" }}>
                <div className="info_avatar" style={{ margin: "0px auto" }}>
                    <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="avatar" style={{ filter: theme ? 'invert(1)' : 'invert(0)', }} />
                    <span>
                        <i className="fas fa-camera" />
                        <p>Change</p>
                        <input type="file" name="file" id="file_up" accept="image/*" onChange={changeAvatar} />
                    </span>
                </div>

                <div style={{ marginBottom: "0rem" }} className="form-group">
                    <label htmlFor="fullname" style={{ fontSize: "13px" }}>Full Name</label>
                    <div className="position-relative">
                        <input style={{ fontSize: "13px" }} type="text" className="form-control" id="fullname" name="fullname" value={fullname} onChange={handleInput} />
                        <small className="text-danger position-absolute" style={{ top: '50%', right: '5px', transform: 'translateY(-50%)', fontSize: "13px" }} >   {fullname.length}/25 </small>
                    </div>
                </div>

                <div style={{ marginBottom: "0rem" }} className="form-group">
                    <label htmlFor="mobile" style={{ fontSize: "13px" }}>Mobile</label>
                    <input type="text" name="mobile" style={{ fontSize: "13px" }} value={mobile} className="form-control" onChange={handleInput} />
                </div>

                <div style={{ marginBottom: "0rem" }} className="form-group">
                    <label htmlFor="address" style={{ fontSize: "13px" }}>Address</label>
                    <input type="text" name="address" style={{ fontSize: "13px" }} value={address} className="form-control" onChange={handleInput} />
                </div>

                <div style={{ marginBottom: "0rem" }} className="form-group">
                    <label htmlFor="website " style={{ fontSize: "13px" }}>Website</label>
                    <input type="text" name="website" style={{ fontSize: "13px" }} value={website} className="form-control" onChange={handleInput} />
                </div>

                <div style={{ marginBottom: "0rem" }} className="form-group">
                    <label htmlFor="story" style={{ fontSize: "13px" }}>Story</label>
                    <textarea name="story" style={{ fontSize: "13px" }} value={story} cols="30" rows="4" className="form-control" onChange={handleInput} />
                    <small className="text-danger d-block text-right" style={{ fontSize: "13px" }}> {story.length}/200  </small>
                </div>

                <label htmlFor="gender" style={{ fontSize: "13px", marginBottom: "0px", }}>Gender</label>
                <div className="input-group-prepend px-0 mb-1">
                    <select style={{ fontSize: "13px" }} name="gender" id="gender" value={gender} className="custom-select text-capitalize" onChange={handleInput}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <button className="btn btn-info w-100" type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditProfile
