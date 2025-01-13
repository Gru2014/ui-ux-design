import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  handleClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  handleClick,
}) => {
  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center justify-between font-bold mb-3 text-gray-700 hover:text-gray-900 transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
