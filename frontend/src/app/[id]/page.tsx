import Image from "next/image";

import Task from "@/app/ui/Task";
import TaskDialog from "@/app/ui/TaskDialog";
import Title from "@/app/ui/Title";

import { CreateNewTask } from "@/app/action";
import { getBoardTasks, getBoard } from "@/app/lib/data";

const AddTask = ({ boardId }: { boardId: string }) => {
  const create = CreateNewTask.bind(null, boardId);

  return (
    <form
      className="mt-4 flex justify-between rounded-2xl bg-[#F5E8D5]"
      action={create}
    >
      <button className="w-full p-4" type="submit">
        <div className="flex items-center gap-6 rounded-2xl text-black">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9A23B]">
            <Image
              src={"/add_task.svg"}
              alt="plus icon"
              width={24}
              height={24}
            ></Image>
          </div>
          <div>
            <div className="text-xl font-semibold">Add new task</div>
          </div>
        </div>
      </button>
    </form>
  );
};

type TaskType = {
  ID: string;
  Name: string;
  Icon: number;
  BoardID: string;
  Status: string;
  Description: string;
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { task: string };
}) {
  let boardId = params.id;
  let tasks: TaskType[];
  let board: any;
  try {
    tasks = await getBoardTasks(boardId);
    board = await getBoard(boardId);
  } catch (e) {
    console.log(e);
    return (
      <>
        <div>error</div>
      </>
    );
  }

  const RenderTaskDialog = () => {
    const taskId = searchParams.task;
    if (tasks === null) {
      return null;
    }
    const queryTask = tasks.find((task) => task.ID === taskId);

    if (queryTask === undefined) {
      return null;
    }

    return <TaskDialog task={queryTask as TaskType} />;
  };

  return (
    <main className="m-auto max-w-[640px] p-4">
      <div className="mb-8 flex items-start gap-4">
        <Image src="/Logo.svg" alt="board icon" width={48} height={48} />
        <div className="space-y-4">
          <Title board={board}></Title>
          <p className="font-light">{board.Description}</p>
        </div>
      </div>

      <div className="space-y-4">
        {tasks
          ? tasks.map((task: any) => <Task task={task} key={task.ID} />)
          : null}
      </div>
      <AddTask boardId={boardId} />
      <RenderTaskDialog />
    </main>
  );
}
