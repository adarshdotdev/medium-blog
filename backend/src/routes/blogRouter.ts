import { Hono } from "hono";
import { createPostInput, updatePostInput } from "@adarshdotdev/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    prisma: any;
  };
}>();

blogRouter.post("/", async (c) => {
  const userId = c.get("userId");
  const prisma = c.get("prisma");

  const body = await c.req.json();

  const { success } = createPostInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: "Inputs not correct" });
  }
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    c.status(201);
    return c.json({
      id: post.id,
    });
  } catch (e) {
    c.status(404);
    console.log("post created", e);
    return c.json({ error: "Something went wrong", err: e });
  }
});
blogRouter.get("/bulk", async (c) => {
  const prisma = c.get("prisma");
  console.log("*&&&");
  try {
    const posts = await prisma.post.findMany();
    c.status(200);
    return c.json({ data: posts });
  } catch (e) {
    c.status(500);
    console.log("/blul", e);
    return c.json({ message: "Something went wrong.", error: e });
  }
});
blogRouter.put("/:id", async (c) => {
  const userId = c.get("userId");
  const prisma = c.get("prisma");
  const postId = c.req.param("id");

  const body = await c.req.json();
  const { success } = updatePostInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: "Inputs not correct" });
  }
  try {
    const post = await prisma.post.update({
      where: {
        id: postId,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    c.status(200);
    return c.json({ post, message: "post Updated" });
  } catch (e) {
    console.log("post update ", e);
    c.status(500);
    return c.json({ error: e, message: "Something went wrong" });
  }
});

blogRouter.get("/:id", async (c) => {
  console.log("this is it!");
  const prisma = c.get("prisma");
  const id = c.req.param("id");

  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      c.status(404);
      return c.json({ message: "psot wat not found!" });
    }

    c.status(200);
    return c.json({ data: post });
  } catch (e) {
    c.status(500);
    console.log("get blog", e);
    return c.json({ message: "something went wrong", error: e });
  }
});
