"use server";

import { createNewTask, updateBoard } from "@/app/lib/data";
import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";

export const CreateNewTask = async () => {
  try {
    const boardId = cookies().get("boardId")?.value;
    if (!boardId) {
      throw new Error("no boardId");
    }
    await createNewTask(boardId);

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};

export const UpdateBoard = async (board: { Name: string, Description: string }) => {
  try {
    const boardId = cookies().get("boardId")?.value;
    if (!boardId) {
      throw new Error("no boardId");
    }
    await updateBoard(boardId, board);

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};
