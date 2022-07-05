import "./style.css";
import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/UserActions";
import { useNavigate } from "react-router-dom";
const ForgotPaswsword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, message } = useSelector((state) => state.like);
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);
  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="body2" style={{ padding: "4px 0px" }}>
          U can change password
          <br />
        </Typography>
        <Typography variant="body1">No worries 😃</Typography>
        <Typography variant="body1">Just write your email 😅</Typography>

        <input
          type="email"
          placeholder="Email"
          required
          className="forgotPasswordInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" disabled={loading} type="submit">
          Send Token
        </Button>
        <Button onClick={() => navigate("/")}>Go back</Button>
      </form>
    </div>
  );
};

export default ForgotPaswsword;
