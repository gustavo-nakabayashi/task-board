import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createBoard } from "./app/lib/data";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  // check if cookie boardId exists return if it does
  const cookie = requestHeaders.get("cookie") || "";

  if (cookie.length !== 0 && cookie.includes("boardId")) {
    return NextResponse.next();
  }

  const board = await createBoard();

  const appendedCookie =
    cookie === "" ? `boardId=${board.ID}` : cookie + `; boardId=${board.ID}`;
  requestHeaders.set("cookies", appendedCookie);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.cookies.set({
    name: "boardId",
    value: board.ID,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  });

  return response;
}

export const config = {
  matcher: "/",
};
