import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Widget = ({ type, amounts }) => {

  const [amount, setAmount] = useState(0)
  const [diff, setDiff] = useState(100)
  const [data, setData] = useState({})

  useEffect(() => {
    setAmount(amounts)
    switch (type) {
      case "user":
        setData({
          title: "USERS",
          isMoney: false,
          link: "See all users",
          url: "/users",
          icon: (
            <PersonOutlinedIcon
              className="icon"
              style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
        })
        break;
      case "order":
        setData({
          title: "ORDERS",
          isMoney: false,
          link: "View all orders",
          url: "/orders",
          icon: (
            <ShoppingCartOutlinedIcon
              className="icon"
              style={{
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "goldenrod",
              }}
            />
          ),
        })
        break;
      default:
        break;
    }
  }, [amounts, type])

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <Link to={data.url} style={{ textDecoration: 'none', color: 'gray' }}>
          <span style={{ cursor: 'pointer' }} className="link">{data.link}</span>
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
        // case "earning":
        //   data = {
        //     title: "EARNINGS",
        //     isMoney: true,
        //     link: "View net earnings",
        //     icon: (
        //       <MonetizationOnOutlinedIcon
        //         className="icon"
        //         style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
        //       />
        //     ),
        //   };
        //   break;
        // case "balance":

// data = {
//   title: "BALANCE",
//   isMoney: true,
//   link: "See details",
//   icon: (
//     <AccountBalanceWalletOutlinedIcon
//       className="icon"
//       style={{
//         backgroundColor: "rgba(128, 0, 128, 0.2)",
//         color: "purple",
//       }}
//     />
//   ),
// };
// break;