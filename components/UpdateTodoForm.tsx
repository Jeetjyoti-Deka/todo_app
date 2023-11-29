"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TodoType } from "@/lib/types";

const formSchema = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  description: z.string().min(50, {
    message: "Description must be at least 50 characters.",
  }),
  priority: z.number(),
});

const UpdateTodoForm = ({ id }: { id: string }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: 1,
    },
  });

  function handleDelete() {
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

      const deleteTodoById = store.delete(id);

      deleteTodoById.onsuccess = function () {
        console.log("Todo Removed");
      };

      transaction.oncomplete = function () {
        db.close();
      };
    };

    router.push("/");
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
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

      store.put({ ...values, due: 1701225616758, id: id });

      transaction.oncomplete = function () {
        db.close();
        router.push("/");
      };
    };
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-1/2 mx-auto"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a descriptive title..."
                  {...field}
                  className="bg-gray-800 border-none outline-none focus:bg-slate-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description*</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide a detailed description..."
                  {...field}
                  className="bg-gray-800 border-none outline-none focus:bg-slate-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(e) => {
                    field.onChange(Number(e));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex items-center justify-between">
          <Button type="submit">Update</Button>
          <Button
            variant="destructive"
            type="button"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default UpdateTodoForm;
