import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

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
        <label htmlFor="Description" className="text-xs mb-1 text-[#97A3B6]">
          Description
        </label>

        <input
          className="border border-black px-4 py-1 rounded-md"
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
        <label className="text-xs mb-1 text-[#97A3B6]" htmlFor="Name">
          Task name
        </label>
        <input
          className="border border-black px-4 py-1 rounded-md"
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
        <label
          class="flex h-10 w-10 text-xl rounded-lg justify-center items-center bg-[#E3E8EF] has-[:checked]:bg-[#F5D565] cursor-pointer"
        >
          {String.fromCodePoint(icon)}
          <input name="icon" type="radio" class="hidden" />
        </label>
      );
    });

    return (
      <div className="flex flex-col">
        <label htmlFor="Icon" className="text-xs mb-1 text-[#97A3B6]">
          Icon
        </label>
        <div className="flex gap-2">{iconsDivs}</div>
      </div>
    );
  };

  const StatusInput = () => {
    return (
      <div className="flex flex-col">
        <label className="text-xs mb-1 text-[#97A3B6]" htmlFor="Status">
          Status
        </label>
        <input type="text" name="Status" defaultValue={task.Status} />
      </div>
    );
  };

  if (task === undefined || task === null) {
    console.log("task is undefined");
    return null;
  }

  return (
    <dialog
      className="p-4 bg-black bg-opacity-70 absolute h-screen w-screen top-0 right-0 "
      open
    >
      <div className="p-4 rounded-xl bg-white shadow max-w-[500px]">
        <div className="flex text-xl justify-between mb-6">
          Task details
          <Link
            href={"/"}
            className="border border-gray-200 rounded-md cursor-pointer h-8 w-8 flex justify-center items-center"
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
