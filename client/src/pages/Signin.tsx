import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import React, { useEffect, useState, type ChangeEvent } from "react";
import type { SigninType } from "../lib/Types";
import { useAppDispatch, useAppSelector } from "../lib/Hook";
import { SigninThunk } from "../lib/thunks/authThunks";
import { GetUsers } from "../lib/thunks/messageThunks";

const Signin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, isSigningin } = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState<SigninType>({
    email: "",
    password: "",
  });

  const [visited, setVisited] = useState(0);

  useEffect(() => {
    const value = localStorage.getItem("visited");
    if (typeof value === "string") {
      setVisited(Number(JSON.parse(value)));
    }
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(SigninThunk(formData));

    if (SigninThunk.fulfilled.match(result)) {
      dispatch(GetUsers(""));
      navigate("/");
    }
  };
  return (
    <main className="w-full h-[100svh]">
      <section className="main-container flex h-full flex-col-reverse lg:flex-row">
        <div className="flex-3/5 lg:flex-1 grid place-items-center">
          <form
            onSubmit={handleSubmit}
            className="form-container flex flex-col gap-6"
          >
            <header className="mb-10">
              <h2 className="form-heading text-center">Sign in</h2>
            </header>

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
              {isSigningin ? "Logging in..." : "Sign in"}
            </button>

            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>

        <div className="flex-1 grid place-items-center bg-[#fe5d26]">
          <div className="flex flex-col items-center gap-5">
            <h1 className="big-text text-white text-center">
              {visited === 0 ? "Welcome to Yapster" : "Welcome back"}
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
