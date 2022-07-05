import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./components/screens/LandingPage/LandingPage";
import MyNotes from "./components/screens/MyNotes/MyNotes";
import LoginScreen from "./components/screens/LoginScreen/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen/RegisterScreen";
import CreateNote from "./components/screens/CreateNote/CreateNote";
import SingleNote from "./components/screens/SingleNote/SingleNote";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState();
  return (
    <>
      <Router>
        <Header setSearch={setSearch} />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/mynotes" element={<MyNotes search={search} />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />{" "}
            <Route path="/createnote" element={<CreateNote />} />;
            <Route path="/note/:id" element={<SingleNote />} />;
          </Routes>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
//7nci videodan basla
