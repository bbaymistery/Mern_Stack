import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.scss";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const headerLinkNames = [
    {
      linkName: "home",
      id: 1,
      linkUrl: "/",
    },

    {
      id: 2,
      linkName: "products",

      linkUrl: "/products",
    },

    {
      id: 3,
      linkName: "Contact",

      linkUrl: "/contact",
    },

    {
      id: 4,
      linkName: "Owner Of Website",

      linkUrl: "/about",
    },
  ];
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const [activeClass, setActiveClass] = useState(false);
  const toggleMenu = (par) => {
    setActiveClass(!activeClass);
    navRef.current.style.setProperty(
      "--childenNumber",
      navRef.current.children.length
    );
    menuRef.current.classList.toggle(`${"menuActive"}`);
  };
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
              console.log(i);

              return (
                <li key={item.id} className={`${i === 3 ? "ownerWebsite" : ""} li_item`}>
                  <Link to={item.linkUrl} className={"item"}>
                    {item.linkName}
                  </Link>
                </li>
              );
            })}
            <li key={"search"} className={"li_item"}>
              <Link to={"/search"} className={"item"}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
            </li>
            <li key={"card"} className={"li_item"}>
              <Link to={"/cart"} className={"item"}>
                <span className="CARiTEMS"> {cartItems.length}</span>
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
            </li>

            {isAuthenticated ? (
              ""
            ) : (
              <li key={"login"} className={"li_item"}>
                <Link to={"/login"} className={"item"}>
                  <i className="fa-solid fa-user"></i>
                </Link>
              </li>
            )}
            {/**/}
          </ul>
        </div>

        <div onClick={toggleMenu} ref={menuRef} className={"menu"} id="menu">
          <span className={"line"}></span>
          <span className={"line"}></span>
          <span className={"line"}></span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
