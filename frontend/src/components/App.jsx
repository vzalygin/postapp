import Feed from "./Feed";
import Header from "./Header";
import Post from "./Post";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import * as React from 'react';
import UserProfile from "./UserProfile";

const router = createBrowserRouter([
  {
    path: "/feed",
    element: <Feed/>,
  },
  {
    path: "/post/:id",
    element: <Post/>
  },
  {
    path: "/user/:login",
    element: <UserProfile/>
  },
  {
    path: "/",
    element: <Navigate to="/feed" replace={true} />
  }
]);

const App = () => {
  return (
    <React.Fragment>
        <Header/>
        <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;