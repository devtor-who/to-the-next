import { NextRequest, NextResponse } from "next/server";

export const redirectToLogin = (req: NextRequest) => {
  return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
};
