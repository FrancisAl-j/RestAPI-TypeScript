import { useAppSelector, useAppDispatch } from "../../lib/Hook";
import Full from "../../assets/addfullscreen.svg";
import ExitFull from "../../assets/minusfullscreen.svg";
import Close from "../../assets/close.svg";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { removeUser } from "../../lib/message/messageSlice";
import { useEffect, useState } from "react";
import { GetMessages } from "../../lib/thunks/messageThunks";

const ChatContainer = () => {
  const dispatch = useAppDispatch();
  const { currUser } = useAppSelector((state) => state.message);
  const { onlineUsers } = useAppSelector((state) => state.user);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleRemoveUser = async () => {
    await dispatch(removeUser());
  };

  useEffect(() => {
    const init = async () => {
      if (currUser) {
        await dispatch(GetMessages({ id: currUser._id }));
      }
    };

    init();
  }, [dispatch, currUser]);

  const handleFullscreen = () => {
    setIsFullscreen((prevState) => !prevState);
  };

  return (
    <aside className="chat-box flex flex-col rounded-2xl overflow-hidden">
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

        <div className="flex items-center gap-2">
          <img
            src={isFullscreen ? ExitFull : Full}
            alt=""
            className="w-6 aspect-square cursor-pointer"
            onClick={handleFullscreen}
            loading="lazy"
          />
          <img
            onClick={handleRemoveUser}
            src={Close}
            alt=""
            className="w-6 aspect-square cursor-pointer"
            loading="lazy"
          />
        </div>
      </header>
      <ChatBody />
      {currUser && <ChatInput _id={currUser._id} />}
    </aside>
  );
};

export default ChatContainer;
