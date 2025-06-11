const ChatLoading = () => {
  return (
    <main
      role="status"
      className=" flex flex-col-reverse gap-2 p-2 h-full bg-white animate-pulse"
    >
      <div className="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 self-end"></div>
      <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-30 mb-4 self-start"></div>
      <div className="h-20 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 self-start"></div>
      <div className="receiver"></div>
    </main>
  );
};

export default ChatLoading;
