import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/Hook";
import {
  LiveMessage,
  LiveUnreadMessages,
} from "../../lib/thunks/messageThunks";
import ChatLoading from "../loadingComponent/ChatLoading";

type Message = {
  message: string;
  receiverId: string;
  senderId: string;
  createdAt?: Date;
  updatedAt?: Date;
};
const MobileBody = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { messages, isLoading } = useAppSelector((state) => state.message);

  // Variables needed for Lazy Loading of older chats
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingOlder, setIsFetchingOlder] = useState(false);

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

  // Scroll Detection
  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (!container || isFetchingOlder || !hasMore) return;

    if (container.scrollTop === 0) {
      setIsFetchingOlder(true);
    }

    try {
    } catch (error) {}
  };

  return (
    <main
      ref={chatContainerRef}
      className="overflow-y-scroll flex flex-col-reverse gap-2 p-2 h-full bg-white"
    >
      {!isLoading && messages ? (
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
        })
      ) : (
        <ChatLoading />
      )}
    </main>
  );
};

export default MobileBody;
