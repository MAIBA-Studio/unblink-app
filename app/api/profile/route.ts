import { createClient } from "@/lib/supabase/server";
import { IPOSTRequestProfile } from "@/schema/profile.schema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(request: NextRequest) {
  if (!secret)
    return NextResponse.json({
      error:
        "Backend has not been properly setup. Please contact the administrator.",
    });

  const isTokenValid = await getToken({ req: request, secret });

  if (isTokenValid) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({
        error: "User is not authenticated",
        status: 500,
      });
    }

    // TODO: Add points logic and include it in the response
    const userMetadata = {
      walletAddress: user.user_metadata.wallet_address,
      points: 0,
    };
    return NextResponse.json({ user: userMetadata, status: 200 });
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
    const walletAddress = reqBody.walletAddress;
    const supabase = createClient();

    const { error } = await supabase.auth.signInAnonymously({
      options: {
        data: {
          wallet_address: walletAddress,
        },
      },
    });

    if (error) {
      console.error(error.code + " " + error.message);
      return NextResponse.json({
        error: "Unable to sign in wallet address",
        status: 500,
      });
    }

    const data: IPOSTRequestProfile = {
      walletAddress: walletAddress,
    };
    return NextResponse.json({ data, status: 200 });
  }

  return NextResponse.json({ error: "Unauthorized", status: 401 });
}
