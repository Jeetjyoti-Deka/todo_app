"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, formatDate } from "@/lib/utils";
import { format } from "date-fns";

const formSchema = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  description: z.string().min(50, {
    message: "Description must be at least 50 characters.",
  }),
  priority: z.number(),
  due: z.date({
    required_error: "A date of birth is required.",
  }),
  label: z.string(),
});

const AddTodoForm = () => {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: 1,
      due: undefined,
      label: "not started",
    },
  });

  // 2. Define a submit handler.
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

      store.put({
        ...values,
        title: values.title.toLowerCase(),
        description: values.description.toLowerCase(),
        due: formatDate(values.due),
        id: crypto.randomUUID(),
      });

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
        <div className="flex items-start justify-center gap-4">
          <FormField
            control={form.control}
            name="due"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal border-none",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        if (
                          new Date(date).getFullYear() >
                          new Date().getFullYear() // if future year do not disable
                        ) {
                          return false;
                        }
                        if (
                          new Date(date).getMonth() === new Date().getMonth() &&
                          new Date(date).getDate() >= new Date().getDate() // if month is same and the date is equal or greater then do not disable
                        ) {
                          return false;
                        } else if (
                          new Date(date).getMonth() > new Date().getMonth() // if future month do not disable
                        ) {
                          return false;
                        } else {
                          return true;
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem className="flex-1 flex flex-col">
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(e) => {
                      field.onChange(e.toString());
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Label" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not started">Not Started</SelectItem>
                      <SelectItem value="started">Started</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default AddTodoForm;
