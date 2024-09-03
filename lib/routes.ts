export const PATH = {
  landing: "/",
  profile: "/profile",

  // Events
  breakpoint: "/events/breakpoint",
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
