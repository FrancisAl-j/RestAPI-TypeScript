type ButtonProps = {
  type: string;
  link?: string;
  func?: () => void;
  children: React.ReactNode;
};

const Button = ({ type, link, func, children }: ButtonProps) => {
  return <button>{children}</button>;
};

export default Button;
