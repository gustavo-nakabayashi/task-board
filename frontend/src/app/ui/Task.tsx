import TaskStatus from "./TaskStatus";
import Link from "next/link";

type TaskProps = {
  ID: number;
  Name: string;
  Icon: number;
  BoardID: number;
  Status: string;
  Description: string;
};

const backgroundColors = {
  progress: "bg-[#F5D565]",
  wont_do: "bg-[#F7D4D3]",
  completed: "bg-[#A0ECB1]",
  "": "bg-[#E3E8EF]",
};

const getBackgroundColor = (status: string) => {
  return backgroundColors[status as keyof typeof backgroundColors];
};

const Task = ({ task }: { task: TaskProps }) => {
  const iconChar = String.fromCodePoint(task.Icon);

  return (
    <Link
      href={`/${task.BoardID}?task=${task.ID}`}
      className={`flex justify-between ${getBackgroundColor(task.Status)} rounded-2xl p-4`}
    >
      <div
        key={task.ID}
        className="flex items-center gap-6 rounded-2xl text-black"
      >
        <div className="flex h-12 shrink-0 w-12 items-center justify-center rounded-xl bg-white text-xl">
          {iconChar}
        </div>
        <div>
          <div className="text-xl font-semibold">{task.Name}</div>
          <div className="text-base font-[300]">{task.Description}</div>
        </div>
      </div>
      <TaskStatus status={task.Status} />
    </Link>
  );
};

export default Task;
