import React, { Fragment, useEffect, useRef, useState } from "react";
import Loader from "../layouts/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useNavigate } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAlert } from "react-alert";
import "./LoginSignUp.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useLocation } from "react-router-dom";
import img from "../../images/Profile.png";
import { clearErrors, login, register } from "../../actions/userAction";
const LoginSignUp = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [showPas, setShowPas] = useState(false);
  const [loginEmail, setLoginEmail] = useState("elgun.ezmemmedov@gmail.com");
  const [loginPassword, setLoginPassword] = useState("123456789");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  let location = useLocation();
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState(img); //eger nese yuklemese default olarag bu sekil yuklenir
  const [avatarPreview, setAvatarPreview] = useState(img);
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    let userFinal = {
      ...user,
      avatar,
    };
    dispatch(register(userFinal));
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const showThepas = (par) => {
    setShowPas(!showPas);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      const redirect = location.search
        ? location.search.split("=")[1]
        : "account";

      navigate(`/${redirect}`);
    }
  }, [dispatch, error, alert, isAuthenticated, navigate, location.search]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              {/* */}
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  {!showPas ? <VisibilityOffIcon onClick={showThepas} /> : ""}
                  {showPas ? <RemoveRedEyeIcon onClick={showThepas} /> : ""}
                  {showPas ? (
                    <input
                      type="test"
                      placeholder="Password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  ) : (
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  )}
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              {/* register */}
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  {!showPas ? <VisibilityOffIcon onClick={showThepas} /> : ""}
                  {showPas ? <RemoveRedEyeIcon onClick={showThepas} /> : ""}
                  {showPas ? (
                    <input
                      type="test"
                      placeholder="Password"
                      required
                      name="password"
                      value={password}
                      onChange={registerDataChange}
                    />
                  ) : (
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      name="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  )}
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
