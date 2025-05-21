import { useAppSelector } from "../lib/Hook";

const Sidebar = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <aside className="h-[100svh] w-[250px] p-2 shadow-2xl flex flex-col">
      <p className=" text-end cursor-pointer text-gray-600 p-3">X</p>
      <header className="flex items-center gap-10">
        <img
          src={user?.image}
          alt=""
          className=" aspect-square w-10 rounded-full"
        />

        <p>{user?.name}</p>
      </header>
    </aside>
  );
};

export default Sidebar;
