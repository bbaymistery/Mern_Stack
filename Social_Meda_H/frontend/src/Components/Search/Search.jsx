import { Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/UserActions";
import User from "../User/User";
import "./styles.css";

const Search = () => {
  const [name, setName] = React.useState("");

  const { users, loading } = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setName(e.target.value);
    dispatch(getAllUsers(e.target.value));
  };
  return (
    <div className="search">
      <form className="searchForm">
        <Typography variant="body2" style={{ padding: "2vmax" }}>
          😎
        </Typography>

        <input
          type="text"
          value={name}
          placeholder="Search"
          required
          onChange={handleChange}
        />

        <div className="searchResults">
          {users &&
            users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))}
        </div>
      </form>
    </div>
  );
};

export default Search;
