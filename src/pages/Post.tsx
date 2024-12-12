import { useParams } from "react-router";
import PostDetail from "../components/Post/PostDetail";
import Comment from "../components/Post/Comment";
import { useEffect, useState } from "react";
import { getOnePost } from "../api/post";
import { usePostStore } from "../store/postStore";

export default function Post() {
  const { postId } = useParams();
  const setPost = usePostStore((state) => state.setPost);
  const setPostId = usePostStore((state) => state.setPostId);
  const setComments = usePostStore((state) => state.setComments);

  const getPost = async () => {
    const post = await getOnePost(postId);
    if (!post) return;

    setPost(post);
    setComments(post.comments);
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
