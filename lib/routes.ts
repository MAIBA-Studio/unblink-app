export const PATH = {
  landing: "/",
  profile: "/profile",
  signIn: "/sign-in",

  // Events
  breakpoint: "/events/breakpoint",
  breakpointScan: "/events/breakpoint/scan",

  // External
  external: {
    shareOnX:
      "https://x.com/intent/tweet?text=Don%27t%20Blink!%20%F0%9F%91%80%0A%0A%40UnBlinkApp%0A%23MintTheMoment%0A%0A%40solana%0A%40SolanaConf%0A%23Breakpoint2024%20%0A%23BreakpointBingo",
    maibaStudio: "https://maiba.studio/",
  },
};

export const replacePathKeys = (
  path: string,
  params: { [key: string]: string }
) => {
  let replacedPath = path;
  Object.keys(params).forEach((key) => {
    replacedPath = replacedPath.replace(`[${key}]`, params[key]);
  });
  return replacedPath;
};
