import Button from "./Button";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../lib/Hook";
import { LogoutThunk } from "../lib/thunks/authThunks";

const Nav = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(LogoutThunk());
  };

  return (
    <header className="w-full bg-[#f2c078] py-3 shadow-xl">
      <nav className="main-container  flex items-center justify-between">
        <img src={Logo} alt="" className="w-[150px] aspect-[5/2] " />

        {user ? (
          <Button type="delete" func={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link to="/signin">
            <Button type="signin">Sign in</Button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Nav;
