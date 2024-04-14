import React, { useContext } from 'react';
import {
    AuthContext,
    isAuthorized, 
} from "../service/user";
import { Link } from 'react-router-dom';
import { LOCALE_BUTTON, LOGIN_PAGE, LOGOUT_PAGE, LocaleContext, WRITE_POST, i18n } from '../service/loc';

const Header = () => {
    const authContext = useContext(AuthContext);
    const { user, setUser } = authContext;

    const locContext = useContext(LocaleContext);
    const { locale, setLocale} = locContext;

    const logout = () => {
        console.log("jopa");
        document.cookie = "token=";
        setUser(null);
    }

    const postButton = (() => {
        if (isAuthorized(authContext)) {
            return <Link to={"/post/new"} className="btn btn-primary my-2 my-lg-0">{i18n(locContext, WRITE_POST)}</Link>
        } else {
            return <Link to={"/login"} className="btn btn-primary my-2 my-lg-0">{i18n(locContext, WRITE_POST)}</Link>
        }
    })()

    const profileDropdown = (() => {  
        if (isAuthorized(authContext)) {
            return (
                <React.Fragment>
                    <Link to={`/${user.login}`} className="btn btn-link">{user.name}</Link>
                    <button className="btn btn-outline-danger" onClick={logout}>{i18n(locContext, LOGOUT_PAGE)}</button>
                </React.Fragment>
            )
        } else {
            return <Link to={"/login"} className="btn btn-primary" href="/login">{i18n(locContext, LOGIN_PAGE)}</Link>
        }
    })()

    const switchLocale = () => {
        if (locale === "ru") { setLocale("eng") }
        if (locale === "eng") {setLocale("ru") }
    };

    const localButton =
        <button className="btn btn-outline-info" onClick={switchLocale}>{i18n(locContext, LOCALE_BUTTON)}</button>

    return (
        <nav className="navbar fixed-top navbar-self navbar-expand-lg navbar-dark bg-dark">
            <Link to={"/feed"} className="navbar-brand">Posting app</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {profileDropdown}
                </ul>
            </div>
            {localButton}
            {postButton} 
        </nav>
    );
};

export default Header;