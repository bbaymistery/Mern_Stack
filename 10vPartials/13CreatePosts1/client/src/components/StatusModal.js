import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBALTYPES } from '../redux/actions/globalTypes'
import Icons from './Icons'
const StatusModal = () => {
    const dispatch = useDispatch()
    const { auth, theme, status, } = useSelector(state => state)

    const refCanvas = useRef()
    const videoRef = useRef()
    const [images, setImages] = useState([])
    const [tracks, setTracks] = useState('')
    const [content, setContent] = useState('')
    const [stream, setStream] = useState(false)

    const handleChangeImages = () => {

    }
    const handleStream = (par) => {

    }
    const handleCapture = (par) => {

    }
    return (
        <div className='status_modal'>
            <form action="">
                <div className='status_header'>
                    <h5 className='m-0'> Create Posts</h5>
                    <span onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: false })}>&times;</span>
                </div>

                <div className="status_body">
                    <textarea
                        value={content}
                        name="content"
                        onChange={e => setContent(e.target.value)}
                        placeholder={`${auth.user.username}, what are you thinking?`}
                        style={{ filter: theme ? 'invert(1)' : 'invert(0)', color: theme ? 'white' : '#111', background: theme ? 'rgba(0,0,0,.03)' : '', fontSize: "15px" }}
                    ></textarea>

                    <div className="d-flex">
                        <div className="flex-fill"></div>
                        <Icons setContent={setContent} content={content} theme={theme} />
                    </div>
                    <div className="input_images" style={{ alignItems: "center",}}>
                        {stream
                            ? <i className="fas fa-camera" style={{marginTop:"6px"}} onClick={handleCapture} />
                            : <>
                                <i className="fas fa-camera" onClick={handleStream} />

                                <div className="file_upload">
                                    <i className="fas fa-image" />
                                    <input type="file" name="file" id="file" multiple accept="image/*,video/*" onChange={handleChangeImages} />
                                </div>
                            </>}

                    </div>
                </div>

                <div className="status_footer">
                    <button className="btn btn-secondary w-100" type="submit">
                        Post
                    </button>
                </div>
            </form>
        </div>
    )
}

export default StatusModal