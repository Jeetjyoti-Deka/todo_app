"use client";

import Todo from "@/components/Todo";
import { useEffect, useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    const indexedDB = window.indexedDB;

    if (!indexedDB) {
      console.log("IndexedDB could not be found in this browser.");
      return;
    }

    const request = indexedDB.open("TodoDatabase", 1);

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
    };

    request.onsuccess = function () {
      console.log("Database opened successfully");

      const db = request.result;

      const transaction = db.transaction("todos", "readwrite");

      const store = transaction.objectStore("todos");
      const titleIndex = store.index("title");
      const priority = store.index("priority");
      const description = store.index("description");

      const idQuery = store.getAll();

      idQuery.onsuccess = function () {
        setTodos(idQuery.result);
        console.log("idQuery", idQuery.result);
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };
  }, []);
  return (
    <div>
      {todos.length > 0 ? (
        <div>
          {todos.map((todo) => (
            <Todo key={todo.id} {...todo} />
          ))}
        </div>
      ) : (
        <div>
          <h2>Nothing to be done. Add more todos...</h2>
        </div>
      )}
    </div>
  );
}