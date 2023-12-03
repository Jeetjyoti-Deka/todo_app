"use client";

import { TodoType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Completed = ({
  isCompleted,
  todo,
}: {
  isCompleted: boolean;
  todo: TodoType;
}) => {
  const [completed, setCompleted] = useState(isCompleted);

  useEffect(() => {
    setCompleted(isCompleted);
  }, [isCompleted]);

  const handleClick = () => {
    const indexedDB = window.indexedDB;

    if (!indexedDB) {
      console.log("IndexedDB could not be found in this browser.");
      return;
    }

    const request = indexedDB.open("TodoDatabase");

    request.onerror = function (event) {
      console.error("An error occurred with IndexedDB");
      console.error(event);
      return;
    };

    request.onsuccess = function () {
      console.log("Database opened successfully");

      const db = request.result;

      const transaction = db.transaction("todos", "readwrite");

      const store = transaction.objectStore("todos");

      const changeCompletedStatus = store.put({ ...todo, label: "completed" });

      changeCompletedStatus.onsuccess = function () {
        // router.reload();
        setCompleted(true);
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };
  };

  return (
    <div
      className={cn("cursor-pointer transition-all", {
        "text-gray-400": !completed,
        "text-green-500": completed,
      })}
      onClick={handleClick}
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
