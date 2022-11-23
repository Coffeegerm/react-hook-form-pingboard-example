import { createRouteConfig, createReactRouter } from "@tanstack/react-router";
import { Home } from "./home";

const routeConfig = createRouteConfig().createChildren((createRoute) => [
  createRoute({ path: "/", component: Home }), // This is the index route for the root of your router
  createRoute({ path: "/todos" }).createChildren((createRoute) => [
    createRoute({ path: "/" }), // This is the index route for the /todos route
    createRoute({ path: ":todoId" }),
  ]),
]);

export const router = createReactRouter({ routeConfig });
