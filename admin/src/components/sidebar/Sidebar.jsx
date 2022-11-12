import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DARK, LIGHT } from "../../reducers/darkLightModeReducer/darkLightTypes";
import Face5Icon from '@mui/icons-material/Face5';
import { logout } from "../../reducers/userReducer/userAction";
const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const toggle = (type) => {
    if (type === "LIGHT") {
      dispatch({ type: LIGHT })
    } else {
      dispatch({ type: DARK })
    }
  }

  const logoutUser = (par) => {
    dispatch(logout())
    navigate("/")
  }
  // console.log(user.username);
  return (
    <div className="sidebar">
      <div className="top">
        <p style={{ textDecoration: "none" }}>
          <span className="logo">{user.username}</span>
        </p>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/products/create" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Create Product</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          {/* <Link to="/reviews" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Reviews</span>
            </li>
          </Link> */}
          <p className="title">USER</p>
    
          {
            !isAuthenticated &&
            <Link to="/login" style={{ textDecoration: "none" }}>
              <li >
                <Face5Icon className="icon" />
                <span>Login</span>
              </li>
            </Link>
          }
          {
            isAuthenticated &&
            <li onClick={logoutUser} style={{ textDecoration: "none" }}>
              <ExitToAppIcon className="icon" />
              <span >Logout</span>
            </li>
          }

        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => toggle("LIGHT")}
        ></div>
        <div
          className="colorOption"
          onClick={() => toggle("DARK")}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
