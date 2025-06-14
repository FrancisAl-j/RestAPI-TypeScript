import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../lib/Hook";
import Users from "./Users";
import React, { useEffect, useMemo } from "react";
import { LiveUnreadMessages } from "../lib/thunks/messageThunks";
import Search from "./chatComponent/Search";
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

  useEffect(() => {
    if (user) {
      dispatch(LiveUnreadMessages());
    }
  }, [dispatch, user]);

  // Fix the Live Indication unread message Tommorow

  return (
    <aside className="absolute sn:static h-[100svh] w-full sm:w-[250px] p-2 shadow-2xl flex flex-col overflow-auto z-50 bg-[#f2c078] top-0 left-0">
      <p
        onClick={handleUserMenu}
        className=" text-end cursor-pointer text-gray-600 p-3"
      >
        X
      </p>
      <Search />
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
              handleUserMenu={handleUserMenu}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
