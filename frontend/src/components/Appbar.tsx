import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

const Appbar = () => {
  return (
    <div className="  ">
      <div className="flex items-center gap-4 justify-between py-4 px-10 md:px-20   shadow-md">
        <Link to="/">
          <div className="font-extrabold uppercase underline text-2xl">
            Happeace
          </div>
        </Link>
        <div className=" flex items-center gap-4">
          <Link to={"/publish"}>
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Publish
            </button>
          </Link>
          <Avatar size="w-10 h-10" name="adarsh" />
        </div>
      </div>
    </div>
  );
};
export default Appbar;
