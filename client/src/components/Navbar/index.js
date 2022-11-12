import React, { useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./styles.scss";
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from "../../redux/userRedux";
import { logoutProfile } from "../../redux/profileReducer";
import profileImage from '../../images/Profile.png'
import { clearCart } from "../../redux/cartRedux";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { quantity } = useSelector(state => state.cart)
  const myProfileState = useSelector((state) => state.profile)
  const headerLinkNames = [
    {
      linkName: "home",
      id: 1,
      linkUrl: "/",
    },
    {
      id: 4,
      linkName: "Owner Of Website",

      linkUrl: "/about",
    },





  ];
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [activeClass, setActiveClass] = useState(false);
  const toggleMenu = (par) => {
    setActiveClass(!activeClass);
    navRef.current.style.setProperty(
      "--childenNumber",
      navRef.current.children.length
    );
    menuRef.current.classList.toggle(`${"menuActive"}`);
  };
  // console.log(currentUser)

  const logout = (par) => {
    dispatch(logoutUser())
    dispatch(logoutProfile())
    dispatch(clearCart())
    navigate("/")
  }
  return (
    <div className={"nav_container"}>
      <nav className={"nav"}>
        <div className={"logoDiv"}>
          <Link to="/" className={"logo"}>
            Ecommerce
          </Link>
        </div>

        {/*  */}
        <div className={"ulDiv"}>
          <ul
            id="nav"
            className={`${"ul"} ${activeClass ? "ulActive" : "false"}`}
            ref={navRef}
          >
            {headerLinkNames.map((item, i) => {
              return (
                <li key={i}

                  className={`
                ${i === 1 ? "ownerWebsite" : ""}

                li_item`}>
                  <Link to={item.linkUrl} className={"item"}>
                    {item.linkName}
                  </Link>
                </li>
              );
            })}

            {currentUser?.status === 201 ? (
              ""
            ) : (
              <li key={"login"} className={"li_item"}>
                <Link to={"/login"} className={"item"}>
                  Login
                </Link>
              </li>
            )}
            {currentUser?.status === 201 ? (
              ""
            ) : (
              <li key={"register"} className={"li_item"}>
                <Link to={"/register"} className={"item"}>
                  Register
                </Link>
              </li>
            )}

            {currentUser?.status === 201 ?
              <li key={"profilee"} className={"li_item"}>
                <Link to={"/profile"} className={"item"}>
                  Profile
                </Link>
              </li> : ""}

            {currentUser ? (
              <Link to="/profile">

                <li key={"profile"} className={"li_item profile"} style={{
                  borderBottom: '5px solid red',
                  position: 'absolute',
                  right: "80px",
                  top: '100px',
                  background: 'black',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                  ,
                  borderRadius: "10px",
                  padding: '5px',
                  zIndex: 99999
                }} >
                  <img src={myProfileState?.myProfile?.avatar?.url ? myProfileState?.myProfile?.avatar?.url : profileImage} alt="" style={{
                    width: '60px',
                    marginBottom: '10px',
                    borderRadius: '10px',
                    border: '1px solid #80808096'
                  }} />
                  <span to={"/profile"} className={"item"} style={{
                    color: 'white',

                    fontWeight: 'bold',
                    fontSize: '10px'

                  }}>
                    {myProfileState?.myProfile?.username ? myProfileState?.myProfile?.username : myProfileState?.myProfile?.name}
                  </span>
                </li>
              </Link>
            ) : (
              ""
            )}
            {currentUser?.status === 201 ? (
              <li style={{ cursor: 'pointer' }} key={"logout"} className={"li_item"} onClick={() => logout()} >
                <p className={"item"} style={{ color: 'red' }}>
                  Logout
                </p>
              </li>
            ) : (
              ""
            )}
            <li key={"search"} className={"li_item"}>
              <Link to={"/search"} className={"item"}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
            </li>
            <li key={"card"} className={"li_item"}>
              <Link to={"/cart"} className={"item"}>
                <span className="CARiTEMS"> {quantity}</span>
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
            </li>
          </ul>
        </div>

        <div onClick={toggleMenu} ref={menuRef} className={"menu"} id="menu">
          <span className={"line"}></span>
          <span className={"line"}></span>
          <span className={"line"}></span>
        </div>
      </nav >
    </div >
  );
};

export default Header;
