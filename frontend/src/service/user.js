import { useContext } from "react";

export const isAuthorized = () => {
    return useContext(UserContext) !== null;
};

export const makeUser = (login, name) => {
    return { login: login, name: name }
};

export const logIn = (login, name) => {
    useContext(UserContext) = makeUser(login, name)
};

export const logOut = () => {
    useContext(UserContext) = null;
};

export const users = [
   makeUser("vzalygin", "Vyacheslav Zalygin"),
   makeUser("johndoe", "John Doe") 
]

export const getUserProfile = (login) => {
    return users.find(user => user.login === login);
};

export const setUser = (profile) => {
    const {user, setUser } = useContext(UserContext);
    setUser(profile);
}

export const UserContext = useContext(user);