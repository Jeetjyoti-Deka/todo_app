import AddTodoForm from "@/components/AddTodoForm";

const AddTodo = () => {
  return (
    <div className="bg-slate-500 w-full lg:flex-1 px-4 md:px-0 min-h-screen">
      <h1 className="text-center my-6 text-2xl font-semibold">Add Todo</h1>
      <AddTodoForm />
    </div>
  );
};
export default AddTodo;
