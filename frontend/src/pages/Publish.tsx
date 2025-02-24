import React, { useState } from "react";
import Editor from "../components/Editor,";
import Appbar from "../components/Appbar";
import PublishButton from "../components/PublishButton";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    navigate(`/blog/${response.data.id}`);
  };
  return (
    <div className="flex gap-10  flex-col">
      <Appbar />
      <div className="p-4 mx-auto flex flex-col gap-10 max-w-[1000px]">
        <div className="   ">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            id="large-input"
            className=" block w-full p-4 text-2xl text-gray-900 border border-gray-300 rounded-md bg-gray-50  focus:ring-blue-500 font-bold focus:border-blue-500   "
          />
        </div>
        <div className="shadow-sm w-full">
          <Editor content={content} setContent={setContent} />
        </div>
        <div onClick={handleClick}>
          <PublishButton />
        </div>
      </div>
    </div>
  );
};

export default Publish;
