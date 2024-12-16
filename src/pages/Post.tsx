import { useParams } from "react-router";
import PostDetail from "../components/Post/PostDetail";
import Comment from "../components/Post/Comment";
import { useEffect, useState } from "react";
import { getOnePost } from "../api/post";
import NotFound from "./NotFound";

export default function Post() {
  const { channelName, postId } = useParams();
  const [post, setPost] = useState<Post>();

  const getPost = async () => {
    const post = await getOnePost(postId);
    if (!post) return;

    setPost(post);
  };

  useEffect(() => {
    getPost();
  }, []);

  if (!post || channelName !== post?.channel?.name) return <NotFound />;
  return (
    <div className="flex">
      <PostDetail post={post} />
      <Comment comments={post.comments} />
    </div>
  );
}
