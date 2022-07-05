import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const Header = () => {
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <div className="header">
      <Link to="/" onClick={() => setTab("/")}>
        {tab === "/" ? <Home style={{ color: "black" }} /> : <HomeOutlined />}
      </Link>

      <Link to="/newpost" onClick={() => setTab("/newpost")}>
        {tab === "/newpost" ? (
          <Add style={{ color: "black" }} />
        ) : (
          <AddOutlined />
        )}
      </Link>

      <Link to="/search" onClick={() => setTab("/search")}>
        {tab === "/search" ? (
          <Search style={{ color: "black" }} />
        ) : (
          <SearchOutlined />
        )}
      </Link>

      <Link to="/account" onClick={() => setTab("/account")}>
        {tab === "/account" ? (
          <Avatar
            src={user.avatar.url}
            style={{ boxShadow: "rgba(0, 0, 0, 0.75) 0px 5px 15px" }}
            sx={{ height: "2vmax", width: "2vmax" }}
          />
        ) : (
          <Avatar
            src={user.avatar.url}
            sx={{ height: "2vmax", width: "2vmax" }}
          />
        )}
      </Link>
    </div>
  );
};

export default Header;
