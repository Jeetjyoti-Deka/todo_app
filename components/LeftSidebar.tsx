import Link from "next/link";
import AddIcon from "./icons/AddIcon";

const LeftSidebar = () => {
  return (
    <div className=" bg-gray-800 max-w-[280px] flex-1 flex flex-col items-center min-h-screen text-white">
      <h2 className="text-3xl mt-4">Menu</h2>
      <div className="flex flex-col items-center mt-10 w-full max-w-[80%]">
        <Link
          href="/todos/add"
          className="bg-gray-900 w-full flex justify-center items-center py-3 rounded-md hover:bg-green-500 hover:text-gray-900 font-semibold text-lg cursor-pointer transition-all gap-2"
        >
          <AddIcon />
          Add Todo
        </Link>
      </div>
    </div>
  );
};
export default LeftSidebar;
