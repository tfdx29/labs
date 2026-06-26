import { createAuth } from "@labs/auth";
import { createDb } from "@labs/db";
import type { Context as HonoContext } from "hono";

export type CreateContextOptions = {
  context: HonoContext;
};

export async function createContext({ context }: CreateContextOptions) {
  const session = await createAuth().api.getSession({
    headers: context.req.raw.headers,
  });
  const db = createDb();
  return {
    auth: null,
    session,
    db,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
