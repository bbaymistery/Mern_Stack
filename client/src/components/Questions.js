import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// custom hook
import { useFetchQuestion } from '../hooks/FetchQuestion'
import { updateResult } from '../hooks/setResult'
import { updateResultAction } from '../redux/result_reducer'
export default function Questions({ onChecked }) {

    const dispatch = useDispatch()
    const [checked, setChecked] = useState(undefined)

    const { trace, answers } = useSelector(state => state.questions)
    const { result } = useSelector(state => state.result)
    const [{ isLoading, apiData, serverError }, setGetData] = useFetchQuestion()

    //when ver we increase trace it will give us next question
    const questions = useSelector(state => state.questions.queue[state.questions.trace])


    //when ever we click some of answers it is gonna update result
    useEffect(() => {
        dispatch(updateResult({ trace, checked }))
    }, [dispatch, checked, trace])


    const onSelect = (i) => {
        onChecked(i)
        setChecked(i)

        //bunu yazmasag her hansi birini secende Tekrardan cvbi degisdirmek istesek ikisisde secili galar 
        //bunu yaziriqki son secilen secili galsn 
        dispatch(updateResult({ trace, checked }))

    }

    if (isLoading) return <h3 className='text-light'>isLoading</h3>
    if (serverError) return <h3 className='text-light'>{serverError || "unknown error"}</h3>
    return (
        <div className='questions'>
            <h2 className='text-light'>{questions?.question}</h2>

            <ul key={questions?.id}>
                {
                    questions?.options.map((q, i) => {
                        return (
                            <li key={i}>
                                <input type="radio" value={false} name="options" id={`q${i}-option`} onChange={(e) => onSelect(i)} />
                                <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                                <div className={`check ${result[trace] === i ? "checked" : ""}`}></div>
                            </li>
                        )
                    })
                }


            </ul>



        </div>
    )
}