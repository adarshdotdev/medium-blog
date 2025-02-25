import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useAuth } from "../../context/AuthContext"; // Adjust the path if necessary

const Appbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  console.log("helll", isLoggedIn);

  return (
    <div>
      <div className="flex items-center gap-4 justify-between py-4 px-10 md:px-20 shadow-md">
        <Link to="/">
          <div className="font-extrabold uppercase underline text-2xl">
            Happeace
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/">Blogs</Link>

          {isLoggedIn && (
            <>
              <Link to="/publish">
                <button
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Publish
                </button>
              </Link>
              <Avatar size="w-10 h-10" name="adarsh" />
              <button
                onClick={() => {
                  logout();
                  navigate("/signin");
                }}
                className="cursor-pointer"
              >
                <img className="w-5 h-5" alt="logout" src="/logout.svg" />
              </button>
            </>
          )}

          {!isLoggedIn && (
            <Link to="/signin">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appbar;
