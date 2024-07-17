type BtnColorType = {
  [color in "gray" | "orange" | "red"]:
    | "bg-gray-900"
    | "bg-orange-500"
    | "bg-red-500";
};

type BtnSizeType = {
  [size in "sm" | "md" | "lg"]:
    | "py-1 px-2 text-sm"
    | "py-1 px-4 text-base"
    | "py-2 px-6 text-lg";
};

interface IButtonProps {
  children: string;
  type?: "button" | "submit" | "reset" | undefined;
  bgColor?: "gray" | "orange" | "red";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}
const Button: React.FC<IButtonProps> = ({
  children,
  type = "button",
  bgColor = "orange",
  size = "md",
  ...rest
}) => {
  const btnColor: BtnColorType = {
    gray: `bg-gray-900`,
    orange: "bg-orange-500",
    red: "bg-red-500",
  };
  const btnSize: BtnSizeType = {
    sm: "py-1 px-2 text-sm",
    md: "py-1 px-4 text-base",
    lg: "py-2 px-6 text-lg",
  };

  return (
    <button
      type={type}
      className={`${btnColor[bgColor]} ${btnSize[size]} text-white font-semibold ml-2 text-base hover:bg-amber-400 rounded`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
