import { Link } from "@tanstack/react-router";

export const Header = () => {
  return (
    <div className="p-2">
      <div className="gap-2">
        <Link to="/" className="underline">
          Home
        </Link>
        <Link to="/todos" className="underline m-5">
          About
        </Link>
      </div>
    </div>
  );
};
