import { useAppSelector } from "../../lib/Hook";
import Full from "../../assets/addfullscreen.svg";
import Close from "../../assets/close.svg";

const ChatContainer = () => {
  const { currUser } = useAppSelector((state) => state.message);

  return (
    <aside className="chat-box">
      <header className="bg-[#f2c078] p-1 flex justify-between items-center">
        <img
          src={currUser?.image}
          alt=""
          className="aspect-square w-9 rounded-full"
        />

        <div className="flex items-center gap-2">
          <img src={Full} alt="" className="w-6 aspect-square cursor-pointer" />
          <img
            src={Close}
            alt=""
            className="w-6 aspect-square cursor-pointer"
          />
        </div>
      </header>
    </aside>
  );
};

export default ChatContainer;
