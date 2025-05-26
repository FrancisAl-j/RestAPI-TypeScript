import type React from "react";
import Image from "../../assets/image.svg";
import Send from "../../assets/send.svg";
import { useAppDispatch } from "../../lib/Hook";
import { SendMessage } from "../../lib/thunks/messageThunks";
import { useState, type ChangeEvent, useEffect } from "react";

const ChatInput = ({ _id }: { _id: string }) => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(
      SendMessage({ message, receiverId: _id, image })
    );
    if (SendMessage.fulfilled.match(result)) {
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="bg-[#f2c078] p-2 flex justify-between items-center gap-3"
    >
      <input
        type="text"
        className="bg-white flex-1 p-1 rounded-xl"
        value={message}
        onChange={handleChange}
      />
      <div className="flex gap-1">
        <img src={Image} alt="" className="aspect-square w-6 cursor-pointer" />
        <button
          disabled={!message}
          className={`aspect-square w-6 ${
            message ? "cursor-pointer" : "opacity-40"
          }`}
        >
          <img src={Send} alt="" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
