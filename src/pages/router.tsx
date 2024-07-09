import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./SignUp/page";
import SignIn from "./SignIn/page";
import Protected from "./protected";
import Home from "./Home/page";
import NotFound from "./404/page";

const router = createBrowserRouter([
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "*",
    element: <Protected />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
