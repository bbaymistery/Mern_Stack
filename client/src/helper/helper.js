import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import axios from 'axios'

export function attempts_Number(result) {
    return result.filter(r => r !== undefined).length;
}

export function earnPoints_Number(result, answers, point) {
    return result
        .map((element, i) => answers[i] === element)//[true true false /...]
        .filter(i => i)//it is gonna return only true values
        .map(i => point)//for each correct answers we return 10 [true olacag 10 ]
        .reduce((prev, curr) => prev + curr, 0);
}

export function flagResult(totalPoints, earnPoints) {
    return (totalPoints * 50 / 100) < earnPoints; /** earn 50% marks */
}


// check user auth
//C boyuk ile yazdik cunki bu bir componentdir
export function CheckuserExist({ children }) {
    const auth = useSelector((state) => state.result.userId)

    return auth ? children : <Navigate to="/" />
}

// get server data
export async function getServerData(url, callback = () => { }) {
    const data = await (await axios.get(url))?.data
    return callback ? callback(data) : data
}


// post server data
export async function postServerData(url, result, callback = () => { }) {
    const data = await (await axios.post(url, result))?.data
    return callback ? callback(data) : data
}


//example for fetching   (we didnt use anywhere)

export async function getFetchingData(url, callback = () => { }) {
    let response = await fetch(url)
    let data = await response.json()
    return callback ? callback(data) : data
}

export async function postFetchingData(params={}) {
   //bodyProps > token, paymentType, stage
    let { url, callback = () => { }, bodyProps, headersEx,method}=params
    const headers = headersEx ? headersEx : { "Content-Type": "application/json" }
    const body = JSON.stringify({...bodyProps })
    const response = await fetch(url, { method, body, headers });
    let data = await response.json()
    return callback ? callback(data) : data
}

