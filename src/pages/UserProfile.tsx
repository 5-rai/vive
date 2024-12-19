import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import PostCardGridSection from "../components/Profile/PostCardGridSection";
import ProfileSection from "../components/Profile/ProfileSection";
import { axiosInstance } from "../api/axios";
import { useAuthStore } from "../store/authStore";
import Loading from "../components/common/Loading";
import FollowingSection from "../components/Profile/FollowingSection";

export default function UserProfile() {
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useParams();
  const checkIsMyUserId = useAuthStore((state) => state.checkIsMyUserId);

  useEffect(() => {
    const fetchProfileUserData = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get<User>(`/users/${userId}`);
        setProfileUser(data);
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
        {loading && <Loading />}
        {error && <p className="text-lg font-medium">{error}</p>}
        {!loading && !profileUser && (
          <p className="text-lg font-medium">사용자 정보를 찾을 수 없습니다.</p>
        )}
      </section>
    );
  }

  if (checkIsMyUserId(userId!)) return <Navigate to="/mypage" replace />;

  return (
    <section className="w-[934px] mx-auto flex flex-col items-center gap-10">
      <ProfileSection user={profileUser} />
      <FollowingSection
        fullName={profileUser.fullName}
        followingList={profileUser.following}
      />
      <PostCardGridSection
        fullName={profileUser.fullName}
        posts={profileUser.posts}
      />
    </section>
  );
}
