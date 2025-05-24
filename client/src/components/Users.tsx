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

  const handleChooseUser = async () => {
    try {
      await dispatch(chooseUser({ _id, name, image, email }));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div
      onClick={handleChooseUser}
      className="flex items-center cursor-pointer"
    >
      <img src={image} alt="" className="aspect-square w-10 rounded-full" />
      <h1>{name}</h1>
    </div>
  );
};

export default Users;
