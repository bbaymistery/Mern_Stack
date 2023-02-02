import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBALTYPES } from '../redux/actions/globalTypes'
import Icons from './Icons'
import { imageShow, videoShow } from '../utils/mediaShow'
import { createPost, } from '../redux/actions/postAction'

const StatusModal = () => {
    const videoRef = useRef()
    const refCanvas = useRef()
    const dispatch = useDispatch()
    const [images, setImages] = useState([])
    const [tracks, setTracks] = useState('')
    const [content, setContent] = useState('')
    const [stream, setStream] = useState(false)
    const { auth, theme, } = useSelector(state => state)

    const handleChangeImages = (e) => {
        const files = [...e.target.files]
        let err = ""
        let newImages = []

        files.forEach(file => {
            if (!file) return err = "File does not exist."
            if (file.size > 1024 * 1024 * 5) return err = "The image/video largest is 5mb."
            return newImages.push(file)
        })

        if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } })
        setImages([...images, ...newImages])
    }
    const deleteImages = (index) => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }
    //bizde   camera yoxdu deye asagdan kamera isaretini bagliyiriq
    //ama kodlari yazdikki ilerde lazim olar
    const handleStream = () => {
        setStream(true)


        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(mediaStream => {
                    videoRef.current.srcObject = mediaStream
                    videoRef.current.play()

                    const track = mediaStream.getTracks()
                    setTracks(track[0])
                }).catch(err => console.log(err))
        }
    }
    const handleStopStream = () => {
        tracks.stop()
        setStream(false)
    }
    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute("width", width)
        refCanvas.current.setAttribute("height", height)

        const ctx = refCanvas.current.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, width, height)
        let URL = refCanvas.current.toDataURL()
        setImages([...images, { camera: URL }])
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (images.length === 0) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: "Please add your photo." } })

        dispatch(createPost({ content, images, auth }))

        setContent('')
        setImages([])

        if (tracks) tracks.stop()
        dispatch({ type: GLOBALTYPES.STATUS, payload: false })
    }

    return (
        <div className='status_modal'>
            <form action="" onSubmit={handleSubmit}>
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

                    <div className="show_images">
                        {images.map((img, index) => (
                            <div key={index} id="file_img">
                                {img.camera ? imageShow(img.camera, theme) : img.url ?
                                    <>  {img.url.match(/video/i) ? videoShow(img.url, theme) : imageShow(img.url, theme)}    </>
                                    :
                                    <>  {img.type.match(/video/i) ? videoShow(URL.createObjectURL(img), theme) : imageShow(URL.createObjectURL(img), theme)} </>}
                                <span onClick={() => deleteImages(index)}>&times;</span>
                            </div>))}

                    </div>
                    {stream &&
                        <div className="stream position-relative">
                            <video autoPlay muted ref={videoRef} width="100%" height="100%" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />

                            <span onClick={handleStopStream}>&times;</span>
                            <canvas ref={refCanvas} style={{ display: 'none' }} />
                        </div>
                    }
                    <div className="input_images" style={{ alignItems: "center", }}>
                        {stream ? <i className="fas fa-camera" style={{ marginTop: "6px" }} onClick={handleCapture} /> :
                            <>
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