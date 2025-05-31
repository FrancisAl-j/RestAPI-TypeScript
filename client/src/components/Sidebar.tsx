import { useAppSelector, useAppDispatch } from "../lib/Hook";
import Users from "./Users";
type UsersProps = {
  _id: string;
  name: string;
  email: string;
  image: string;
};
const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { user, onlineUsers } = useAppSelector((state) => state.user);
  const { users } = useAppSelector((state) => state.message);

  return (
    <aside className="h-[100svh] w-[250px] p-2 shadow-2xl flex flex-col">
      <p className=" text-end cursor-pointer text-gray-600 p-3">X</p>
      <header className="flex items-center gap-10">
        <div className="relative">
          <img
            src={user?.image}
            alt=""
            className=" aspect-square w-10 rounded-full"
          />
          <div className="h-3 w-3 bg-green-600 rounded-full absolute top-0 right-0"></div>
        </div>

        <p>{user?.name}</p>
      </header>

      <div className="flex flex-col gap-5 mt-10">
        {users.map((user: UsersProps, index: number) => {
          return (
            <Users
              key={index}
              _id={user._id}
              name={user.name}
              email={user.email}
              image={user.image}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
