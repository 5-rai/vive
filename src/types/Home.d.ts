interface User {
    _id: string;
    fullName: string;
    image?: string;
  }
  
  interface Channel {
    _id: string;
    name: string;
  }
  
  interface Post {
    _id: string;
    title: string; 
    author?: {
      _id: string;
      fullName: string;
      image?: string;
    };
    createdAt: string;
  }
  
  interface ChannelPosts {
    posts: Post[];
    name: string;
  }