import { useState, type ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../lib/Hook";
import { UpdateUserThunk } from "../lib/thunks/authThunks";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(UpdateUserThunk(formData));
  };

  return (
    <main className=" h-[100svh] grid place-items-center">
      <form
        onSubmit={handleUpdateUser}
        className="form-container bg-white rounded-2xl shadow-xl p-3 flex flex-col gap-6"
      >
        <header className="my-5">
          <h1 className="text-center font-bold text-3xl ">Profile</h1>
        </header>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border-[1px] border-black p-2 rounded-xl"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-[1px] border-black p-2 rounded-xl cursor-not-allowed"
            disabled
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border-[1px] border-black p-2 rounded-xl"
          />
        </div>

        <button className="bg-green-600 p-2 rounded-xl cursor-pointer text-white">
          Update
        </button>
      </form>
    </main>
  );
};

export default Profile;
