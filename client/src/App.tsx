import React from "react";
import Nav from "./components/Nav";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { useAppSelector } from "./lib/Hook";

const App = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <Router>
      <div className="w-full">
        <Nav />
        <main>
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/signin" />}
            />
            <Route
              path="/signin"
              element={user ? <Navigate to="/" /> : <Signin />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
