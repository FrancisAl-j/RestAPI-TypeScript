import { Link } from "react-router-dom";
import Button from "../components/Button";

const Signup = () => {
  return (
    <main className="w-full h-[100svh]">
      <section className="main-container flex h-full">
        <div className="flex-1 grid place-items-center bg-[#fe5d26]">
          <div className="flex flex-col items-center gap-5">
            <h1 className="big-text text-white text-center">Hello, Friend</h1>
            <p className="catch-phrase text-center">
              Sign up now and start your journey with us.
            </p>
            <Link to="/signin">
              <Button type="signin">Sign In</Button>
            </Link>
          </div>
        </div>

        <div className="flex-1 grid place-items-center">
          <form className="form-container flex flex-col gap-6">
            <header className="mb-10">
              <h2 className="form-heading text-center">Create Account</h2>
            </header>

            <div className="flex flex-col gap-2">
              <span>Name</span>
              <input
                type="text"
                name="name"
                className="border-1 p-2 rounded-xl"
              />
            </div>

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
              Create Account
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Signup;
