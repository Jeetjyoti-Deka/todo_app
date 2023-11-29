"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const Completed = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  return (
    <div
      className={cn("cursor-pointer transition-all", {
        "text-gray-400": !isCompleted,
        "text-green-500": isCompleted,
      })}
      onClick={() => setIsCompleted((prev) => !prev)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-9 h-9"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
};
export default Completed;
