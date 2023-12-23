let user = {
    login: "vzalygin",
    name: "Vyacheslav Zalygin",
};

const isAuthorized = () => {
    return user !== null;
};

const makeUser = (login, name) => {
    return { login: login, name: name }
};

const LogIn = (login, name) => {
    user = makeUser(login, name)
};

const LogOut = () => {
    user = null;
};