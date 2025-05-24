import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text: string;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLButtonElement>) => void;
  className?: string;
  color?: "blue" | "red" | "green" | "gray";
  disabled?: boolean;
}

const colorMap: Record<string, string> = {
  blue: "bg-blue-600 hover:bg-blue-700 text-white",
  red: "bg-red-600 hover:bg-red-700 text-white",
  green: "bg-green-600 hover:bg-green-700 text-white",
  gray: "bg-gray-400 hover:bg-gray-500 text-white",
};

export default function Button({
  type = "button",
  text,
  loading = false,
  onClick,
  className = "",
  color = "blue",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`w-full py-2 rounded font-semibold transition flex items-center justify-center ${colorMap[color]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      )}
      {loading ? "Loading..." : text}
    </button>
  );
}
