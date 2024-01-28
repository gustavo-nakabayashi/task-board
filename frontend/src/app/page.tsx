import Image from "next/image";

import { getBoardTasks } from "@/app/lib/data";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { headers } from "next/headers";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  async function getTasks() {
    const cookieStore = cookies();
    let boardId = cookieStore.get("boardId")?.value || "";
    let cookie;

    if (boardId.length === 0) {
      cookie = headers().get("cookies");
      if (!cookie) {
        throw new Error("no cookie");
      }
      const cookie2 = cookie
        .split(";")
        .find((cookie: string) => cookie.trim().startsWith("boardId="));
      boardId = cookie2?.split("=")[1] || "";
    }

    try {
      const tasks = await getBoardTasks(boardId);
      return tasks;
    } catch (error) {
      return [];
    }
  }

  let tasks: any;
  try {
    tasks = await getTasks();
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
    return (
      <div key={task.ID} className="text-black">
        <div>{task.Name}</div>
        <div>{task.ID}</div>
      </div>
    );
  });

  return <>{tasksDivs}</>;
}
