import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./services/redux/store/store"; // Import your Redux store configuration
import { App } from "./App";
import { router } from "./App";

import { MemoryRouter, RouterProvider } from "react-router-dom";

test("renders App component", () => {
  render(
    <Provider store={store}>
      <RouterProvider router={router} initialEntries={["/"]}>
        <App />
      </RouterProvider>
    </Provider>
  );
});
