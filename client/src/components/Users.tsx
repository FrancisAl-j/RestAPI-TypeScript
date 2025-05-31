import { chooseUser } from "../lib/message/messageSlice";
import { useAppDispatch, useAppSelector } from "../lib/Hook";
type UsersProps = {
  _id: string;
  name: string;
  email: string;
  image: string;
};

const Users = ({ _id, name, image, email }: UsersProps) => {
  const dispatch = useAppDispatch();
  const { onlineUsers } = useAppSelector((state) => state.user);

  const handleChooseUser = async () => {
    try {
      await dispatch(chooseUser({ _id, name, image, email }));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  //! Fix the array creating new array overtime

  return (
    <div
      onClick={handleChooseUser}
      className="flex items-center cursor-pointer"
    >
      <div className="relative">
        <img src={image} alt="" className="aspect-square w-10 rounded-full" />
        <div
          className={`h-3 w-3 ${
            onlineUsers?.includes(_id) ? "bg-green-600" : "bg-gray-500"
          }  rounded-full absolute top-0 right-0`}
        ></div>
      </div>

      <h1>{name}</h1>
    </div>
  );
};

export default Users;
