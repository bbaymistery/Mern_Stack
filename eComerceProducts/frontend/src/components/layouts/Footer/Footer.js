import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>
          Copyrights 2022 &copy;{" "}
          <span style={{ color: "green", fontSize: "1.5rem" }}>
            Elgun Ezmemmedov
          </span>
        </p>
      </div>

      <div className="rightFooter">
        <h4>Contact With Me</h4>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/elgun-ezmemmedov-1628a51b4/"
        >
          LinkedIn
        </a>

        <a
          href="https://wa.me/994506330135"
          title="WhatsApp: XXXXXXXXXX"
          target="_blank"
          rel="noopener
            noreferrer"
        >
          Whatsapp
        </a>
      </div>
    </footer>
  );
};

export default Footer;
