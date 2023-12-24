import React from 'react';
import {
    user,
    isAuthorized,
} from "../service/user";

const Header = () => {
    const postButton = (() => {
        if (isAuthorized()) {
            return <button className="btn btn-primary my-2 my-lg-0" href="/post">Написать пост</button>
        } else {
            return <button className="btn btn-primary my-2 my-lg-0" href="/post" disabled>Написать пост</button>
        }
    })()

    const profileDropdown = (() => {
        if (isAuthorized()) {
            return (
                <React.Fragment>
                    <button className="btn btn-link">{user.name}</button>
                    <button className="btn btn-outline-danger">Выйти</button>
                </React.Fragment>
            )
        } else {
            return <button className="btn btn-primary" href="/login">Авторизоваться</button>
        }
    })()

    return (
        <nav className="navbar fixed-top navbar-self navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand">Posting app</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {profileDropdown}
                </ul>
            </div>
            {postButton} 
        </nav>
    );
};

export default Header;