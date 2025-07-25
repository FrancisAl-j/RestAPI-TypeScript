import { lazy, useEffect, useState } from "react";
import Nav from "./components/Nav";
import { Routes, Route, Navigate, matchPath } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { useAppSelector, useAppDispatch } from "./lib/Hook";
import Loading from "./components/Loading";
import { CheckAuthThunk } from "./lib/thunks/authThunks";
import Sidebar from "./components/Sidebar";
import {
  GetUsers,
  LiveUnreadMessages,
  UnreadMessages,
} from "./lib/thunks/messageThunks";
//import ChatContainer from "./components/chatComponent/ChatContainer";
import Profile from "./pages/Profile";
import UserMenu from "./assets/usermenu.svg";
//import MobileContainer from "./components/mobileChat/MobileContainer";
import { useLocation } from "react-router-dom";

const ChatContainer = lazy(
  () => import("./components/chatComponent/ChatContainer")
);

const MobileContainer = lazy(
  () => import("./components/mobileChat/MobileContainer")
);
const App = () => {
  const dispatch = useAppDispatch();
  const { user, isChecking } = useAppSelector((state) => state.user);
  const { currUser } = useAppSelector((state) => state.message);
  const [isShow, setIsShow] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const location = useLocation();
  const isMobileRoute = !!matchPath("/user/:id", location.pathname);

  window.addEventListener("resize", () => {
    setInnerWidth(window.innerWidth);
  });

  useEffect(() => {
    if (user) {
      dispatch(LiveUnreadMessages());
    }
  }, [dispatch, user]);

  useEffect(() => {
    const init = async () => {
      const result = await dispatch(CheckAuthThunk());
      if (CheckAuthThunk.fulfilled.match(result)) {
        dispatch(GetUsers(""));
        dispatch(UnreadMessages());
        dispatch(LiveUnreadMessages());
      }
    };

    init();
  }, [dispatch]);

  if (isChecking && !user) {
    return <Loading />;
  }

  const handleUserMenu = () => {
    setIsShow(!isShow);
  };

  return (
    <>
      <div className="w-full relative">
        {!isMobileRoute && currUser && user && <ChatContainer />}
        <Nav handleUserMenu={handleUserMenu} />
        {!isShow && user && (
          <div
            onClick={handleUserMenu}
            className="hidden sm:block bg-[#f2c078] fixed top-[15%] left-[1%] cursor-pointer p-1 rounded-2xl"
          >
            <img src={UserMenu} alt="" className="aspect-square w-8" />
          </div>
        )}

        <div className="flex">
          {user && isShow && <Sidebar handleUserMenu={handleUserMenu} />}

          <main className="flex-1">
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

              <Route
                path="/profile/:id"
                element={user ? <Profile /> : <Navigate to="/" />}
              />

              <Route
                path="/user/:id"
                element={currUser ? <MobileContainer /> : <Home />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
