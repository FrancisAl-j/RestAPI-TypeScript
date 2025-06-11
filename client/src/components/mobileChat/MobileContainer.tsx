import MobileBody from "./MobileBody";
import MobileHeader from "./MobileHeader";
import MobileInput from "./MobileInput";
import { useAppSelector } from "../../lib/Hook";

const MobileContainer = () => {
  const { currUser } = useAppSelector((state) => state.message);

  return (
    <div className="h-[76svh] bg-white block sm:hidden">
      <MobileHeader />
      <MobileBody />
      {currUser && <MobileInput _id={currUser._id} />}
    </div>
  );
};

export default MobileContainer;
