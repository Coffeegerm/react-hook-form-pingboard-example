import "./App.css";
import { RouterProvider, Outlet, Link } from "@tanstack/react-router";
import { router } from "./routes";
import { Header } from "./components/Header";

export default function App() {
  return (
    <>
      <RouterProvider router={router}>
        <Header />
        <hr />
        <Outlet />
      </RouterProvider>
    </>
  );
}
