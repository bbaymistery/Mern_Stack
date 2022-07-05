import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../../Actions/UserActions";
import "./styles.css";
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const { error, loading, message } = useSelector((state) => state.like);

  console.log(params);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, newPassword));
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
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography variant="body2" style={{ padding: "1vmax" }}>
          Reset your password 😠
        </Typography>

        <input
          type="password"
          placeholder="New Password"
          required
          className="updatePasswordInputs"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button variant="contained" disabled={loading} type="submit">
          Reset Password 😇
        </Button>
        <div
          style={{
            display: "flex",
            // background: "red",
            width: "80%",
            marginTop: "22px",
            justifyContent: "space-around",
          }}
        >
          <Link to="/">
            <Typography>Go to Home Page</Typography>
          </Link>

          <Link to="/forgot/password">
            <Typography>Request Another Token!</Typography>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
