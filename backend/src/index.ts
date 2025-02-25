import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { userRouter } from "./routes/userRouter";
import { verify } from "hono/jwt";
import { blogRouter } from "./routes/blogRouter";
import { cors } from "hono/cors";

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
app.use("/*", cors());

app.use("*", (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });

  c.set("prisma", prisma);
  return next();
});

app.use("/api/v1/blog/*", async (c, next) => {
  if (c.req.path === "/api/v1/blog/bulk") {
    return next(); // Skip auth for /bulk route
  }
  const jwt = c.req.header("Authorization");
  // console.log(jwt);

  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }

  // const token = jwt.split(" ")[1];
  const payload = await verify(jwt, c.env.JWT_SECRET);

  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }

  c.set("userId", payload.id);

  await next();
});
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
