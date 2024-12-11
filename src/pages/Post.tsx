import { useParams } from "react-router";
import PostDetail from "../components/Post/PostDetail";
import Comment from "../components/Post/Comment";
import { useEffect, useState } from "react";
import { getOnePost } from "../api/post";
import { usePostStore } from "../store/postStore";

export default function Post() {
  const { channelName, postId } = useParams();
  const [post, setPost] = useState<Post>();
  const setPostId = usePostStore((state) => state.setPostId);

  const getPost = async () => {
    const post = await getOnePost(postId);
    setPost(post);
    setPostId(postId!);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="flex">
      <PostDetail />
      <Comment />
    </div>
  );
}
