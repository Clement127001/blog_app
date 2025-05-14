import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "src/pages/Root";
import ErrorPage from "src/pages/Error";
import BlogRootPage from "./pages/BlogRoot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <div className="text-app-primary-800">home sweet home</div>,
      },
      {
        path: "login",
        element: <div>login</div>,
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
