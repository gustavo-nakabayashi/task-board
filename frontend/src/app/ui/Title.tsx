"use client";

import { useState } from "react";

import Image from "next/image";
import { UpdateBoard } from "@/app/action";

const BoardTitle = ({
  board,
}: {
  board: {
    Name: string;
    Description: string;
    boardId: string;
  };
}) => {
  const [title, setTitle] = useState(board.Name);
  const [editTitle, setEditTitle] = useState(false);

  if (editTitle) {
    return (
      <form className="flex gap-3">
        <input
          className="text-4xl"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={async () => {
            await UpdateBoard({ ...board, Name: title });
            setEditTitle(false);
          }}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setEditTitle(false);
          }}
        >
          <Image
            src="/Done_round.svg"
            className="text-red-500"
            alt="check icon"
            width={24}
            height={24}
          />
        </button>
      </form>
    );
  }

  return (
    <div className="flex gap-3">
      <h1 className="text-4xl">{title}</h1>
      <button onClick={() => setEditTitle(true)} type="button">
        <Image src="/edit.svg" alt="edit icon" width={24} height={24} />
      </button>
    </div>
  );
};

export default BoardTitle;
