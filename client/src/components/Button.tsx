import type { JSX } from "react";

type ButtonProps = {
  type: "signin" | "delete";
  path?: string;
  func?: () => void;
  children: React.ReactNode;
};

type ButtonTypes = {
  signin: string;
  default: string;
};

const Button = ({ type, path, func, children }: ButtonProps): JSX.Element => {
  const buttonTypes: Record<string, string> = {
    signin: "py-2 px-6 bg-[#c1dbb3] cursor-pointer rounded-2xl",
    delete: "py-2 px-6 bg-red-600 cursor-pointer rounded-2xl text-white",
    default: "py-2 px-6 bg-[#c1dbb3] cursor-pointer rounded-2xl",
  };
  return (
    <button className={`${buttonTypes[type] || buttonTypes.default}`}>
      {children}
    </button>
  );
};

export default Button;
