import { Avatar, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { useAlert } from "react-alert";
import { registerUser } from "../../Actions/UserActions";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };
  const [showPasInput, setShowPasInput] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password, avatar));

    if (password.length >= 6) {
      alert.success("Registration is done  😃 ");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, user, alert, navigate]);

  const handleShowOrHidePas = (e) => {
    setShowPasInput(!showPasInput);
  };
  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        {/* <Typography variant="h3" style={{ padding: ".5vmax" }}>
          Register
        </Typography> */}

        <p style={{ color: "red", marginBottom: "1rem" }}>
          You should choice one photo
        </p>
        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "6vmax", width: "6vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          value={name}
          placeholder="Name"
          className="registerInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="registerInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {!showPasInput ? (
          <input
            type="password"
            className="registerInputs"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : (
          <input
            type="text"
            className="registerInputs"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        {error && (
          <p style={{ color: "red", padding: "10px 0px" }}>
            Password must be at lest 6 characters
          </p>
        )}
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <label style={{ marginRight: "1rem" }} htmlFor="">
            {!showPasInput ? (
              <i
                className="fa-solid fa-eye-low-vision"
                onClick={handleShowOrHidePas}
              ></i>
            ) : (
              <i onClick={handleShowOrHidePas} className="fa-solid fa-eye"></i>
            )}
          </label>
        </div>
        <div style={{ margin: "1rem 0rem" }}>
          <Link to="/">
            <Typography>Already Signed Up? Login Now</Typography>
          </Link>
        </div>

        <Button variant="contained" disabled={loading} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
