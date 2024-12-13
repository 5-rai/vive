import { useState, useEffect } from "react";
import { axiosInstance } from "../api/axios";
import PostCardGridSection from "../components/Profile/PostCardGridSection";
import ProfileSection from "../components/Profile/ProfileSection";

export default function MyProfile() {
  // User 정보 가져오기
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<User>("/auth-user");
        setUser(response.data);
      } catch (err) {
        console.error(err);
        setError("사용자 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return <div>로딩 중</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>사용자 정보를 찾을 수 없습니다.</div>;

  return (
    <section className="w-fit mx-auto flex flex-col items-center">
      <ProfileSection user={user} isMyProfile={true} />
      <PostCardGridSection posts={user.posts} />
    </section>
  );
}
