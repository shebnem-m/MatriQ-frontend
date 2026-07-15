// proxy.js
import { NextResponse } from "next/server";
import { getMe } from "./app/(auth)/api";

export async function proxy(request) {
  // Forward the incoming cookies to the backend so it can read the JWT.
  const response = getMe();

  // If the backend does not recognise the user, redirect to /auth.
  if (!response.ok) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Valid user, let the request continue.
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin"],
};
