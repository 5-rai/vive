import { useParams } from "react-router";
import PostDetail from "../components/Post/PostDetail";
import Comment from "../components/Post/Comment";

export default function Post() {
  const { channelName, postId } = useParams();

  return (
    <div className="flex">
      <PostDetail />
      <Comment />
    </div>
  );
}
