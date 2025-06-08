import { chooseUser } from "../lib/message/messageSlice";
import { useAppDispatch, useAppSelector } from "../lib/Hook";
import { SetActiveUser } from "../lib/thunks/messageThunks";
type UsersProps = {
  _id: string;
  name: string;
  email: string;
  image: string;
  count: number;
  handleUserMenu: () => void;
};
import React from "react";

const Users = ({
  _id,
  name,
  image,
  email,
  count,
  handleUserMenu,
}: UsersProps) => {
  const dispatch = useAppDispatch();
  const { onlineUsers } = useAppSelector((state) => state.user);
  const { activeUserChat } = useAppSelector((state) => state.message);

  const handleChooseUser = async () => {
    try {
      await dispatch(chooseUser({ _id, name, image, email }));
      await dispatch(SetActiveUser());
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const handleMobileChooseUser = async () => {
    try {
      await dispatch(chooseUser({ _id, name, image, email }));
      await dispatch(SetActiveUser());
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <div
        onClick={() => {
          handleChooseUser();
          handleUserMenu();
        }}
        className="flex sm:hidden items-center cursor-pointer gap-4 relative"
      >
        <div className="relative">
          <img src={image} alt="" className="aspect-square w-10 rounded-full" />
          <div
            className={`h-3 w-3 ${
              onlineUsers?.includes(_id) ? "bg-green-600" : "bg-gray-500"
            }  rounded-full absolute top-0 right-0`}
          ></div>
        </div>

        <h1>{name}</h1>

        {count !== 0 && (
          <p className="px-2 bg-red-500 text-white rounded-full absolute right-2">
            {count}
          </p>
        )}
      </div>

      <div
        onClick={handleChooseUser}
        className="hidden sm:flex items-center cursor-pointer gap-4 relative"
      >
        <div className="relative">
          <img src={image} alt="" className="aspect-square w-10 rounded-full" />
          <div
            className={`h-3 w-3 ${
              onlineUsers?.includes(_id) ? "bg-green-600" : "bg-gray-500"
            }  rounded-full absolute top-0 right-0`}
          ></div>
        </div>

        <h1>{name}</h1>

        {count !== 0 && (
          <p className="px-2 bg-red-500 text-white rounded-full absolute right-2">
            {count}
          </p>
        )}
      </div>
    </>
  );
};

export default React.memo(Users);
