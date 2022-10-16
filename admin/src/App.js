import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    console.log(user);

    if (!user) return <Navigate to="/login" />;
    return children;
  };
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          {/* //!nested routes  */}
          <Route path="/">
            <Route
              index
              element={<ProtectedRoute>  <Home /></ProtectedRoute>}
            />
            <Route path="login" element={<Login />} />

            <Route path="users">
              <Route
                index
                element={<ProtectedRoute> <List columns={userColumns} /></ProtectedRoute>}
              />
              <Route
                path=":userId"
                element={<ProtectedRoute>  <Single /> </ProtectedRoute>}
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route>


            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />
            </Route>



            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>

        {/* / /users =>  List page    */}
        {/* / /users/userId =>  Single    */}
        {/*  /users/new =>  New    */}
      </BrowserRouter>
    </div>
  );
}

export default App;
