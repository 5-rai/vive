import { useParams } from "react-router";
import PostDetail from "../components/post/PostDetail";
import Comment from "../components/post/Comment";

export default function Post() {
  const { channelName, postId } = useParams();

  return (
    <div className="flex">
      <PostDetail />
      <Comment />
    </div>
  );
}
