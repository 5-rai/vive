import PostCardGridSection from "../components/Profile/PostCardGridSection";
import ProfileSection from "../components/Profile/ProfileSection";

export default function UserProfile() {
  return (
    <section className="w-fit mx-auto flex flex-col items-center">
      <ProfileSection />
      <PostCardGridSection />
    </section>
  );
}
