import Logo from "../../assets/Logo";
import { Link } from "react-router";

export default function LogoButton() {
  return (
    <Link to="/">
      <button>
        <Logo className="w-[45px] h-[45px]" />
      </button>
    </Link>
  );
}
