import Image from "next/image";

import { getBoardTasks, getBoard } from "@/app/lib/data";
import Title from "@/app/ui/Title";
import Task from "@/app/ui/Task";
// import Dialog from "@/app/ui/Dialog";

import { CreateNewTask } from "@/app/action";

const AddTask = ({ boardId }: { boardId: string }) => {
  const create = CreateNewTask.bind(null, boardId);

  return (
    <form
      className="mt-4 flex justify-between bg-[#F5E8D5] rounded-2xl"
      action={create}
    >
      <button className="w-full p-4" type="submit">
        <div className="flex items-center text-black gap-6 rounded-2xl">
          <div className="bg-[#E9A23B] h-12 w-12 flex justify-center items-center rounded-xl">
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

export default async function Page({ params }: { params: { id: string } }) {
  let boardId = params.id;
  let tasks: any;
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

  if (!tasks) {
    return (
      <>
        <div>loading</div>
      </>
    );
  }

  const tasksDivs = tasks.map((task: any) => {
    return <Task task={task} key={task.ID} />;
  });

  return (
    <main className="m-auto max-w-[640px] p-12">
      <div className="flex gap-4 items-start mb-8">
        <Image src="/Logo.svg" alt="board icon" width={48} height={48} />
        <div className="space-y-4">
          <Title board={board}></Title>
          <p className="font-light">{board.Description}</p>
        </div>
      </div>

      <div className="space-y-4">{tasksDivs}</div>
      <AddTask boardId={boardId} />
    </main>
  );
}