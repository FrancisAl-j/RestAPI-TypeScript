import { useAppSelector } from "../lib/Hook";

const ChatContainer = () => {
  const { currUser } = useAppSelector((state) => state.message);

  return (
    <aside className="chat-box">
      <header className="bg-[#f2c078] p-1">
        <img
          src={currUser?.image}
          alt=""
          className="aspect-square w-9 rounded-full"
        />
      </header>
    </aside>
  );
};

export default ChatContainer;
