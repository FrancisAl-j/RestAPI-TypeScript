import Link from "next/link";

type ButtonProps = {
  text: string;
  to?: string;
  function?: () => void;
};

const ButtonComponent = ({ text, to }: ButtonProps) => {
  return (
    <Link href={`/${to}`}>
      <button>{text}</button>
    </Link>
  );
};

export default ButtonComponent;
