import AddTodoForm from "@/components/AddTodoForm";
import LeftSidebarButton from "@/components/LeftSidebarButton";

const AddTodo = () => {
  return (
    <div className="bg-slate-500 w-full lg:flex-1 px-4 md:px-0 min-h-screen">
      <div className="absolute top-4 left-4">
        <LeftSidebarButton />
      </div>

      <h1 className="text-center my-6 text-2xl font-semibold flex-1">
        Add Todo
      </h1>

      <AddTodoForm />
    </div>
  );
};
export default AddTodo;
