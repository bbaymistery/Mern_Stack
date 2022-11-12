import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useDispatch } from "react-redux";
import { DARK_LIGHT_TOGGLE } from "../../reducers/darkLightModeReducer/darkLightTypes";

const Navbar = () => {
  const dispatch = useDispatch()
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search user..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">

          <div className="item">
            <DarkModeOutlinedIcon

              style={{ cursor: 'pointer' }}
              className="icon"
              onClick={() => dispatch({ type: DARK_LIGHT_TOGGLE })}
            />
          </div>

          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
