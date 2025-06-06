import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../lib/Hook";
import Users from "./Users";
import { useEffect, useMemo } from "react";
type UsersProps = {
  _id: string;
  name: string;
  email: string;
  image: string;
};
type SidebarProps = {
  handleUserMenu: () => void;
};

type Message = {
  message: string;
  receiverId: string;
  senderId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type UserArr = {
  _id: string;
  name: string;
  email: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
};
const Sidebar = ({ handleUserMenu }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const { user, onlineUsers } = useAppSelector((state) => state.user);
  const { users, unreadMessages } = useAppSelector((state) => state.message);

  const sortedUsers = useMemo(() => {
    const onlineSet = new Set(onlineUsers);
    return [...users].sort((a, b) => {
      const aOnline = onlineSet.has(a._id);
      const bOnline = onlineSet.has(b._id);
      return Number(bOnline) - Number(aOnline);
    });
  }, [users, onlineUsers]);

  return (
    <aside className="h-[100svh] w-[250px] p-2 shadow-2xl flex flex-col">
      <p
        onClick={handleUserMenu}
        className=" text-end cursor-pointer text-gray-600 p-3"
      >
        X
      </p>
      <Link to={`/profile/${user?._id}`}>
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
      </Link>

      <div className="flex flex-col gap-5 mt-10">
        {sortedUsers.map((user: UsersProps, index: number) => {
          let count: number = 0;
          unreadMessages?.forEach((messages: Message) => {
            if (messages.senderId === user._id) {
              count++;
            }
          });
          return (
            <Users
              key={index}
              _id={user._id}
              name={user.name}
              email={user.email}
              image={user.image}
              count={count}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
