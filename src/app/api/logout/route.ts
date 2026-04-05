 import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(new URL("/", "http://localhost:3000"));
  response.cookies.set("dripswap_user_email", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    expires: new Date(0),
  });
  return response;
}