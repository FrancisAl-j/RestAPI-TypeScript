import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/Hook";
import {
  LiveMessage,
  LiveUnreadMessages,
} from "../../lib/thunks/messageThunks";

type Message = {
  message: string;
  receiverId: string;
  senderId: string;
  createdAt?: Date;
  updatedAt?: Date;
};
const ChatBody = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { messages } = useAppSelector((state) => state.message);

  // The code below will allow the message to scroll from bottom to top
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (user) {
      dispatch(LiveMessage());
    }
  }, [dispatch, user]);

  return (
    <main
      ref={chatContainerRef}
      className="overflow-y-scroll flex flex-col-reverse gap-2 p-2 flex-1"
    >
      {messages &&
        [...messages].reverse().map((data: Message, index: number) => {
          return (
            <div
              key={index}
              className={`${
                data.senderId === user?._id ? "sender" : "receiver"
              }`}
            >
              <div
                className={`${
                  data.senderId === user?._id
                    ? "sender-container"
                    : "receiver-container"
                }`}
              >
                <h1>{data.message}</h1>
              </div>
            </div>
          );
        })}
    </main>
  );
};

export default ChatBody;
