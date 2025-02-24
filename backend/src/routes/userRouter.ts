import { PrismaClient } from "@prisma/client/edge";
import { sign, verify } from "hono/jwt";
import { Hono } from "hono";
import { signinInput, signupInput } from "@adarshdotdev/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = c.get("prisma");

  const body = await c.req.json();
  console.log("HHHHHHHHHHHH");

  const { success } = signupInput.safeParse(body);
  console.log(success);

  if (!success) {
    c.status(411);
    return c.json({ message: "Inputs are not correct!" });
  }
  console.log("BBBBBBBBBBBBBB");

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    console.log("BBBBBBBBBBBBBB");

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    c.status(200);
    return c.json({ jwt });
  } catch (e) {
    c.status(411);
    console.log("singup", e);
    return c.json({ error: "Something went wrong! or user already exist" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = c.get("prisma");
  const body = await c.req.json();
  // console.log(body);
  // console.log(signinInput.safeParse(body));
  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(404);
      return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    c.status(200);
    console.log(jwt);
    return c.json({ jwt });
  } catch (e) {
    c.status(500);
    console.log("sigin", e);
    return c.json({ error: "Something went wrong", err: e });
  }
});
