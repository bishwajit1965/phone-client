import RootLayout from "../layouts/RootLayout";
import UpdateUser from "../pages/updateUser/UpdateUser";
import Users from "../pages/users/Users";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Users />,
        loader: () => fetch("http://localhost:5000/users"),
      },
      {
        path: "/users/:id",
        element: <UpdateUser />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/users/${params.id}`),
      },
    ],
  },
]);

export default router;
