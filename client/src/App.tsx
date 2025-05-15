import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/pages/Root";
import ErrorPage from "@/pages/Error";
import BlogRootPage from "@/pages/BlogRoot";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import CreateBlogPage from "@/pages/CreateBlog";
import AllBlogsPage from "@/pages/AllBlogs";
import BlogDetailsPage from "@/pages/BlogDetails";
import HomePage from "@/pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "blogs",
        element: <BlogRootPage />,
        children: [
          { index: true, element: <AllBlogsPage /> },
          {
            path: "create",
            element: <CreateBlogPage />,
          },
          {
            path: ":blogId",
            element: <BlogDetailsPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
