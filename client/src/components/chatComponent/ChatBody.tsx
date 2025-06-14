import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/Hook";
import { GetMessages, LiveMessage } from "../../lib/thunks/messageThunks";
import ChatLoading from "../loadingComponent/ChatLoading";

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
  const { messages, isLoading, currUser, hasMore } = useAppSelector(
    (state) => state.message
  );

  const [page, setPage] = useState(1);
  const [initialLoad, setInitialLoad] = useState(true);
  const LIMIT = 20;

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom on first load or when switching users
  useEffect(() => {
    if (initialLoad && messages.length > 0) {
      requestAnimationFrame(() => {
        const container = chatContainerRef.current;
        if (container) {
          container.scrollTop = container.scrollHeight;
          setInitialLoad(false);
        }
      });
    }
  }, [messages, initialLoad]);

  // Reset on switching user
  useEffect(() => {
    if (currUser) {
      setPage(1);
      setInitialLoad(true);
    }
  }, [currUser]);

  // Listen for real-time messages
  useEffect(() => {
    if (user) {
      dispatch(LiveMessage());
    }
  }, [dispatch, user]);

  // Load older messages on scroll up
  const handleScrolls = async () => {
    const container = chatContainerRef.current;
    if (!container || !hasMore || isLoading) return;

    if (container.scrollTop === 0 && currUser) {
      const prevHeight = container.scrollHeight;

      try {
        await dispatch(
          GetMessages({ id: currUser._id, page: page + 1, limit: LIMIT })
        );
        setPage((prev) => prev + 1);

        requestAnimationFrame(() => {
          if (container) {
            const newHeight = container.scrollHeight;
            container.scrollTop = newHeight - prevHeight;
          }
        });
      } catch (err) {
        console.error("Failed to fetch older messages:", err);
      }
    }
  };

  if (isLoading && messages.length === 0) {
    return <ChatLoading />;
  }

  return (
    <main
      ref={chatContainerRef}
      onScroll={handleScrolls}
      className="overflow-y-scroll flex flex-col gap-2 p-2 flex-1"
    >
      {messages
        .slice() // create a copy to avoid mutating Redux state
        .sort(
          (a, b) =>
            new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
        )
        .map((data: Message, index: number) => (
          <div
            key={index}
            className={data.senderId === user?._id ? "sender" : "receiver"}
          >
            <div
              className={
                data.senderId === user?._id
                  ? "sender-container"
                  : "receiver-container"
              }
            >
              <h1>{data.message}</h1>
            </div>
          </div>
        ))}
    </main>
  );
};

export default ChatBody;
