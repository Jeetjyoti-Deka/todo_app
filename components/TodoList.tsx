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

      store.put({
        id: 1,
        title: "finish the freelancing project",
        description:
          "id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare",
        priority: 4,
        due: 1701225616758,
      });

      store.put({
        id: 2,
        title: "Go to grocery shopping",
        description:
          "id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare",
        priority: 3,
        due: 1701225616758,
      });

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
