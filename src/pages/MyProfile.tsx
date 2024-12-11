import PostCardGridSection from "../components/Profile/PostCardGridSection";
import ProfileSection from "../components/Profile/ProfileSection";

export default function MyProfile() {
  return (
    <section className="w-fit mx-auto flex flex-col items-center">
      <ProfileSection isMyProfile />
      <PostCardGridSection />
    </section>
  );
}
