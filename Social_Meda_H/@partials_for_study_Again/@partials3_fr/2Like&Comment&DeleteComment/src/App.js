import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Actions/UserActions";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Account from "./Components/Account/Account";

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    //todo get my profile =>http://localhost:4000/api/v1/me
    dispatch(loadUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/" element={isAuthenticated ? <Account /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
