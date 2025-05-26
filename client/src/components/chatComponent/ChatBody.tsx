import { useAppSelector } from "../../lib/Hook";

type Message = {
  message: string;
  receiverId: string;
  senderId: string;
  createdAt?: Date;
  updatedAt?: Date;
};
const ChatBody = () => {
  const { messages } = useAppSelector((state) => state.message);

  return (
    <main className="flex-1">
      {messages &&
        messages.map((data: Message, index: number) => {
          return (
            <div key={index}>
              <h1>{data.message}</h1>
            </div>
          );
        })}
    </main>
  );
};

export default ChatBody;
