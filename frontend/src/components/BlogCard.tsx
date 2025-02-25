import { Link } from "react-router-dom";
import { formatDate } from "../util/index.ts";
export interface BlogType {
  id: string;
  title: string;
  content: string;
  author: { name: string };
  createdAt: Date;
}

const BlogCard = ({ blog }: BlogType) => {
  // console.log(blog);
  const {
    id,
    title,
    content,
    author: { name: authorName },
    createdAt,
  } = blog;
  const publishedDate = -formatDate(createdAt);
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b p-2 pb-4 cursor-pointer border-slate-200  flex gap-1 flex-col w-[400px] md:w-[700px] lg:w-[800px">
        <div className="flex gap-2 items-center">
          <div>
            <Avatar name={authorName} size="w-8 h-8" />
          </div>
          <p>{authorName}</p>
          <div className="bg-slate-500 w-[6px] h-[6px] rounded-full"></div>
          <p className="font-thin uppercase">{publishedDate}</p>
        </div>
        <div className="font-bold text-2xl pt-2">{title}</div>
        <div className="text-slate-700">{content.slice(0, 150) + "..."} </div>
        <div className="font-thin ">{`${Math.ceil(
          content.length / 100
        )} minutes read`}</div>
      </div>
    </Link>
  );
};

export const Avatar = ({ name, size }: { name: string; size: string }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${size}   overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
    >
      <span
        className={` text-xl uppercase text-gray-600 font-semibold dark:text-gray-300`}
      >
        {name[0]}
      </span>
    </div>
  );
};
export default BlogCard;
