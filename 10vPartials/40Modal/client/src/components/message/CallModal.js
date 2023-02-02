import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import Avatar from '../Avatar'

const CallModal = () => {
    const { call, auth, peer, socket, theme } = useSelector(state => state)
    const dispatch = useDispatch()

    const [hours, setHours] = useState(0)
    const [mins, setMins] = useState(0)
    const [second, setSecond] = useState(0)
    const [total, setTotal] = useState(0)

    const [answer, setAnswer] = useState(false)
    const youVideo = useRef()
    const otherVideo = useRef()
    const [tracks, setTracks] = useState(null)
    const [newCall, setNewCall] = useState(null)


    const handleAnswer = (par) => {
        setAnswer(true)
    }

    const handleEndCall = (par) => {
        dispatch({ type: GLOBALTYPES.CALL, payload: null })

    }
    // Set Time
    useEffect(() => {
        const setTime = () => {
            setTotal(t => t + 1)
            setTimeout(setTime, 1000)
        }
        setTime()

        return () => setTotal(0)
    }, [])
    useEffect(() => {
        setSecond(total % 60)
        setMins(parseInt(total / 60))
        setHours(parseInt(total / 3600))
    }, [total])

    //biz tikladik zng getdi 15saniye sonra cvb veren olmasa zng baglancag
    useEffect(() => {
        if (answer) {
            setTotal(0)
        } else {
            const timer = setTimeout(() => {
                dispatch({ type: GLOBALTYPES.CALL, payload: null })
            }, 15000)

            return () => clearTimeout(timer)
        }

    }, [dispatch, answer,])


    return (
        <div className="call_modal">
            <div className="call_box"
            // style={{
            //     display: (answer && call.video) ? 'none' : 'flex'
            // }}
            >

                <div className="text-center" style={{ padding: '40px 0' }} >
                    <Avatar src={call.avatar} size="supper-avatar" />
                    <h4>{call.username}</h4>
                    <h6>{call.fullname}</h6>

                    {answer ?
                        <div>
                            <span>{hours.toString().length < 2 ? '0' + hours : hours}</span>
                            <span>:</span>
                            <span>{mins.toString().length < 2 ? '0' + mins : mins}</span>
                            <span>:</span>
                            <span>{second.toString().length < 2 ? '0' + second : second}</span>
                        </div>
                        : <div> {call.video ? <span>calling video...</span> : <span>calling audio...</span>} </div>}

                </div>

                {!answer &&
                    <div className="timer">
                        <small>{mins.toString().length < 2 ? '0' + mins : mins}</small>
                        <small>:</small>
                        <small>{second.toString().length < 2 ? '0' + second : second}</small>
                    </div>}


                <div className="call_menu">
                    <button className="material-icons text-danger" onClick={handleEndCall}>call_end</button>
                    {/* {(call.recipient === auth.user._id && !answer) &&
                        <> */}
                    {call.video ? <button className="material-icons text-success" onClick={handleAnswer}>videocam</button>
                        : <button className="material-icons text-success" onClick={handleAnswer}>call</button>}
                    {/* </>} */}

                </div>

            </div>

            {/* <div className="show_video"
            style={{
                opacity: (answer && call.video) ? '1' : '0',
                filter: theme ? 'invert(1)' : 'invert(0)'
            }} >

                <video ref={youVideo} className="you_video" playsInline muted />
                <video ref={otherVideo} className="other_video" playsInline />

                <div className="time_video">
                    <span>{hours.toString().length < 2 ? '0' + hours : hours}</span>
                    <span>:</span>
                    <span>{mins.toString().length < 2 ? '0' + mins : mins}</span>
                    <span>:</span>
                    <span>{second.toString().length < 2 ? '0' + second : second}</span>
                </div>

                <button className="material-icons text-danger end_call"
                    onClick={handleEndCall}>
                    call_end
                </button>

            </div> */}

        </div>
    )
}

export default CallModal