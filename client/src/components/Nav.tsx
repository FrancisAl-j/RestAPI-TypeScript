import Button from "./Button";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../lib/Hook";
import { LogoutThunk } from "../lib/thunks/authThunks";
import Menu from "../assets/menu.svg";

const Nav = ({ handleUserMenu }: { handleUserMenu: () => void }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(LogoutThunk());
  };

  return (
    <header className="w-full bg-[#f2c078] py-3 shadow-xl">
      <nav className="main-container  flex items-center justify-between">
        <Link to="/">
          <img src={Logo} alt="" className="w-[150px] aspect-[5/2] " />
        </Link>

        <div className="hidden sm:flex">
          {user ? (
            <Button type="delete" func={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/signin">
              <Button type="signin">Sign in</Button>
            </Link>
          )}
        </div>

        <img
          src={Menu}
          alt="menu logo"
          onClick={handleUserMenu}
          className="aspect-square w-10 block sm:hidden"
        />
      </nav>
    </header>
  );
};

export default Nav;
