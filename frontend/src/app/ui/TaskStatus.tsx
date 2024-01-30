import Image from "next/image";

const iconBackgroundColors = {
  progress: "bg-[#E9A23B]",
  wont_do: "bg-[#DD524C]",
  completed: "bg-[#32D657]",
};

const TaskStatus = ({ status }: { status: string }) => {
  const getIconBackgroundColor = (status: string) => {
    return iconBackgroundColors[status as keyof typeof iconBackgroundColors];
  };

  const GetIcon = ({ status }: { status: string }) => {
    if (!["progress", "wont_do", "completed"].includes(status)) return;

    return (
      <Image
        src={"\\" + status + ".svg"}
        alt="done icon"
        width={18}
        height={24}
      ></Image>
    );
  };

  return (
    <span
      className={`h-10 ${getIconBackgroundColor(status)} w-10 flex justify-center items-center rounded-xl`}
    >
      <GetIcon status={status} />
    </span>
  );
};

export default TaskStatus;
