import React, { Fragment, useState, useEffect } from "react";
import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { useNavigate, useParams } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { clearErrorUpdateProfile } from "../../redux/profileReducer";
import Navbar from '../../components/Navbar/index'
import { resetPassword } from "../../redux/apiCalls";
const ResetPassword = () => {
  const alert = useAlert();
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, message, isFetching } = useSelector((state) => state.forgetPassword);
  const [showPASnew, setShowPASnew] = useState(false);
  const [showPASconfirm, setShowPASconfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    // dispatch(resetPassword(token, myForm));
    if (!password || !confirmPassword) return alert("Fill the blank")
    let passwords = { confirmPassword, password }
    resetPassword(dispatch, passwords, token, navigate)
  };

  const showPasNewFunc = (par) => setShowPASnew(!showPASnew);
  const showPasConfirmFunc = (par) => setShowPASconfirm(!showPASconfirm);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrorUpdateProfile());
    }

    if (message) {
      alert.success("Password Updated Successfully");
      navigate("/login");
    }
  }, [dispatch, error, alert, navigate, message]);

  return (
    <Fragment>
      <Navbar />
      <div className="resetPasswordContainer">
        <div className="resetPasswordBox">
          <h2 className="resetPasswordHeading">Reset Password</h2>

          <form
            className="resetPasswordForm"
            onSubmit={resetPasswordSubmit}
          >
            <div className="inp_div">
              <LockOpenIcon />
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
              <LockIcon />
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
              value={`${isFetching ? "Loading" : "Update"}`}
              className="resetPasswordBtn"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
