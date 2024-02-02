export async function getBoardTasks(boardId: string) {
  const res = await fetch(`http://backend:8000/api/boards/${boardId}/tasks`, {
    next: { tags: ["tasks"] },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch board tasks");
  }
  return res.json();
}

// Async function to create a board
export async function getBoard(boardId: string) {
  const res = await fetch(`http://backend:8000/api/boards/${boardId}`, {
    next: { tags: ["board"] },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch board");
  }
  return res.json();
}

// Async function to create a board
export async function updateBoard(board: {
  Name: string;
  Description: string;
  boardId: string;
}) {
  try {
    const res = await fetch(`http://backend:8000/api/boards/${board.boardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: board.Name,
        description: board.Description,
      }),
    });

    return res.json();
  } catch (error) {
    // print status code
    if (error instanceof Response) console.log(error.status);

    console.log(error);
    throw new Error("Failed to update Board");
  }
}

// Async function to create a board
export async function createBoard() {
  const res = await fetch("http://backend:8000/api/boards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Meu board",
      description: "teste vai",
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create board");
  }
  return res.json();
}

export async function createNewTask(boardId: string) {
  const res = await fetch("http://backend:8000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      board_id: boardId,
      name: "Task To Do",
      description: "Work on a Challenge on devChallenges.io, learn TypeScript.",
      status: "",
      icon: 128218,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create new Task");
  }

  return res.json();
}
