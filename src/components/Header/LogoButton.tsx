import Logo from "../../assets/Logo";
import { Link } from "react-router";

export default function LogoButton() {
  return (
    <Link to="/">
      <button className="flex-grow-0 flex-shrink-0 w-[45px] h-[45px]">
        <Logo className="w-[45px] h-[45px] absolute left-[39.5px] top-[11.5px] object-cover" />
      </button>
    </Link>
  );
}
