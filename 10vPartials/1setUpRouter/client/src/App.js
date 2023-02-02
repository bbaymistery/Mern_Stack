import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import PageRender from './customRouter/PageRender';
const App = () => {
  return (
    <Router>
      <input type="checkbox" id="theme" />
      <div className="App">
        <h1>e</h1>
        <h1 className="main">
          <Route path="/:page" component={PageRender} />
          <Route path="/:page/:id" component={PageRender} />
        </h1>
        <div style={{ color: "red" }}>red</div>
        <div style={{ color: "green" }}>green</div>
        <div style={{ color: "blue" }}>blue</div>
        <div style={{ color: "cyan" }}>cyan</div>
      </div>
    </Router>
  )
}

export default App