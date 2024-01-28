export async function getBoardTasks(boardId: string) {
  const res = await fetch(`http://backend:3030/boards/${boardId}/tasks`);
  if (!res.ok) {
    throw new Error("Failed to fetch board tasks");
  }
  return res.json();
}

// Async function to create a board
export async function createBoard() {
  const res = await fetch("http://backend:3030/boards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "updateeee",
      description: "teste vai",
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create board");
  }
  return res.json();
}

export async function createNewTask(boardId: string) {
  const res = await fetch("http://backend:3030/tasks", {
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
