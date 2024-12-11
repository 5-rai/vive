interface PostCardProps {
  post: {
    postId: number;
    channelName: string;
    title: string;
    content: string;
    thumbnail: string;
  };
  writer: {
    name: string;
    userId: number;
    profileImg: string;
  };
  like: number;
  isLiked: boolean;
}
