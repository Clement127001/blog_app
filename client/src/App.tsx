import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/pages/Root";
import ErrorPage from "@/pages/Error";
import BlogRootPage from "@/pages/BlogRoot";
import { Button } from "@/components/ui/button";
import LoginPage from "@/pages/Login";

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
        element: <div>register</div>,
      },
      {
        path: "blogs",
        element: <BlogRootPage />,
        children: [{ index: true, element: <div>all blogs page</div> }],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
