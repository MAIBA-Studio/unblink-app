//TODO: refactor these when environment variables are fixed for v2,
//currently all NEXT_PUBLIC_NODE_ENV are set as development

// export const COOKIE_CSRF_NAME =
// process.env.NEXT_PUBLIC_NODE_ENV === "development"
//   ? "next-auth.csrf-token"
//   : "__Host-next-auth.csrf-token";

export const COOKIE_CSRF_NAME = process.env.NEXTAUTH_URL?.includes("localhost")
  ? "next-auth.csrf-token"
  : "__Host-next-auth.csrf-token";

export const COOKIE_SESSION_TOKEN_NAME = process.env.NEXTAUTH_URL?.includes(
  "localhost"
)
  ? "next-auth.session-token"
  : "__Secure-next-auth.session-token";

export const COOKIE_CALLBACK_URL_NAME = process.env.NEXTAUTH_URL?.includes(
  "localhost"
)
  ? "next-auth.callback-url"
  : "__Secure-next-auth.callback-url";