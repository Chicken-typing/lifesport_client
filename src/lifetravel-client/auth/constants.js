export const sessionOptions = {
  cookieName: process.env.AUTH_COOKIE_NAME,
  password: process.env.AUTH_SECRET_KEY,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
