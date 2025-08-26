import { createRoot } from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

import { RouterProvider, createRouter } from "@tanstack/react-router";
import {routeTree} from "./routing/routeTree.js";
const router = createRouter({
  routeTree,
  context:{
    queryClient,
    store
  }
 });

import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { AuthOnReload } from "./utils/AuthWhenReload.js";

async function init() {
  await AuthOnReload(store); // this calls /api/auth/me and updates redux

  createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}

init();
