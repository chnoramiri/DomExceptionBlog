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
import Login from "./components/login/Login";
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

export function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
const pca = new PublicClientApplication({
  auth: {
    clientId: "22b7d364-8e33-47f2-980e-fddf165d19ca",
    authority:
      "https://domexception.b2clogin.com/domexception.onmicrosoft.com",
    redirectUrl: "/",
  },
});

const DashboardRoot = () => {
  return (
    <>
      {/* <MsalProvider instance={pca}> */}
        {/* <AuthenticatedTemplate> */}
          <DashboardBlog />
          <Outlet />
        {/* </AuthenticatedTemplate> */}
      {/* </MsalProvider> */}
    </>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
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
