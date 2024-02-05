"use server";

import { redirect } from 'next/navigation'


import {
  createNewTask,
  updateBoard,
  updateTask,
  deleteTask,
} from "@/app/lib/data";
import { revalidatePath, revalidateTag } from "next/cache";

export const CreateNewTask = async (boardId: string) => {
  try {
    await createNewTask(boardId);
    revalidateTag("tasks");
  } catch (error) {
    console.log(error);
  }
};

export const DeleteTask = async (formData: FormData) => {
  const task = {
    TaskId: formData.get("ID") as string,
  };
  try {
    await deleteTask(task);
    revalidateTag("tasks");
  } catch (error) {
    console.log(error);
  }

  const boardId = formData.get("BoardID")
  redirect("/" + boardId);
};

export const UpdateTask = async (formData: FormData) => {
  const task = {
    TaskId: formData.get("ID") as string,
    Name: formData.get("Name") as string,
    Icon: parseInt(formData.get("Icon") as string),
    Status: formData.get("Status") as string,
    Description: formData.get("Description") as string,
  };
  try {
    await updateTask(task);
    revalidateTag("tasks");
  } catch (error) {
    console.log(error);
  }

  const boardId = formData.get("BoardID")
  redirect("/" + boardId);
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
