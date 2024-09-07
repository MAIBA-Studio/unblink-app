import { COOKIE_CSRF_NAME } from "@/auth/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const csrf = cookies().get(COOKIE_CSRF_NAME)?.value.split("|")[0];
  return NextResponse.json({ csrfToken: csrf });
}
