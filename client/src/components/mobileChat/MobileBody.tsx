import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/Hook";
import { LiveMessage, GetMessages } from "../../lib/thunks/messageThunks";
import ChatLoading from "../loadingComponent/ChatLoading";

// Define the structure of a message object
type Message = {
  message: string;
  receiverId: string;
  senderId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * MobileBody Component
 *
 * This component renders the main chat interface for mobile devices.
 * It handles:
 * - Displaying chat messages in chronological order
 * - Real-time message updates via WebSocket/live connection
 * - Lazy loading of older messages when scrolling up
 * - Auto-scrolling to bottom for new messages
 * - Proper scroll position management when loading older messages
 */
const MobileBody = () => {
  // Redux hooks for state management and dispatching actions
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user); // Current logged-in user
  const { messages, isLoading, currUser, hasMore } = useAppSelector(
    (state) => state.message
  ); // Chat-related state

  // State variables for implementing pagination/lazy loading
  const [page, setPage] = useState(1); // Current page for pagination
  const [initialLoad, setInitialLoad] = useState(true); // Flag to track first load
  const LIMIT: number = 20; // Number of messages to load per page

  // Reference to the chat container DOM element for scroll manipulation
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  /**
   * Effect: Auto-scroll to bottom on initial load
   *
   * When messages are first loaded or when switching to a new chat,
   * this scrolls the container to the bottom to show the latest messages.
   * Uses requestAnimationFrame to ensure DOM is updated before scrolling.
   */
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

  /**
   * Effect: Reset pagination when switching users
   *
   * When a new chat/user is selected, reset the page counter
   * and set initialLoad to true to trigger auto-scroll behavior.
   */
  useEffect(() => {
    if (currUser) {
      setPage(1);
      setInitialLoad(true);
    }
  }, [currUser]);

  /**
   * Effect: Initialize real-time message listening
   *
   * Sets up WebSocket/live connection to receive new messages
   * in real-time when the user is authenticated.
   */
  useEffect(() => {
    if (user) {
      dispatch(LiveMessage());
    }
  }, [dispatch, user]);

  /**
   * Handle scroll events for lazy loading older messages
   *
   * When user scrolls to the top of the chat container,
   * load the next page of older messages. Maintains scroll
   * position so user doesn't lose their place in the chat.
   */
  const handleScrolls = async () => {
    const container = chatContainerRef.current;

    // Exit early if container doesn't exist, no more messages, or already loading
    if (!container || !hasMore || isLoading) return;

    // Check if scrolled to the very top and we have a current user
    if (container.scrollTop === 0 && currUser) {
      // Store current scroll height to maintain position after loading
      const prevHeight = container.scrollHeight;

      try {
        // Fetch older messages for the next page
        await dispatch(
          GetMessages({ id: currUser._id, page: page + 1, limit: LIMIT })
        );
        setPage((prev) => prev + 1);

        // Maintain scroll position after new messages are added to the top
        requestAnimationFrame(() => {
          if (container) {
            const newHeight = container.scrollHeight;
            // Set scroll position to maintain user's view
            container.scrollTop = newHeight - prevHeight;
          }
        });
      } catch (err) {
        console.error("Failed to fetch older messages:", err);
      }
    }
  };

  // Show loading component if initial messages are being fetched
  if (isLoading && messages.length === 0) {
    return <ChatLoading />;
  }

  return (
    <main
      ref={chatContainerRef}
      onScroll={handleScrolls}
      className="overflow-y-scroll flex flex-col gap-2 p-2 h-full bg-white"
    >
      {messages
        .slice() // Create a copy to avoid mutating Redux state directly
        .sort(
          // Sort messages by creation date in ascending order (oldest first)
          (a, b) =>
            new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
        )
        .map((data: Message, index: number) => (
          <div
            key={index}
            // Apply different CSS classes based on whether message is sent or received
            className={data.senderId === user?._id ? "sender" : "receiver"}
          >
            <div
              className={
                data.senderId === user?._id
                  ? "sender-container" // Style for messages sent by current user
                  : "receiver-container" // Style for messages received from others
              }
            >
              <h1>{data.message}</h1>
            </div>
          </div>
        ))}
    </main>
  );
};

export default MobileBody;
