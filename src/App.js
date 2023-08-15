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
import CreateBlog from "./components/CreateBlog";
import EditBlog from "./components/EditBlog";

export function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Layout />}>
          <Route path="/details/:id" element={<DetailsBlog />} />
          <Route path="/DisplayBlogs" element={<DisplayBlogs />} />
        </Route>
        <Route path="/dashboard" element={<DashboardRoot />}>
          <Route path="/dashboard/CreateBlog" element={<CreateBlog />} />
          <Route path="/dashboard/DisplayBlogs" element={<DisplayBlogs />} />
          <Route path="/dashboard/EditBlog" element={<EditBlog />} />
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
