import Feed from "./Feed";
import Post from "./Post";
import {
  createHashRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import * as React from 'react';
import UserProfile from "./UserProfile";
import NewPostForm from "./NewPostForm";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { action as newPostAction } from "./NewPostForm";
import { action as loginAction } from "./LoginForm";
import { action as signupAction } from "./SignupForm";
import { AuthContext, setState } from "../service/user";
import { useState } from "react";

const router = createHashRouter([
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
    path: "/signup",
    action: signupAction,
    element: <SignupForm />
  },
  {
    path: "/:login",
    element: <UserProfile/>,
  },
  {
    path: "/",
    element: <Navigate to="/feed" replace={true} />
  }
]);

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <React.Fragment>
        <AuthContext.Provider value={{user, setUser}}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;