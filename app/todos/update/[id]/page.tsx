import UpdateTodoForm from "@/components/UpdateTodoForm";

const UpdateTodo = ({ params }: { params: { id: string } }) => {
  return (
    <div className="bg-slate-500 w-full lg:flex-1 px-4 md:px-0 min-h-screen">
      <h1 className="text-center my-6 text-2xl font-semibold">Update Todo</h1>
      <UpdateTodoForm id={params.id} />
    </div>
  );
};
export default UpdateTodo;
