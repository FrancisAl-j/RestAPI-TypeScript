type UsersProps = {
  _id: string;
  name: string;
  email: string;
  image: string;
};

const Users = ({ _id, name, image }: UsersProps) => {
  return (
    <div className="flex items-center">
      <img src={image} alt="" className="aspect-square w-10 rounded-full" />
      <h1>{name}</h1>
    </div>
  );
};

export default Users;
