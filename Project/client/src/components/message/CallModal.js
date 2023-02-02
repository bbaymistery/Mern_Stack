import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import Avatar from '../Avatar'
import { addMessage } from '../../redux/actions/messageAction'

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
    

    // Answer Call (bizim kameranin gorunmesi)
    const handleAnswer = () => {
        openStream(call.video).then(stream => {
            playStream(youVideo.current, stream)
            const track = stream.getTracks()
            setTracks(track)

            //bu function peer js kutuphanesinden gelir
            const newCall = peer.call(call.peerId, stream);
            newCall.on('stream', function (remoteStream) {
                playStream(otherVideo.current, remoteStream)
            });
            setAnswer(true)
            setNewCall(newCall)
        })
    }

    // End Call
    const addCallMessage = useCallback((call, times, disconnect) => {
        if (call.recipient !== auth.user._id || disconnect) {
            const msg = {
                sender: call.sender,
                recipient: call.recipient,
                text: '',
                media: [],
                call: { video: call.video, times },
                createdAt: new Date().toISOString()
            }
            dispatch(addMessage({ msg, auth, socket }))
        }
    }, [auth, dispatch, socket])
    const handleEndCall = (par) => {
        tracks && tracks.forEach(track => track.stop())
        let times = answer ? total : 0
        socket.emit('endCall', { ...call, times })

        addCallMessage(call, times)
        dispatch({ type: GLOBALTYPES.CALL, payload: null })
    }

    // Stream Media
    const openStream = (video) => {
        const config = { audio: true, video }
        // The deprecated Navigator.getUserMedia() method prompts the user for permission
        //  to use up to one video input device(such as a camera or shared screen) and up
        //  to one audio input device(such as a microphone) as the source for a
        //  MediaStream.

        //  If permission is granted, a MediaStream whose video and / or audio tracks come
        //  from those devices is delivered to the specified success callback.If
        //  permission is denied, no compatible input devices exist, or any other error
        //  condition occurs, the error callback is executed with a MediaStreamError object
        //  describing what went wrong.If the user instead doesn't make a choice at all,
        //  neither callback is executed.
        return navigator.mediaDevices.getUserMedia(config)
    }

    const playStream = (tag, stream) => {
        let video = tag;
        video.srcObject = stream;
        video.play()
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
            
                socket.emit('endCall', { ...call, times: 0 })
                addCallMessage(call, 0)
                dispatch({ type: GLOBALTYPES.CALL, payload: null })
            }, 15000)

            return () => clearTimeout(timer)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, answer,call ,socket,])



    // bizim kameran gorunmesinnen sonra garsi terefin kamerasin gorunmesi
    useEffect(() => {
        peer.on('call', newCall => {
            openStream(call.video).then(stream => {
                if (youVideo.current) {
                    playStream(youVideo.current, stream)
                }
                const track = stream.getTracks()
                setTracks(track)

                newCall.answer(stream)
                newCall.on('stream', function (remoteStream) {
                    if (otherVideo.current) {
                        playStream(otherVideo.current, remoteStream)
                    }
                });
                setAnswer(true)
                setNewCall(newCall)
            })
        })
        return () => peer.removeListener('call')
    }, [peer, call.video])

    useEffect(() => {
        socket.on('endCallToClient', data => {
            tracks && tracks.forEach(track => track.stop())
            // if (newCall) newCall.close()
            addCallMessage(data, data.times)
            dispatch({ type: GLOBALTYPES.CALL, payload: null })
        })

        return () => socket.off('endCallToClient')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, dispatch,tracks])



    // Disconnect
    useEffect(() => {
        socket.on('callerDisconnect', () => {
            tracks && tracks.forEach(track => track.stop())
          
            let times = answer ? total : 0
            addCallMessage(call, times, true)
            dispatch({ type: GLOBALTYPES.CALL, payload: null })

            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: `The ${call.username} disconnect` }
            })
        })

        return () => socket.off('callerDisconnect')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, tracks, dispatch, call.username ])

    return (
        <div className="call_modal">
            <div className="call_box" style={{ display: (answer && call.video) ? 'none' : 'flex' }} >

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
                    {(call.recipient === auth.user._id && !answer) &&
                        <>
                            {call.video ? <button className="material-icons text-success" onClick={handleAnswer}>videocam</button>
                                : <button className="material-icons text-success" onClick={handleAnswer}>call</button>}
                        </>}

                </div>

            </div>

            <div className="show_video" style={{ opacity: (answer && call.video) ? '1' : '0', filter: theme ? 'invert(1)' : 'invert(0)' }} >

                <video ref={youVideo} className="you_video" playsInline muted />
                <video ref={otherVideo} className="other_video" playsInline />
                {/* PLAYSINLINE https://css-tricks.com/what-does-playsinline-mean-in-web-video/ */}
                <div className="time_video">
                    <span>{hours.toString().length < 2 ? '0' + hours : hours}</span>
                    <span>:</span>
                    <span>{mins.toString().length < 2 ? '0' + mins : mins}</span>
                    <span>:</span>
                    <span>{second.toString().length < 2 ? '0' + second : second}</span>
                </div>

                <button className="material-icons text-danger end_call" onClick={handleEndCall}>
                    call_end
                </button>

            </div>

        </div>
    )
}

export default CallModal