import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useAppDispatch, useAppSelector } from "../lib/Hook";
import type React from "react";
import { SignupThunk } from "../lib/thunks/authThunks";
import { useState, type ChangeEvent } from "react";
import type { SignupType } from "../lib/Types";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isSigningup, error } = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(SignupThunk(formData));

    if (SignupThunk.fulfilled.match(result)) {
      navigate("/signin");
    }
  };

  return (
    <main className="w-full h-[100svh]">
      <section className="main-container flex h-full flex-col lg:flex-row">
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

        <div className="flex-3/5 lg:flex-1 grid place-items-center">
          <form
            onSubmit={handleSignup}
            className="form-container flex flex-col gap-6"
          >
            <header className="mb-10">
              <h2 className="form-heading text-center">Create Account</h2>
            </header>

            <div className="flex flex-col gap-2">
              <span>Name</span>
              <input
                type="text"
                name="name"
                className="border-1 p-2 rounded-xl"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <span>Email</span>
              <input
                type="email"
                name="email"
                className="border-1 p-2 rounded-xl"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <span>Password</span>
              <input
                type="password"
                name="password"
                className="border-1 p-2 rounded-xl"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button className="bg-green-500 p-2 rounded-xl cursor-pointer">
              {isSigningup ? "Signing up..." : "Create Account"}
            </button>

            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </section>
    </main>
  );
};

export default Signup;
