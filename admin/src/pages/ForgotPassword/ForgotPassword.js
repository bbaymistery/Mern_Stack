import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
// import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { forgotPassword } from "../../reducers/userReducer/userAction";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, message, loading: isFetching } = useSelector((state) => state.forgetPassword);
  const [email, setEmail] = useState("");
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    if (!email) {
      alert("Fill the blank")
    }
    myForm.set("email", email);
    dispatch(forgotPassword(email))
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (message) alert.success(message);
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>

      <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox" style={{ position: 'relative' }}>
          <h2 className="forgotPasswordHeading">Forgot Password</h2>

          <a style={{
            position: 'absolute',
            color: 'white',
            bottom: '10px',
            left: '195px',
            textDecoration: 'none'
          }} href="/">
            Login
          </a>
          <form
            className="forgotPasswordForm"
            onSubmit={forgotPasswordSubmit}
          >
            <div className="forgotPasswordEmail">
              {/* <MailOutlineIcon /> */}
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value={`${isFetching ? "Loading" : "Send"}`}
              className="forgotPasswordBtn"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
