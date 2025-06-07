import { useState, type ChangeEvent } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="bg-white w-full my-3 p-2 rounded-xl"
        placeholder="Search user..."
      />
    </div>
  );
};

export default Search;
