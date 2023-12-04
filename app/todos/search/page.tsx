"use client";

import SearchForm from "@/components/SearchForm";
import Todo from "@/components/Todo";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    const indexedDB = window.indexedDB;

    if (!indexedDB) {
      console.log("IndexedDB could not be found in this browser.");
      return;
    }

    const request = indexedDB.open("TodoDatabase", 3);

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
      const titleIndex = store.index("title");
      const priority = store.index("priority");
      const description = store.index("description");
      const label = store.index("label");

      const titleQueryV1 = titleIndex.getAll([`${query?.toLowerCase()}`]);

      titleQueryV1.onsuccess = function () {
        if (titleQueryV1.result.length > 0) {
          setTodos(titleQueryV1.result);
        } else {
          const titleQueryV2 = titleIndex.getAll();
          titleQueryV2.onsuccess = function () {
            if (titleQueryV2.result.length > 0) {
              const newTodos = titleQueryV2.result.filter((todo) => {
                if (todo.title.includes(`${query?.toLowerCase()}`)) {
                  return todo;
                }
              });

              setTodos(newTodos);
            } else {
              setTodos([]);
            }
          };
        }
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };
  }, [query]);

  return (
    <div className="flex-1 flex justify-center bg-slate-100">
      <div className="w-full">
        <SearchForm />
        {todos.length > 0 ? (
          <div className="grid grid-flow-row grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-3 2xl:gap-7 ml-4">
            {todos.map((todo) => (
              <Todo {...todo} key={todo.id} />
            ))}
          </div>
        ) : (
          <div className="w-full flex items-center justify-center text-red-500">
            No Results Found
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchPage;
