import { useEffect, useState, type ChangeEvent } from "react";
import { useAppDispatch } from "../../lib/Hook";
import { GetUsers } from "../../lib/thunks/messageThunks";
import Clsoe from "../../assets/close.svg";

const Search = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    // Debouncing to prevent multiple API calls
    const getData = setTimeout(() => {
      setIsLoading(true);
      dispatch(GetUsers(query));
    }, 2000);

    return () => {
      setIsLoading(false);
      clearTimeout(getData);
    };
  }, [dispatch, query]);

  const handleClear = () => {
    setQuery("");
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

      {query?.length !== 0 && (
        <img
          src={Clsoe}
          alt="close icon"
          onClick={handleClear}
          className="cursor-pointer aspect-square w-5 absolute top-6 right-3"
        />
      )}
    </div>
  );
};

export default Search;
