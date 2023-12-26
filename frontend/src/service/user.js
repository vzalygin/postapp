import { createContext } from "react";
import { with_auth, with_base } from "./network";
import { encode } from "base-64";

// Data source
export const makeUser = (login, name, password) => {
    return { login: login, name: name, password: password };;
};
 
export const getUserProfile = (login, setCallback) => {
    fetch(with_base(`/api/user/${login}`), {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        setCallback(data);
    });
};

 // Auth
export const isAuthorized = (context) => {
    const { user, _  } = context;
    return user !== null;
};

export const signup = (user) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "name": user.name,
    "login": user.login,
    "password": user.password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8081/api/auth/signup", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    // fetch(with_base("/api/auth/signup"), {
    //         method:'POST',
    //         body: JSON.stringify(user)
    //     }
    // ).then((response) => console.log(response));
}

export const logIn = (context, user) => {
    const { _, setUser  } = context;
    setUser(user)
};

export const logOut = (context) => {
    const { _, setUser  } = context;
    setUser(null);
};

export const AuthContext = createContext(null);