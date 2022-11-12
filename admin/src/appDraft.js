import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useSelector, useDispatch } from "react-redux";
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { useEffect } from "react";
import { getAllUsers, loaduserIfExist } from "./reducers/userReducer/userAction";
import { getAllOrders } from "./reducers/orderReducer/oderAction";
import OrderList from "./pages/OrderList/OrderList";
import ProceesOrder from "./pages/ProcessOrder/ProcessOrder";
import store from "./store";

import './App.css'
import UsersList from "./pages/Users/UserList";
import UpdateUser from "./pages/UpdateUser/UpdateUser";
import { getCookie } from "./helpers/cokieesFunc";
function App() {
    const { darkMode } = useSelector((state) => state.darkLight)
    const { isAuthenticated } = useSelector((state) => state.user)

    const dispatch = useDispatch()
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getAllUsers())
            dispatch(getAllOrders())
        }
    }, [dispatch, isAuthenticated])

    useEffect(() => {
        console.log("apppppppppppppp", getCookie("token-admin"));
    }, [])

    return (
        <>
            {
                isAuthenticated ?
                    <div className={darkMode ? "app dark" : "app"}>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/">
                                    <Route index element={<Home />} />
                                    <Route path="orders">
                                        <Route index element={<OrderList />} />
                                        <Route path=":id" element={<ProceesOrder />} />
                                    </Route>
                                    <Route path="users">
                                        <Route index element={<UsersList />} />
                                        <Route path=":id" element={<UpdateUser />} />
                                    </Route>
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </div>
                    :
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/password/forgot" element={<ForgotPassword />} />
                            <Route path="/password/reset/:token" element={<ResetPassword />} />
                        </Routes>
                    </BrowserRouter>
            }
        </>
    );
}

export default App;
//  <Route path="users">
//               <Route index element={<List />} />
//               <Route path=":userId" element={<Single />} />
//               <Route
//                 path="new"
//                 element={<New inputs={userInputs} title="Add New User" />}
//               />
//             </Route>
//  <Route path="products">
//               <Route index element={<List />} />
//               <Route path=":productId" element={<Single />} />
//               <Route
//                 path="new"
//                 element={<New inputs={productInputs} title="Add New Product" />}
//               />
//             </Route>