import Logo from "../../assets/Logo";
import { Link } from "react-router";

export default function LogoButton() {
  return (
    <Link to="/">
      <h1>
        <Logo className="w-11 h-11" />
      </h1>
    </Link>
  );
}
