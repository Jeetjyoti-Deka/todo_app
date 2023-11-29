import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TrashIcon from "./icons/TrashIcon";
import PriorityBar from "./PriorityBar";
import Link from "next/link";

type TodoProps = {
  title: string;
  description: string;
  due: Date;
  priority: number;
  id: number;
};

const Todo = ({ title, description, due, priority, id }: TodoProps) => {
  return (
    <Card className="bg-gray-800 max-w-lg border-none flex flex-col justify-between">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <Link
              href={`/todos/${id}`}
              className="line-clamp-1 cursor-pointer text-blue-600 hover:underline"
            >
              {title}
            </Link>
            <PriorityBar priority={priority} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-4 text-gray-400">{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-red-400">Due Date: {due.toString()}</p>
        <TrashIcon id={id} />
      </CardFooter>
    </Card>
  );
};
export default Todo;
