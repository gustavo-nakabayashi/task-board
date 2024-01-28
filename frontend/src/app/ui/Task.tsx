import TaskStatus from "./TaskStatus";

type TaskType = {
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

const Task = ({ task }: { task: TaskType }) => {
   const iconChar = String.fromCodePoint(task.Icon);

  return (
    <div
      className={`flex justify-between ${getBackgroundColor(task.Status)} p-4 rounded-2xl`}
    >
      <div
        key={task.ID}
        className="flex items-center text-black gap-6 rounded-2xl"
      >
        <div className="bg-white h-12 w-12 text-xl flex justify-center items-center rounded-xl">{iconChar}</div>
        <div>
          <div className="text-xl font-semibold">{task.Name}</div>
          <div className="text-base font-[300]">{task.Description}</div>
        </div>
      </div>
      <TaskStatus status={task.Status} />
    </div>
  );
};

export default Task;
