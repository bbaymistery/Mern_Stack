import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useDispatch, useSelector } from "react-redux";
import { DARK_LIGHT_TOGGLE } from "../../reducers/darkLightModeReducer/darkLightTypes";
import { Link } from 'react-router-dom'
import img from '../../images/Profile.png'
const Navbar = () => {
  const dispatch = useDispatch()
  const { loaading: isFetching, user, error, isAuthenticated } = useSelector((state) => state.user)

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
          {
            isAuthenticated &&
            <div className="item">
              <Link to="/profile">
                <img
                  src={user?.avatar?.url ? user.avatar.url : img}
                  alt=""
                  className="avatar"
                />
              </Link>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
