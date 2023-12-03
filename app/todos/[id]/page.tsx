"use client";

import Completed from "@/components/icons/Completed";
import { Button, buttonVariants } from "@/components/ui/button";
import { TodoType } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const TodoDetailPage = ({ params }: { params: { id: string } }) => {
  const [todo, setTodo] = useState<TodoType | null>(null);

  useEffect(() => {
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

      const transaction = db.transaction("todos", "readonly");

      const store = transaction.objectStore("todos");

      const idQuery = store.get(params.id);

      idQuery.onsuccess = function () {
        setTodo(idQuery.result);

        // TODO: make a toast for this notification
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };
  }, [params.id]);

  return (
    <div className="flex-1 flex justify-center items-center bg-slate-100">
      <div className="flex flex-col text-center">
        <div className="flex items-center justify-center gap-2 mb-10">
          <h1 className="text-3xl font-semibold underline text-slate-900">
            {todo?.title}
          </h1>
          {/* TODO: pass isCompleted as prop to the completed component */}
          <Completed isCompleted={todo?.label === "completed"} todo={todo!} />
        </div>
        <p className="max-w-2xl text-slate-500">{todo?.description}</p>
        <div className="flex items-center justify-between mt-10">
          <div>
            <p className="text-red-500 font-semibold">Due: {todo?.due}</p>
          </div>
          <div>
            {/* bg-gray-900 text-gray-200 */}
            <Link
              href={`/todos/update/${todo?.id}`}
              className={buttonVariants({
                variant: "outline",
              })}
            >
              Delete/Update
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TodoDetailPage;
