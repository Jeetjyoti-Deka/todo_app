import Search from "@/components/Search";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="flex-1 flex justify-center bg-slate-100">
      <div className="w-full">
        <Search />
        <TodoList />
      </div>
    </div>
  );
}
