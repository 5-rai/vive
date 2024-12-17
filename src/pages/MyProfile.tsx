import { useState, useEffect } from "react";
import { axiosInstance } from "../api/axios";
import PostCardGridSection from "../components/Profile/PostCardGridSection";
import ProfileSection from "../components/Profile/ProfileSection";
import { useAuthStore } from "../store/authStore";
import Loading from "../components/common/Loading";

export default function MyProfile() {
  // User 정보 가져오기
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const myId = useAuthStore((state) => state.user)?._id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get<User>(`/users/${myId}`);
        setUser(data);
      } catch (err) {
        console.error(err);
        setError("사용자 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading || error || !user)
    return (
      <section className="w-[934px] mx-auto flex items-center justify-center">
        {loading && <Loading />}
        {error && <p className="text-lg font-medium">{error}</p>}
        {!loading && !user && (
          <p className="text-lg font-medium">사용자 정보를 찾을 수 없습니다.</p>
        )}
      </section>
    );

  return (
    <section className="w-[934px] mx-auto flex flex-col items-center">
      <ProfileSection user={user} isMyProfile={true} />
      <PostCardGridSection posts={user.posts} />
    </section>
  );
}
