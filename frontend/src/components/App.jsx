import Feed from "./Feed";
import Post from "./Post";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import * as React from 'react';
import UserProfile from "./UserProfile";
import NewPostForm from "./NewPostForm";
import LoginForm from "./LoginForm";
import { action as newPostAction } from "./NewPostForm";
import { action as loginAction } from "./LoginForm";
import { useContext } from "react";
import { user, UserContext } from "../service/user";

const router = createBrowserRouter([
  {
    path: "/feed",
    element: <Feed />,
  },
  {
    path: "/post/:id",
    element: <Post />
  },
  {
    path: "/post/new?",
    action: newPostAction,
    element: <NewPostForm />
  },
  {
    path: "/login",
    action: loginAction,
    element: <LoginForm />
  },
  {
    path: "/:login",
    element: <UserProfile/>,
    errorElement: <Navigate to="/feed" replace={true} />
  },
  {
    path: "/",
    element: <Navigate to="/feed" replace={true} />
  }
]);

const App = () => {
  return (
    <React.Fragment>
        <UserContext.Provider>
          <RouterProvider router={router} />
        </UserContext.Provider>
    </React.Fragment>
  );
}

export default App;