import Link from "next/link";
import AddIcon from "./icons/AddIcon";
import HomeIcon from "./icons/HomeIcon";

const LeftSidebar = () => {
  return (
    <div className=" bg-gray-800 max-w-[280px] flex-1 flex flex-col items-center min-h-screen text-white">
      <h2 className="text-3xl mt-4">TaskFlow</h2>
      <div className="flex flex-col items-center gap-4 mt-10 w-full max-w-[80%]">
        <Link
          href="/todos/add"
          className="bg-gray-900 w-full flex justify-start items-center py-3 px-4 rounded-md hover:bg-green-500 hover:text-gray-900 font-semibold text-lg cursor-pointer transition-all"
        >
          <AddIcon />
          <p className="flex-1 flex items-center justify-center">Add Todo</p>
        </Link>
        <Link
          href="/"
          className="bg-gray-900 w-full flex justify-start items-center py-3 px-4 rounded-md hover:bg-stone-500 hover:text-gray-900 font-semibold text-lg cursor-pointer transition-all"
        >
          <HomeIcon />
          <p className="flex-1 flex items-center justify-center">Home</p>
        </Link>
      </div>
    </div>
  );
};
export default LeftSidebar;
