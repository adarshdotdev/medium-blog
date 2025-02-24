import React from "react";
import BlogCard from "../components/BlogCard";
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks";
import Loader from "../components/Loader";

const Blogs = () => {
  const [loading, blogs] = useBlogs();

  if (loading === true) {
    return <Loader />;
  }
  return (
    <div>
      <div className=" flex-col flex gap-6 md:gap-10  ">
        <Appbar />

        <div className="flex flex-col gap-5  items-center justify-center mx-auto max-w-2xl px-4 md:px-0">
          {blogs.map((blog) => (
            <BlogCard blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;

const demo = (
  <BlogCard
    title="Embracing the Journey of Software Development"
    publishedDate="2 feb 2225"
    content="Software development is a dynamic field where creativity meets logic, and innovation is a constant companion. Whether you're a beginner coding your first lines or an experienced developer architecting complex systems, every step in your journey contributes to your growth and success.

In development, challenges are opportunities to learn. Debugging a stubborn piece of code, exploring new frameworks, or collaborating on open-source projects can unlock fresh perspectives and refine your skills. Each challenge reinforces the idea that failure is not a setback but a stepping stone toward mastery."
    authorName="Adarsh Gupta"
  />
);
