import { useAuthStore } from "../../store/authStore";
import FollowingUser from "./FollowingUser";

interface FollowingSectionProps {
  fullName: string;
  followingList: Follow[];
  isMyProfile?: boolean;
}

export default function FollowingSection({
  fullName,
  followingList,
  isMyProfile = false,
}: FollowingSectionProps) {
  const myFollowing = useAuthStore((state) => state.user)?.following;

  return (
    <section className="border-b border-gray-ee dark:border-gray-ee/50 w-full py-10">
      <h2 className="text-2xl font-semibold mb-6">
        {isMyProfile ? (
          <>나의 팔로잉 목록</>
        ) : (
          <>
            <span className="text-highlight">{fullName}</span>님의 팔로잉 목록
          </>
        )}
      </h2>
      <div className="flex gap-12">
        {followingList.map((followingUser) => (
          <FollowingUser
            key={followingUser._id}
            user={followingUser}
            myFollowInfo={myFollowing?.find(
              (following) => following.user === followingUser.user
            )}
          />
        ))}
      </div>
    </section>
  );
}
