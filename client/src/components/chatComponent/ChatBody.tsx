import { useAppSelector } from "../../lib/Hook";

const ChatBody = () => {
  const { messages } = useAppSelector((state) => state.message);
  console.log(messages);

  return (
    <main className="flex-1">
      <div></div>
    </main>
  );
};

export default ChatBody;
