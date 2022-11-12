import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useSelector } from "react-redux";
import NotAdmin from "./NotAdmin";
import { getCookie } from "../../helpers/cokieesFunc";
import { useEffect } from "react";

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const { users } = useSelector((state) => state.allUser)
  const { orders } = useSelector((state) => state.allorders)

  if (user?.role === 'user') return <NotAdmin />


  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          {users?.length && <Widget type="user" amounts={users.length} />}
          {orders?.length && <Widget type="order" amounts={orders.length} />}
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
