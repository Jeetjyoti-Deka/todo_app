import UpdateTodoForm from "@/components/UpdateTodoForm";

const UpdateTodo = ({ params }: { params: { id: string } }) => {
  return (
    <div className="bg-slate-500 flex-1">
      <UpdateTodoForm id={params.id} />
    </div>
  );
};
export default UpdateTodo;
