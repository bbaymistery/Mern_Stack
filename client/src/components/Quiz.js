import React, { useEffect, useState } from 'react'
import Questions from './Questions'
import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';
/** redux store import */
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
export default function Quiz() {
  const [check, setChecked] = useState(undefined)
  const { queue, trace } = useSelector(state => state.questions);
  const { result } = useSelector(state => state.result);


  const dispatch = useDispatch()



  /** next button event handler */
  /** increase the trace value by one using MoveNextAction */
  const onNext = () => {

    if (trace < queue.length) {
      /** increase the trace value by one using MoveNextAction */
      dispatch(MoveNextQuestion());

      // insert a new result into array
      if (result.length <= trace) {
        dispatch(PushAnswer(check))
      }
    }

    //herhansi bir suali tiklamadan gecersek undefined seklinde result icine duser.
    //ve bu fonksyon ile (attempts_Number>) filter edirik attemptleri
    // reset the value of the check variable
    setChecked(undefined)
  }

  /** Prev button event handler */
  /** decrease the trace value by one using MovePrevQuestion */
  const onPrev = () => (trace > 0) && dispatch(MovePrevQuestion())
  const onChecked = (check) => setChecked(check)


  // queue  dedigimiz toplam sorularin barindigi queue dir
  if (result.length && result.length >= queue.length) {
    return <Navigate to={"/result"} replace={true}></Navigate>
  }


  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>

      {/* display questions */}
      <Questions onChecked={onChecked} />

      <div className='grid'>
        {trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
        <button className='btn next' onClick={onNext}>Next</button>
      </div>
    </div>
  )
}