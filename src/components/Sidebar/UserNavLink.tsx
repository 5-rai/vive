import { NavLink } from "react-router";

const UserNavLink = ({ user }: { user: User }) => {
  return (
    <NavLink
      key={user._id}
      to={`/user/${user._id}`}
      className="group flex items-center gap-2.5 px-7 py-2 rounded-lg hover:bg-secondary dark:hover:text-gray-22 transition-colors"
    >
      <div className="relative w-7 h-7">
        <img
          className="w-7 h-7 rounded-full border border-gray-ee bg-white/20"
          src={user.image || "/logo.png"}
        />
        {user.isOnline && (
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#21e10f] rounded-full border border-white group-hover:border-secondary transition-colors" />
        )}
      </div>

      <span>{user.fullName}</span>
    </NavLink>
  );
};

export default UserNavLink;
