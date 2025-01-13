import React from "react";

interface InputProps {
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
  errors?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  className,
  errors,
}) => {
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors ? "border-red-500" : "border-gray-300"
        } ${className}`}
      />
      {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
    </>
  );
};

export default Input;
