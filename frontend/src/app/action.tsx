"use server";

import { createNewTask } from "@/app/lib/data";
import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";

export const CreateNewTask = async () => {
  try {
    const boardId = cookies().get("boardId")?.value;
    if (!boardId) {
      throw new Error("no boardId");
    }
    await createNewTask(boardId);

    revalidatePath("/dashboard/invoices");
  } catch (error) {
    console.log(error);
  }
};
