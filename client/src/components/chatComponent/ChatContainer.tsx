import { useAppSelector, useAppDispatch } from "../../lib/Hook";
import Full from "../../assets/addfullscreen.svg";
import Close from "../../assets/close.svg";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { removeUser } from "../../lib/message/messageSlice";
import { useEffect } from "react";
import { GetMessages } from "../../lib/thunks/messageThunks";

const ChatContainer = () => {
  const dispatch = useAppDispatch();
  const { currUser } = useAppSelector((state) => state.message);

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
  }, [dispatch]);

  return (
    <aside className="chat-box flex flex-col rounded-2xl overflow-hidden">
      <header className="bg-[#f2c078] p-1 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={currUser?.image}
            alt=""
            className="aspect-square w-9 rounded-full"
          />

          <h1 className="capitalize font-semibold">{currUser?.name}</h1>
        </div>

        <div className="flex items-center gap-2">
          <img src={Full} alt="" className="w-6 aspect-square cursor-pointer" />
          <img
            onClick={handleRemoveUser}
            src={Close}
            alt=""
            className="w-6 aspect-square cursor-pointer"
          />
        </div>
      </header>
      <ChatBody />
      {currUser && <ChatInput _id={currUser._id} />}
    </aside>
  );
};

export default ChatContainer;
