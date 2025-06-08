import { useAppSelector, useAppDispatch } from "../../lib/Hook";
import Full from "../../assets/addfullscreen.svg";
import ExitFull from "../../assets/minusfullscreen.svg";
import Close from "../../assets/close.svg";
import { removeUser } from "../../lib/message/messageSlice";
import { useEffect, useState } from "react";
import {
  GetMessages,
  RemoveActiveUser,
  UnreadMessages,
} from "../../lib/thunks/messageThunks";

const MobileHeader = () => {
  const dispatch = useAppDispatch();
  const { currUser } = useAppSelector((state) => state.message);
  const { onlineUsers } = useAppSelector((state) => state.user);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleRemoveUser = async () => {
    await dispatch(removeUser());
    await dispatch(RemoveActiveUser());
  };

  useEffect(() => {
    const init = async () => {
      if (currUser) {
        await dispatch(GetMessages({ id: currUser._id }));
        await dispatch(UnreadMessages());
      }
    };

    init();
  }, [dispatch, currUser]);

  const handleFullscreen = () => {
    setIsFullscreen((prevState) => !prevState);
  };

  return (
    <header className="bg-[#f2c078] p-1 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={currUser?.image}
            alt=""
            className="aspect-square w-9 rounded-full"
          />
          <div
            className={`h-3 w-3 ${
              onlineUsers?.includes(currUser?._id as string)
                ? "bg-green-600"
                : "bg-gray-500"
            }  rounded-full absolute top-0 right-0`}
          ></div>
        </div>

        <h1 className="capitalize font-semibold">{currUser?.name}</h1>
      </div>
    </header>
  );
};

export default MobileHeader;
