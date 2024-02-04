import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

import TaskStatus from "./TaskStatus";

const icons = [128187, 128172, 9749, 127947, 128218, 9200];

type TaskType = {
  ID: string;
  Name: string;
  Icon: number;
  BoardID: string;
  Status: string;
  Description: string;
};

const TaskDialog = ({ task }: { task: TaskType }) => {
  const DescriptionInput = () => {
    return (
      <div className="flex flex-col">
        <label htmlFor="Description" className="mb-1 text-xs text-[#97A3B6]">
          Description
        </label>

        <input
          className="rounded-md border border-black px-4 py-1"
          type="text"
          name="Description"
          defaultValue={task.Description}
          placeholder="Enter a short description"
        />
      </div>
    );
  };

  const NameInput = () => {
    return (
      <div className="flex flex-col">
        <label className="mb-1 text-xs text-[#97A3B6]" htmlFor="Name">
          Task name
        </label>
        <input
          className="rounded-md border border-black px-4 py-1"
          type="text"
          name="Name"
          defaultValue={task.Name}
        />
      </div>
    );
  };

  const IconInput = () => {
    const iconsDivs = icons.map((icon) => {
      return (
        <div>
          <input
            type="radio"
            name="icon"
            className="peer hidden"
            id={String(icon)}
            value={icon}
          />
          <label
            htmlFor={String(icon)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-[#E3E8EF] text-xl peer-checked:bg-[#F5D565]"
          >
            {String.fromCodePoint(icon)}
          </label>
        </div>
      );
    });

    return (
      <div className="flex flex-col">
        <label htmlFor="Icon" className="mb-1 text-xs text-[#97A3B6]">
          Icon
        </label>
        <div className="flex gap-2">{iconsDivs}</div>
      </div>
    );
  };

  const StatusInput = () => {
    const statuses = [
      { label: "progress", text: "In Progress" },
      { label: "wont_do", text: "Won't Do" },
      { label: "completed", text: "Completed" },
    ];
    return (
      <div className="flex flex-col">
        <label className="mb-1 text-xs text-[#97A3B6]" htmlFor="Status">
          Status
        </label>

        <div className="grid grid-cols-2 gap-4">
          {statuses.map((status) => {
            return (
              <label className="flex cursor-pointer items-center gap-4 rounded-xl p-0.5 outline outline-[#E3E8EF] has-[:checked]:outline-[#3662E3]">
                <TaskStatus status={status.label} />
                {status.text}
                <input
                  type="radio"
                  name="status"
                  value={status.label}
                  className="ml-auto mr-4 checked:border-indigo-500"
                />
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  if (task === undefined || task === null) {
    console.log("task is undefined");
    return null;
  }

  return (
    <dialog
      className="fixed left-0 top-0 h-screen w-screen bg-black bg-opacity-70 p-4"
      open
    >
      <div className="ml-auto w-full max-w-[600px] rounded-xl bg-white p-4 shadow">
        <div className="mb-6 flex justify-between text-xl">
          Task details
          <Link
            href={"/"}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-gray-200"
          >
            <Image
              src="/close_ring.svg"
              alt="close icon"
              className=""
              width={18}
              height={18}
            />
          </Link>
        </div>
        <form action="" className="flex flex-col gap-8">
          <NameInput />
          <DescriptionInput />
          <IconInput />
          <StatusInput />
        </form>
      </div>
    </dialog>
  );
};

export default TaskDialog;
