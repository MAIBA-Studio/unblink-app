import { SignInMessage } from "@/auth/sign-in-message";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
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
          if (signinMessage.domain !== nextAuthUrl.host)
            throw new Error("Invalid domain");

          const verifiedNonce = await getCsrfToken({
            req: { headers: req.headers },
          });
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
          console.log(e);
          return null;
        }
      },
    }),
  ];

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth?.includes("signin");

  // Hides Sign-In with Solana from default sign page
  if (isDefaultSigninPage) providers.pop();

  return await NextAuth(req, res, {
    providers,
    session: { strategy: "jwt", maxAge: 3600 },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }) {
        // @ts-ignore
        session.publicKey = token.sub;
        return session;
      },
    },
  });
}
