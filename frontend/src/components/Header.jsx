import React from 'react';
import {
    user,
    isAuthorized,
} from "../service/user";
import { Link } from 'react-router-dom';

const Header = () => {
    const postButton = (() => {
        if (isAuthorized()) {
            return <Link to={"/post/new"} className="btn btn-primary my-2 my-lg-0">Написать пост</Link>
        } else {
            return <Link to={"/login"} className="btn btn-primary my-2 my-lg-0">Написать пост (Авторизация)</Link>
        }
    })()

    const profileDropdown = (() => {
        if (isAuthorized()) {
            return (
                <React.Fragment>
                    <Link to={`/${user.login}`} className="btn btn-link">{user.name}</Link>
                    <button className="btn btn-outline-danger">Выйти</button>
                </React.Fragment>
            )
        } else {
            return <Link to={"/login"} className="btn btn-primary" href="/login">Авторизоваться</Link>
        }
    })()

    return (
        <nav className="navbar fixed-top navbar-self navbar-expand-lg navbar-dark bg-dark">
            <Link to={"/feed"} className="navbar-brand">Posting app</Link>
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