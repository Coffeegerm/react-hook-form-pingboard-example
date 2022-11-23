import { Link } from "@tanstack/react-router";

export const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/todos">About</Link>
    </div>
  );
};
