import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import PageRender from './customRouter/PageRender';
import PrivateRouter from './customRouter/PrivateRouter'

import Alert from './components/alert/Alert'
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from './redux/actions/authAction';
import Header from './components/header/Header';
import StatusModal from './components/StatusModal';
import { getPosts } from './redux/actions/postAction'
import { getSuggestions } from './redux/actions/suggestionsAction';
import SocketClient from './SocketClient'


import io from 'socket.io-client'
import { GLOBALTYPES } from './redux/actions/globalTypes';
import { getNotifies } from './redux/actions/notifyAction';
const App = () => {
  const dispatch = useDispatch()
  const { auth, status, modal } = useSelector(state => state)

  useEffect(() => {
    // biz ligin edennen sonra home page yonelirik
    //Yalniz home page de refresh ederken yeniden logine yonelir
    //onun garsisin almag ucun refresh token kullanirik
    dispatch(refreshToken("refresh_token "))

    const socket = io()
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket })
    return () => socket.close()
  }, [dispatch])
  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))

    }
  }, [dispatch, auth.token])
  return (
    <Router>
      <Alert />

      {/* biz burani checked unchecked olunmasini dropdowndaki dark light mor ile degisirik Hansiki burdaki id="theme" ile ordaki label htmlFor "theme" eynidi Fuckk ! */}
      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <h1 className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
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