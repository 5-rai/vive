import { useParams } from "react-router";
import PostDetail from "../components/Post/PostDetail";
import Comment from "../components/Post/Comment";
import { useEffect, useState } from "react";
import { getOnePost } from "../api/post";
import NotFound from "./NotFound";

export default function Post() {
  const { channelName, postId } = useParams();
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>();

  const getPost = async () => {
    const post = await getOnePost(postId);
    if (!post) return;

    setPost(post);
    setComments(post.comments);
  };

  useEffect(() => {
    getPost();
  }, []);

  if (!post || !comments || channelName !== post?.channel?.name) {
    return <NotFound />;
  }
  return (
    <div className="flex">
      <PostDetail post={post} />
      <Comment comments={comments} setComments={setComments} />
    </div>
  );
}
