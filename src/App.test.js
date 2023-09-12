import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { App } from "./App";
import { router } from "./App";
import {  RouterProvider } from "react-router-dom";
import { store } from "./services/redux/store/store";

test("renders App component", () => {
  render(
    <Provider store={store}>
      <RouterProvider router={router} initialEntries={["/"]}>
        <App />
      </RouterProvider>
    </Provider>
  );
});
