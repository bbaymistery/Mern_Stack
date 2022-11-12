import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/index'
import { updatePassword } from "../../redux/apiCalls";
import { clearErrorUpdateProfile } from "../../redux/profileReducer";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  // const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const { isUpdated, error, isFetching, myProfile: user } = useSelector((state) => state.profile);


  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPASold, setShowPASold] = useState(false);
  const [showPASnew, setShowPASnew] = useState(false);
  const [showPASconfirm, setShowPASconfirm] = useState(false);


  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    let finalData = { oldPassword, newPassword, confirmPassword, };
    console.log(finalData);
    // dispatch(updatePassword(finalData));
    updatePassword(dispatch, finalData, navigate)
  };
  const showPasOldFunc = (par) => setShowPASold(!showPASold);
  const showPasNewFunc = (par) => setShowPASnew(!showPASnew);
  const showPasConfirmFunc = (par) => setShowPASconfirm(!showPASconfirm);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrorUpdateProfile())
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      navigate("/profile");
    }
  }, [dispatch, error, alert, navigate, isUpdated]);
  return (
    <Fragment>
      <Navbar />

      {isUpdated ? (
        <Loader />
      ) : (
        <Fragment>
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
                  value={`${isFetching ? "Loading" : "Change"}`}
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

export default UpdatePassword;
