import { Link } from "react-router";

const NewPostButton = () => (
  <Link to="/write">
    <button className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[106px] h-10 gap-2.5 rounded-full primary-btn">
      <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-center">
        새 포스팅
      </p>
    </button>
  </Link>
);

export default NewPostButton;
