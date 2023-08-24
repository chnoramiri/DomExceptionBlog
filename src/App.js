import {
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import DetailsBlog from "./components/DetailsBlog";
import DisplayBlogs from "./components/DisplayBlogs";
import DashboardBlog from "./components/dashboard/DashboardBlog";
import Layout from "./layout/Layout";
import { createBrowserRouter } from "react-router-dom";
import CreateBlog from "./components/CreateBlog";
import EditBlog from "./components/EditBlog";
import DeleteBlog from "./components/DeleteBlog";

export function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route  path="/" element={<Layout />}>
          <Route index element={<DisplayBlogs />} />
          <Route path="/details/:id" element={<DetailsBlog />} />
          <Route path="/deleteBlog" element={<DeleteBlog />} />
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
