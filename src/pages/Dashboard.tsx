import { useParams } from "react-router";
import PostCard from "../components/common/PostCard";
import { useChannelStore } from "../store/channelStore";
import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import Loading from "../components/common/Loading";

export default function Dashboard() {
  const { channelName } = useParams();
  const getIdFromName = useChannelStore((state) => state.getIdFromName);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 선택된 채널 찾기 및 해당 채널의 포스트 불러오기
  useEffect(() => {
    if (!channelName) return;

    const channelId = getIdFromName(channelName);
    if (channelId) fetchPosts(channelId);
  }, [channelName]);

  // 선택된 채널의 포스트 목록 API 요청
  const fetchPosts = async (channelId: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/posts/channel/${channelId}`);
      setPosts(response.data);
    } catch {
      setError("카테고리의 포스트를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading || error) {
    return (
      <section className="w-[934px] mx-auto flex items-center justify-center">
        {loading && <Loading />}
        {error && <p className="text-lg font-medium">{error}</p>}
      </section>
    );
  }

  return (
    <>
      <div className="mx-auto w-[934px]">
        {/* Dashboard title */}
        <h2 className="text-[32px] font-bold my-10">{channelName}</h2>
        {/* PostCard */}
        {posts.length > 0 && (
          <section className="grid grid-cols-2 gap-10">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </section>
        )}
        {posts.length === 0 && (
          <div className="flex items-center justify-center h-[50vh]">
            <p className="text-xl text-center">
              현재 작성된 포스트가 없습니다.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
