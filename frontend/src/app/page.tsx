import Image from "next/image";

import { cookies } from 'next/headers';

export default function Home() {
  async function getBoardTasks(boardId: string) {
    'use server';
    const res = await fetch(`http://backend:3030/boards/${boardId}/tasks`);
    if (!res.ok) {
      throw new Error('Failed to fetch board tasks');
    }
    return res.json();
  }

  // Async function to create a board
  async function createBoard() {
    'use server';
    const res = await fetch('http://backend:3030/boards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": "updateeee",
        "description": "teste vai",
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to create board');
    }
    return res.json();
  }

  // Loader function for server-side logic
  async function init() {
    'use server'
    const cookieStore = cookies();
    let boardIdCookie = cookieStore.get('boardId');
    let boardId = boardIdCookie?.value;

    if (!boardIdCookie) {
      const board = await createBoard();
      cookieStore.set('boardId', board.ID);
      boardId = board.ID;
    }


    const tasks = await getBoardTasks(boardId || "");
    console.log(tasks);

    return { props: { tasks } };
  }

  // Component for rendering
    // @TODO make this run automatically
    return     (
    <>
      <form action={init}>
        <input type="text" name="name" />
        <button type="submit">Submit</button>
      </form>
      
    </>

    )
}

