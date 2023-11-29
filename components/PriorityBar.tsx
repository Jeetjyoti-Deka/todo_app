import PriorityIcon from "./PriorityIcon";

const PriorityBar = ({ priority }: { priority: number }) => {
  return (
    <div className="flex items-center">
      {priority > 4
        ? Array(5)
            .fill(1)
            .map((item, index) => <PriorityIcon key={index} />)
        : priority > 3
        ? Array(4)
            .fill(1)
            .map((item, index) => <PriorityIcon key={index} />)
        : priority > 2
        ? Array(3)
            .fill(1)
            .map((item, index) => <PriorityIcon key={index} />)
        : priority > 1
        ? Array(2)
            .fill(1)
            .map((item, index) => <PriorityIcon key={index} />)
        : Array(1)
            .fill(1)
            .map((item, index) => <PriorityIcon key={index} />)}
    </div>
  );
};
export default PriorityBar;
