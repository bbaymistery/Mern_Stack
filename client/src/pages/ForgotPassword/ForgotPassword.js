import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../../components/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Navbar from '../../components/Navbar/index'
import { clearErrorforgetPassword } from "../../redux/forgetPasswordSlice";
import { forgotPassword } from "../../redux/apiCalls";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, message, isFetching } = useSelector((state) => state.forgetPassword);
  const [email, setEmail] = useState("");
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    if (!email) {
      alert("Fill the blank")
    }
    myForm.set("email", email);

    forgotPassword(dispatch, email)
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrorforgetPassword());
    }

    if (message) alert.success(message);
  }, [dispatch, error, alert, message]);

  return (
    <Fragment>
      <Navbar />

      <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox">
          <h2 className="forgotPasswordHeading">Forgot Password</h2>

          <form
            className="forgotPasswordForm"
            onSubmit={forgotPasswordSubmit}
          >
            <div className="forgotPasswordEmail">
              <MailOutlineIcon />
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
