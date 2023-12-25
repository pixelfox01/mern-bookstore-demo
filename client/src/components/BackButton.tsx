import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/" }) => {
  return (
    <Link
      to={destination}
      className="bg-sky-600 hover:bg-sky-800 text-white px-4 py-1 rounded-lg w-fit flex gap-2 items-center"
    >
      <BsArrowLeft className="inline-block mr-2" />
      <span className="inline-block">Back</span>
    </Link>
  );
};

export default BackButton;
