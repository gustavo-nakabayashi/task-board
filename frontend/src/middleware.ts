import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createBoard } from "./app/lib/data";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const board = await createBoard();

  return NextResponse.redirect(new URL(`/${board.ID}`, request.url))
}

export const config = {
  matcher: "/",
};
