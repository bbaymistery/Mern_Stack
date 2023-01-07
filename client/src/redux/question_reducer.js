import { createSlice } from "@reduxjs/toolkit";

/** create reducer */
export const questionReducer = createSlice({
    name: 'questions',
    initialState: { queue: [], answers: [], trace: 0 },
    reducers: {
        //return olarsa tek satr yaza bilirik.
        //Result reducerdeki kimi push falan varsa tek satr yazamiyoruz
        startExamAction: (state, action) => {
            //question ve answer FetchQuestion js || (useFetchQuestion)  den gelir
            let { question: quesions, answers } = action.payload
            return {
                ...state,
                answers,
                queue: quesions,
            }
        },
        moveNextAction: (state) => { return { ...state, trace: state.trace + 1 } },
        movePrevAction: (state) => { return { ...state, trace: state.trace - 1 } },
        resetAllAction: (state) => { return { queue: [], answers: [], trace: 0 } }

    }
})

export const {
    startExamAction,
    moveNextAction,
    movePrevAction,
    resetAllAction } = questionReducer.actions;

export default questionReducer.reducer;