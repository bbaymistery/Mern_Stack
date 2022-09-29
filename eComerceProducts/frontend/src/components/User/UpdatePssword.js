import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Loader from "../../components/layouts/Loader/Loader";
import MetaData from "../layouts/MetaData";
import img from "../../images/Profile.png";
import { useNavigate } from "react-router-dom";
const UpdatePssword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPASold, setShowPASold] = useState(false);
  const [showPASnew, setShowPASnew] = useState(false);
  const [showPASconfirm, setShowPASconfirm] = useState(false);
  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    let finalData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    dispatch(updatePassword(finalData));
  };
  const showPasOldFunc = (par) => {
    setShowPASold(!showPASold);
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

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      navigate("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type={`${showPASold ? "text" : "password"}`}
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  {!showPASold ? (
                    <VisibilityOffIcon
                      className="icon_v"
                      onClick={showPasOldFunc}
                    />
                  ) : (
                    ""
                  )}
                  {showPASold ? (
                    <RemoveRedEyeIcon
                      className="icon_v"
                      onClick={showPasOldFunc}
                    />
                  ) : (
                    ""
                  )}
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type={`${showPASnew ? "text" : "password"}`}
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                <div className="loginPassword">
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
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePssword;
