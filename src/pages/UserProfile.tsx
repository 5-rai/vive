import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PostCardGridSection from "../components/Profile/PostCardGridSection";
import ProfileSection from "../components/Profile/ProfileSection";
import { axiosInstance } from "../api/axios";

export default function UserProfile() {
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchProfileUserData = async () => {
      try {
        setLoading(true);
        const userResponse = await axiosInstance.get<User>(`/users/${userId}`);
        setProfileUser({
          ...userResponse.data,
        });
      } catch (err) {
        console.error(err);
        setError("사용자 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfileUserData();
  }, [userId]);

  if (loading || error || !profileUser) {
    return (
      <section className="w-[934px] mx-auto flex items-center justify-center">
        {loading && (
          <div>
            <div className="loader" />
          </div>
        )}
        {error && <p className="text-lg font-medium">{error}</p>}
        {!profileUser && (
          <p className="text-lg font-medium">사용자 정보를 찾을 수 없습니다.</p>
        )}
      </section>
    );
  }

  return (
    <section className="w-fit mx-auto flex flex-col items-center">
      <ProfileSection user={profileUser} />
      <PostCardGridSection posts={profileUser.posts} />
    </section>
  );
}
