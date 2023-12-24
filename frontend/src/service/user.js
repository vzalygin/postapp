let user = {
    login: "vzalygin",
    name: "Vyacheslav Zalygin",
};
// let user = null;

const isAuthorized = () => {
    return user !== null;
};

const makeUser = (login, name) => {
    return { login: login, name: name }
};

const logIn = (login, name) => {
    user = makeUser(login, name)
};

const logOut = () => {
    user = null;
};

const users = [
   makeUser("vzalygin", "Vyacheslav Zalygin"),
   makeUser("johndoe", "John Doe") 
]

const getUserProfile = (login) => {
    return users.find(user => user.login === login);
};

export { user, users, getUserProfile, isAuthorized, makeUser, logIn, logOut };