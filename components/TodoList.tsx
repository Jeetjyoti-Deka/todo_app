"use client";

import Todo from "@/components/Todo";
import { useEffect, useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState<any[]>([]);
  const [startedTodos, setStartedTodos] = useState<any[]>([]);
  const [notStartedTodos, setNotStartedTodos] = useState<any[]>([]);
  const [completedTodos, setCompletedTodos] = useState<any[]>([]);

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

    request.onupgradeneeded = function (event) {
      const db = request.result;

      const store = db.createObjectStore("todos", { keyPath: "id" });
      store.createIndex("title", ["title"], { unique: false });
      store.createIndex("priority", ["priority"], { unique: false });
      store.createIndex("description", ["description"], { unique: false });
      store.createIndex("label", ["label"], { unique: false });
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

      const notStartedTodos = label.getAll(["not started"]);
      const completedTodos = label.getAll(["completed"]);
      const startedTodos = label.getAll(["started"]);

      notStartedTodos.onsuccess = function () {
        setNotStartedTodos(notStartedTodos.result);
      };

      completedTodos.onsuccess = function () {
        setCompletedTodos(completedTodos.result);
      };

      startedTodos.onsuccess = function () {
        setStartedTodos(startedTodos.result);
      };

      const idQuery = store.getAll();

      idQuery.onsuccess = function () {
        setTodos(idQuery.result);
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };
  }, []);
  return (
    <div className="flex flex-col gap-10 my-10">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-xl font-semibold underline">Not Started</h1>
        {notStartedTodos.length > 0 ? (
          <div className="grid grid-flow-row grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-3 2xl:gap-7">
            {notStartedTodos.map((todo) => (
              <Todo key={todo.id} {...todo} />
            ))}
          </div>
        ) : (
          <div className="h-40 flex items-center justify-start">
            <h2>Nothing to be done. Add more todos...</h2>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-xl font-semibold underline">Started</h1>
        {startedTodos.length > 0 ? (
          <div className="grid grid-flow-row grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-3 2xl:gap-7">
            {startedTodos.map((todo) => (
              <Todo key={todo.id} {...todo} />
            ))}
          </div>
        ) : (
          <div className="h-40 flex items-center justify-start">
            <h2>Nothing to be done. Add more todos...</h2>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4  items-center">
        <h1 className="text-xl font-semibold underline">Completed</h1>
        {completedTodos.length > 0 ? (
          <div className="grid grid-flow-row grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-3 2xl:gap-7">
            {completedTodos.map((todo) => (
              <Todo key={todo.id} {...todo} />
            ))}
          </div>
        ) : (
          <div className="h-40 flex items-center justify-start">
            <h2>Nothing to be done. Add more todos...</h2>
          </div>
        )}
      </div>
    </div>
  );
}
