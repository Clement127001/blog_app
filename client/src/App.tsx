import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/pages/Root";
import ErrorPage from "@/pages/Error";
import BlogRootPage from "@/pages/BlogRoot";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import CreateBlogPage from "@/pages/CreateBlog";
import { Button } from "@/components/ui/button";
import AllBlogsPage from "@/pages/AllBlogs";
import BlogDetailsPage from "@/pages/BlogDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <div className="text-app-primary-800">
            home sweet home
            <Button>hi</Button>
          </div>
        ),
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
