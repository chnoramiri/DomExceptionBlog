import {
  createRoutesFromElements,
  Link,
  Outlet,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import DetailsBlog from "./components/DetailsBlog";
import DisplayBlogs from "./components/DisplayBlogs";
import DashboardBlog from "./components/dashboard/DashboardBlog";
import Layout from "./layout/Layout";
import { createBrowserRouter } from "react-router-dom";
import TinyEditor from "./services/TinyEditor";

export function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Layout />}>
          <Route path="/details/:id" element={<DetailsBlog />} />
          <Route path="/DisplayBlogs" element={<DisplayBlogs />} />
        </Route>
        <Route path="/dashboard" element={<DashboardRoot />}>
          <Route path="/dashboard/TinyEditor" element={<TinyEditor />} />
          <Route path="/dashboard/DisplayBlogs" element={<DisplayBlogs />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
const Root = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
const DashboardRoot = () => {
  return (
    <>
      <DashboardBlog />
      <Outlet />
    </>
  );
};
