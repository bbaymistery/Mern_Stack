import { Route, Redirect } from 'react-router-dom'


//app jsde bunu eklemesek
//Ve deyekki login olunmaybsa ve biz ../discovere getmek isteyirikse
//bize page not found dondurer
//Bu yuzde not found yerine direk bizi home page yoneltsin diye bunu yaziriq
const PrivateRouter = (props) => localStorage.getItem('firstLogin') ? <Route {...props} /> : <Redirect to="/" />


export default PrivateRouter