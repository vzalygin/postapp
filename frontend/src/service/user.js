import { createContext } from "react";

// Data source
export const makeUser = (login, name) => {
    return { login: login, name: name };;
};

export const users = [
    makeUser("vzalygin", "Vyacheslav Zalygin"),
    makeUser("johndoe", "John Doe") 
];
 
 export const getUserProfile = (login) => {
     return users.find(user => user.login === login);
 };

 // Auth
export const isAuthorized = (context) => {
    const { user, _  } = context;
    return user !== null;
};

export const logIn = (context, login, name) => {
    const { _, setUser  } = context;
    setUser(makeUser(login, name))
};

export const logOut = (context) => {
    const { _, setUser  } = context;
    setUser(null);
};

export const AuthContext = createContext(null);