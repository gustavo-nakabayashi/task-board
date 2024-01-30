"use server";

import { createNewTask, updateBoard } from "@/app/lib/data";
import { revalidatePath, revalidateTag } from "next/cache";

export const CreateNewTask = async (boardId: string) => {
  try {
    await createNewTask(boardId);
    revalidateTag("tasks");
  } catch (error) {
    console.log(error);
  }
};

export const UpdateBoard = async (board: {
  Name: string;
  Description: string;
  boardId: string;
}) => {
  try {
    await updateBoard(board);

    // @TODO this revalidate is not working
    revalidateTag("board");
  } catch (error) {
    console.log(error);
  }
};
