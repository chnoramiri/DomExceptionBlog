import { RouterProvider} from "react-router-dom";
import DetailsBlog from "./components/DetailsBlog";
import DisplayBlogs from "./components/DisplayBlogs";
import SaveBlog from "./components/SaveBlog";
import Layout from "./layout/Layout";
import { createBrowserRouter } from 'react-router-dom'
import { FC } from "react";
import Main from "./layout/main/Main";


    const router = createBrowserRouter([
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <Main />,
          },
          {
            path: '/details/:id',
            element: <DetailsBlog />,
          },
          {
            path: '/DisplayBlogs',
            element: <DisplayBlogs />,
          },
          {
            path: '/SaveBlog',
            element: <SaveBlog />,
          },
        ],
      },
    ])
    
    export const App = () => <RouterProvider router={router} />

