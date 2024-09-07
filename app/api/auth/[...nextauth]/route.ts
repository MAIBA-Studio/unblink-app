import {
  COOKIE_CALLBACK_URL_NAME,
  COOKIE_CSRF_NAME,
  COOKIE_SESSION_TOKEN_NAME,
} from "@/auth/constants";
import { SignInMessage } from "@/auth/sign-in-message";
import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

// Better to use NEXT_PUBLIC_NODE_ENV
const isLocalEnv = process.env.NEXTAUTH_URL?.includes("localhost");

const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Solana",
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
        isLedger: { label: "Ledger Mode", type: "boolean" },
      },
      async authorize(credentials) {
        try {
          if (!process.env.NEXTAUTH_URL)
            throw new Error("NEXTAUTH_URL not set");

          const signinMessage = new SignInMessage(
            JSON.parse(credentials?.message || "{}")
          );
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL);

          // Bypass domain check for development environments like vercel
          if (!isLocalEnv) {
            if (signinMessage.domain !== nextAuthUrl.host)
              throw new Error("Invalid domain");
          }

          const verifiedNonce = cookies()
            .get(COOKIE_CSRF_NAME)
            ?.value.split("|")[0];
          if (signinMessage.nonce !== verifiedNonce)
            throw new Error("Invalid nonce");

          if (!credentials?.isLedger) {
            const validationResult = await signinMessage.validate(
              credentials?.signature || ""
            );
            if (!validationResult) throw new Error("Invalid signature");
          }

          return { id: signinMessage.publicKey };
        } catch (e) {
          console.log("Authorization error:", e);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" as SessionStrategy, maxAge: 3600 },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      // @ts-ignore
      session.publicKey = token.sub;
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: COOKIE_SESSION_TOKEN_NAME,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: !isLocalEnv,
      },
    },
    csrfToken: {
      name: COOKIE_CSRF_NAME,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: !isLocalEnv,
      },
    },
    callbackUrl: {
      name: COOKIE_CALLBACK_URL_NAME,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: !isLocalEnv,
      },
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
