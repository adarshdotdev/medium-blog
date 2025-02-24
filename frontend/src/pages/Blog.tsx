import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useBlog } from "../hooks";
import Fullblog from "../components/Fullblog";
import Appbar from "../components/Appbar";

const Blog = () => {
  const { id } = useParams();
  const [loading, blog] = useBlog({ id: id || "" });

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="  ">
      <Appbar />
      <Fullblog blog={blog} />
    </div>
  );
};

export default Blog;
