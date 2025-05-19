import React, { useEffect, useState } from "react";
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
import { useAppSelector, useAppDispatch } from "./lib/Hook";
import Loading from "./components/Loading";
import { CheckAuthThunk } from "./lib/thunks/authThunks";

const App = () => {
  const dispatch = useAppDispatch();
  const { user, isChecking } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(CheckAuthThunk());
  }, [dispatch]);

  if (isChecking && !user) {
    return <Loading />;
  }

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
