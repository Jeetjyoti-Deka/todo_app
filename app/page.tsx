import SearchForm from "@/components/SearchForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="flex-1 min-h-screen flex justify-center bg-slate-100">
      <div className="w-full h-full px-4 lg:px-10">
        <SearchForm />
        <TodoList />
      </div>
    </div>
  );
}
