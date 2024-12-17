import MoreButton from "../../components/Header/MoreButton";

interface ProfileButtonProps {
  profileImage: string | null | undefined;
}

export default function ProfileButton({ profileImage }: ProfileButtonProps) {
  return <MoreButton profileImage={profileImage} />;
}
