import {encode} from "base-64"

export const url_base = "http://localhost:8081";

export const with_base = (url) => { return url_base+url }

export const with_auth = (user) => {
    console.log(user.login, user.password)
    return new Headers({ 
        "Authorization": "Basic " + encode(`${user.login}:${user.password}`)
    })
}

export const with_auth2 = (user, headers) => {
    console.log(user.login, user.password)
    return headers.append( 
        "Authorization", "Basic " + encode(`${user.login}:${user.password}`)
    )
}