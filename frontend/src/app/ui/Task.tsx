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

const iconBackgroundColors = {
  progress: "bg-[#E9A23B]",
  wont_do: "bg-[#DD524C]",
  completed: "bg-[#32D657]",
};

const Task = ({ task }: { task: TaskType }) => {
  const getBackgroundColor = (status: string) => {
    return backgroundColors[status as keyof typeof backgroundColors];
  };

  // Function to safely get the icon background color based on task status
  const getIconBackgroundColor = (status: string) => {
    return iconBackgroundColors[status as keyof typeof iconBackgroundColors];
  };
  return (
    <div
      className={`flex justify-between ${getBackgroundColor(task.Status)} p-4 rounded-2xl`}
    >
      <div
        key={task.ID}
        className="flex items-center text-black gap-6 rounded-2xl"
      >
        <div className="bg-white h-10 w-10 flex justify-center items-center rounded-xl">{`${String.fromCharCode(task.Icon)}`}</div>
        <div>
          <div>{task.Name}</div>
          <div>{task.Description}</div>
        </div>
      </div>
      <span
        className={`h-10 ${getIconBackgroundColor(task.Status)} w-10 flex justify-center items-center rounded-xl`}
      ></span>
    </div>
  );
};

export default Task;
