import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import HomeIcon from "./icons/HomeIcon";
import Link from "next/link";
import AddIcon from "./icons/AddIcon";

const LeftSidebarButton = () => {
  return (
    <div className="p-2 rounded-sm bg-gray-300 flex items-center justify-center lg:hidden">
      <Sheet>
        <SheetTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-slate-800 flex items-center justify-center"
        >
          <div className=" bg-gray-800 max-w-[280px] flex-1 flex-col items-center min-h-screen text-white flex">
            <h2 className="text-3xl mt-4">TaskFlow</h2>
            <div className="flex flex-col items-center gap-4 mt-10 w-full max-w-[80%]">
              <SheetTrigger asChild>
                <Link
                  href="/todos/add"
                  className="bg-gray-900 w-full flex justify-start items-center py-3 px-4 rounded-md hover:bg-green-500 hover:text-gray-900 font-semibold text-lg cursor-pointer transition-all"
                >
                  <AddIcon />
                  <p className="flex-1 flex items-center justify-center">
                    Add Todo
                  </p>
                </Link>
              </SheetTrigger>
              <SheetTrigger asChild>
                <Link
                  href="/"
                  className="bg-gray-900 w-full flex justify-start items-center py-3 px-4 rounded-md hover:bg-stone-500 hover:text-gray-900 font-semibold text-lg cursor-pointer transition-all"
                >
                  <HomeIcon />
                  <p className="flex-1 flex items-center justify-center">
                    Home
                  </p>
                </Link>
              </SheetTrigger>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default LeftSidebarButton;
