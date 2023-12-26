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
import { AuthContext, makeUser, setState } from "../service/user";
import { useState } from "react";
import { LocaleContext } from "../service/loc";
import Kostyl from './Kostyl';

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
    path: "/post/new",
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
  },
  {
    path: "/postred",
    element: <Kostyl />
  }
]);

const App = () => {
  const [user, setUser] = useState(null);
  const [locale, setLocale] = useState("ru")
  // console.log("cookie")
  // console.log(document.cookie);
  if (!(document.cookie === "" || document.cookie ==="token=") && user === null) {
    const [token, login, name] = document.cookie.split("=")[1].split(':')
    setUser(makeUser(login, name, token))
  }
  
  return (
    <React.Fragment>
      <LocaleContext.Provider value={{locale, setLocale}}>
        <AuthContext.Provider value={{user, setUser}}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      </LocaleContext.Provider>
    </React.Fragment>
  );
}

export default App;