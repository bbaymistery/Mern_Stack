import React, { useEffect, useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/UserActions";
import { useAlert } from "react-alert";
const Login = () => {
  const [email, setEmail] = useState("");
  const [showPasInput, setShowPasInput] = useState(true);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };
  const handleShowOrHidePas = (e) => {
    setShowPasInput(!showPasInput);
  };
  //eger login enedepass duz deyilse alert edirik
  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);
  return (
    <div className="login">
      <form
        action=""
        className="loginForm"
        onSubmit={loginHandler}
        style={{ position: "relative" }}
      >
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Login
        </Typography>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {!showPasInput ? (
          <input
            type="text"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : (
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            bottom: "235px",
            right: "80px",
          }}
        >
          <label style={{ marginRight: "1rem", cursor: "pointer" }} htmlFor="">
            {!showPasInput ? (
              <i className="fa-solid fa-eye" onClick={handleShowOrHidePas}></i>
            ) : (
              <i
                onClick={handleShowOrHidePas}
                className="fa-solid fa-eye-low-vision"
              ></i>
            )}
          </label>
        </div>

        <Button
          type="submit"
          variant="contained"
          style={{
            marginTop: "1.25rem",
          }}
        >
          Login
        </Button>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
            marginTop: "0.25rem",
          }}
        >
          <Link to="/forgot/password">
            <Typography variant="body2">Forgot Password ?</Typography>
          </Link>
          <Link to="/register">
            <Typography variant="body2">Click To Register </Typography>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
