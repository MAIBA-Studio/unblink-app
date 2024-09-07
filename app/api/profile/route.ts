import { IProfile } from "@/schema/profile.schema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const walletAddress = searchParams.get("walletAddress") ?? "";

  if (walletAddress === "")
    return NextResponse.json({
      error: "No wallet address provided.",
    });

  if (!secret)
    return NextResponse.json({
      error:
        "Backend has not been properly setup. Please contact the administrator.",
    });

  const isTokenValid = await getToken({ req: request, secret });

  if (isTokenValid) {
    // TODO: get profile by wallet address
    return NextResponse.json({ data: null, status: 200 });
  }

  return NextResponse.json({ error: "Unauthorized", status: 401 });
}

export async function POST(req: NextRequest) {
  if (!secret)
    return NextResponse.json({
      error:
        "Backend has not been properly setup. Please contact the administrator.",
    });

  const isTokenValid = await getToken({ req, secret });

  if (isTokenValid) {
    const reqBody = await req.json();

    // TODO: add a profile and respond with it
    const data: IProfile = {
      username: "John Doe",
      walletAddress: reqBody.walletAddress,
      points: 0,
    };
    return NextResponse.json({ data, status: 200 });
  }

  return NextResponse.json({ error: "Unauthorized", status: 401 });
}
