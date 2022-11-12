import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { useNavigate, useParams } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { clearErrors, resetPassword } from "../../reducers/userReducer/userAction";
const ResetPassword = () => {
  const alert = useAlert();
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success, loading } = useSelector(
    (state) => state.forgetPassword
  );


  const [showPASnew, setShowPASnew] = useState(false);
  const [showPASconfirm, setShowPASconfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
  };

  const showPasNewFunc = (par) => {
    setShowPASnew(!showPASnew);
  };
  const showPasConfirmFunc = (par) => {
    setShowPASconfirm(!showPASconfirm);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");
      navigate("/");
    }
  }, [dispatch, error, alert, navigate, success]);



  return (
    <Fragment>
      <div className="resetPasswordContainer">
        <div className="resetPasswordBox" style={{ position: 'relative' }}>
          <h2 className="resetPasswordHeading">Reset Password</h2>
          <a style={{
            position: 'absolute',
            color: 'white',
            bottom: '10px',
            left: '218px',
            textDecoration: 'none'
          }} href="/">
            Login
          </a>
          <form
            className="resetPasswordForm"
            onSubmit={resetPasswordSubmit}
          >
            <div className="inp_div">
              <input
                type={`${showPASnew ? "text" : "password"}`}
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!showPASnew ? (
                <VisibilityOffIcon
                  className="icon_v"
                  onClick={showPasNewFunc}
                />
              ) : (
                ""
              )}
              {showPASnew ? (
                <RemoveRedEyeIcon
                  className="icon_v"
                  onClick={showPasNewFunc}
                />
              ) : (
                ""
              )}
            </div>
            <div className="loginPassword inp_div">
              <input
                type={`${showPASconfirm ? "text" : "password"}`}
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!showPASconfirm ? (
                <VisibilityOffIcon
                  className="icon_v"
                  onClick={showPasConfirmFunc}
                />
              ) : (
                ""
              )}
              {showPASconfirm ? (
                <RemoveRedEyeIcon
                  className="icon_v"
                  onClick={showPasConfirmFunc}
                />
              ) : (
                ""
              )}
            </div>
            <input
              type="submit"
              value={loading ? "Loading" : "Update"}
              className="resetPasswordBtn"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
