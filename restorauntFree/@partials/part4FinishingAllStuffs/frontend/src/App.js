import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddReview from "./components/add-review";
import Restaurant from "./components/restaurant";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";
import React from "react";
function App() {
  const [user, setUser] = React.useState(null);
  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/restaurants" className="navbar-brand">
            Restaurant Reviews
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/restaurants"} className="nav-link">
                Restaurants
              </Link>
            </li>
            <li className="nav-item">
              {user ? (
                <a
                  onClick={logout}
                  href="/"
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Logout {user.name}
                </a>
              ) : (
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              )}
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            {["/", "/restaurants"].map((path) => (
              <Route
                key="Home" // optional: avoid full re-renders on route changes
                path={path}
                element={<RestaurantsList />}
              />
            ))}
            <Route
              path="/restaurants/:id/review"
              element={<AddReview user={user} />}
            />
            <Route
              path="/restaurants/:id"
              element={<Restaurant user={user} />}
            />
            <Route path="/login" element={<Login login={login} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
