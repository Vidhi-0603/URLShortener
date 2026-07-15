import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree.js"
import RedirectPage from "../pages/RedirectPage.jsx"

export const redirectURL = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$id',
  component: RedirectPage,
})