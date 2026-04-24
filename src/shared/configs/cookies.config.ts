const isLocal = process.env.isLocal === "true";
const dom = isLocal ? "localhost" : "manejo.com";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !isLocal,
  sameSite: "lax" as const,
//   domain: dom,
  maxAge: 1000 * 60 * 60 * 24 * 40, // 40 days
  path: "/",
};

export const DEVICE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !isLocal,
  sameSite: "lax" as const,
//   domain: dom,
  maxAge: 1000 * 60 * 60 * 24 * 40, // 40 days
  path: "/",
};