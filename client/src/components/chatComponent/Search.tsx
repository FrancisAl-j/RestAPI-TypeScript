import { useEffect, useState, type ChangeEvent } from "react";
import { useAppDispatch } from "../../lib/Hook";
import { GetUsers } from "../../lib/thunks/messageThunks";

const Search = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    dispatch(GetUsers(query));
  }, [dispatch, query]);
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
