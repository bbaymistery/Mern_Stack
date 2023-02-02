import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import PageRender from './customRouter/PageRender';
import Alert from './components/alert/Alert'
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from './redux/actions/authAction';

const App = () => {
  const dispatch = useDispatch()
  const { auth, } = useSelector(state => state)

  useEffect(() => {
    // biz ligin edennen sonra home page yonelirik 
    //Yalniz home page de refresh ederken yeniden logine yonelir
    //onun garsisin almag ucun refresh token kullanirik
    dispatch(refreshToken())


  }, [dispatch])
  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className="App">
        <h1 className="main">

          <Route exact path="/" component={auth?.token ? Home : Login} />
          <Route path="/:page" component={PageRender} />
          <Route path="/:page/:id" component={PageRender} />
        </h1>
      </div>
    </Router>
  )
}

export default App