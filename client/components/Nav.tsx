"use client";
import ButtonComponent from "./ButtonComponent";

const Nav = () => {
  return (
    <header className="w-full bg-[#A08963]">
      <nav className="main-container">
        <h1>Yapster</h1>
        <ButtonComponent text="Signin" to="signin" />
      </nav>
    </header>
  );
};

export default Nav;
