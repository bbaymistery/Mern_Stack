import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import PageRender from './customRouter/PageRender';
import PrivateRouter from './customRouter/PrivateRouter'

import Alert from './components/alert/Alert'
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from './redux/actions/authAction';
import Header from './components/header/Header';

const App = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state)

  // console.log(window.pathname);


  useEffect(() => {
    // biz ligin edennen sonra home page yonelirik
    //Yalniz home page de refresh ederken yeniden logine yonelir
    //onun garsisin almag ucun refresh token kullanirik
    dispatch(refreshToken("refresh_token "))



  }, [dispatch])
  return (
    <Router>
      <Alert />

      {/* biz burani checked unchecked olunmasini dropdowndaki dark light mor ile degisirik Hansiki burdaki id="theme" ile ordaki label htmlFor "theme" eynidi Fuckk ! */}
      <input type="checkbox" id="theme" />
      <div className="App">
        <h1 className="main">
          {auth.token && <Header />}
          <Route exact path="/" component={auth?.token ? Home : Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
        </h1>
      </div>
    </Router>
  )
}

export default App