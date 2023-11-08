import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "./constants";

export function withSessionApiRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}
