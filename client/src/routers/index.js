import { createBrowserRouter } from 'react-router-dom'
import Main from '../components/Main'
import Quiz from '../components/Quiz'
import Result from '../components/Result'
import { CheckuserExist } from '../helper/helper'
//exported to app js
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />
    },
    {
        path: "/quiz",
        //yani eger input icerisine bir sey yazarsak
        //bize quiz ve ya result komponentine accese icaze olar
        element: <CheckuserExist><Quiz /></CheckuserExist>
        // element: <Quiz />
    },
    {
        path: "/result",
        element: <CheckuserExist> <Result /></CheckuserExist>
        // element: <Result />
    },
])