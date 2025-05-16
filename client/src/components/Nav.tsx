import Button from "./Button";
import Logo from "../assets/logo.png";

const Nav = () => {
  return (
    <header>
      <nav>
        <img className="" src={Logo} alt="" />

        <Button type="sigin">Sign in</Button>
      </nav>
    </header>
  );
};

export default Nav;
