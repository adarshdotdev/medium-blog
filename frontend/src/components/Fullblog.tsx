import React from "react";
import { Avatar, BlogType } from "./BlogCard";
import { formatDate } from "../util";

const Fullblog = ({ blog }: BlogType) => {
  const {
    title,
    createdAt,
    content,
    author: { name },
  } = blog;

  const publishedDate = formatDate(createdAt);
  return (
    <div className="grid mt-10 gap-5  grid-cols-1 sm:grid-cols-3 mx-auto max-w-[1200px] p-8 lg:p-14  ">
      <div className="sm:col-span-2  ">
        <div className=" ">
          <h1 className="font-bold text-3xl md:text-5xl  ">{title}</h1>
          <p className="text-slate-700 mt-2">Published on {publishedDate}</p>
        </div>
        <div>
          <p className="font-medium mt-5 text-slate-800 text-lg">{content}</p>
        </div>
      </div>
      <div className="  px-2">
        <h3 className="font-semibold text-lg text-slate-900">Author</h3>
        <div className="flex gap-3 items-center text-lg font-bold">
          <Avatar size="w-10 h-10" name={name} />
          <p>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
        </div>
      </div>
    </div>
  );
};

export default Fullblog;
