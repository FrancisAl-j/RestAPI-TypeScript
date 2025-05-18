import { Link } from "react-router-dom";
import Button from "../components/Button";

const Signin = () => {
  return (
    <main className="w-full h-[100svh]">
      <section className="main-container flex h-full">
        <div className="flex-1 grid place-items-center">
          <form className="form-container flex flex-col gap-6">
            <header className="mb-10">
              <h2 className="form-heading text-center">Sign in</h2>
            </header>

            <div className="flex flex-col gap-2">
              <span>Email</span>
              <input
                type="email"
                name="email"
                className="border-1 p-2 rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span>Password</span>
              <input
                type="password"
                name="password"
                className="border-1 p-2 rounded-xl"
              />
            </div>

            <button className="bg-green-500 p-2 rounded-xl cursor-pointer">
              Sign in
            </button>
          </form>
        </div>

        <div className="flex-1 grid place-items-center bg-[#fe5d26]">
          <div className="flex flex-col items-center gap-5">
            <h1 className="big-text text-white text-center">
              Welcome to Yapster
            </h1>
            <p className="catch-phrase text-center">
              Yap it out loud - with Yapster
            </p>
            <Link to="/signup">
              <Button type="signup">Sign Up</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signin;
