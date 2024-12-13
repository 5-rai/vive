import { NavLink } from "react-router";

interface User {
  _id: string;
  fullName: string;
  image: string | null;
}

const UserNavLink = ({
  user,
  profileImg,
}: {
  user: User;
  profileImg: string;
}) => {
  return (
    <NavLink
      to={`/user/${user._id}`}
      className="flex items-center gap-2.5 px-7 py-2 rounded-lg hover:bg-secondary dark:hover:text-gray-22 transition-colors"
    >
      <img
        className="w-7 h-7 rounded-full"
        src={user.image || profileImg}
        alt={`${user.fullName}의 프로필`}
      />
      <span>{user.fullName}</span>
    </NavLink>
  );
};

export default UserNavLink;
