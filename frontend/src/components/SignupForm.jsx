import React, { useContext } from 'react';
import Header from './Header';
import { Form, Link, redirect } from 'react-router-dom';
import { getUserProfile, AuthContext, makeUser, signup } from "../service/user"
import { CONTRAINMENTS, LOGIN, LOGIN_BUTTON, LOGIN_INTENT, LOGIN_PAGE, LocaleContext, NAME, PASSWORD, i18n } from '../service/loc';

// Ensure that action func will be called only after NewPostForm component call
let kostyl = null;

export const action = async ({ request }) => {
    const formData = await request.formData()
    const name = formData.get("name");
    const login = formData.get("login");
    const password = formData.get("password");
    if (login.length < 3) {
        window.alert("Слишком короткий логин");
        return null;
    } else if (!login.match(/[a-z0-9]+/)) {
        window.alert("Логин не удовлетворяет требованиям");
        return null;
    }
    if (password.length < 8) {
        window.alert("Слишком короткий пароль");
        return null;
    } else if (!password.match(/[a-z0-9]+/)) {
        window.alert("Пароль не удовлетворяет требованиям");
        return null;
    }

    const profile = makeUser(login, name, password);
    kostyl(profile);
    signup(profile)
    document.cookie = `token=${password}:${login}:${name}`;

    return redirect("/feed");
};

const SignupForm = () => {
    const locContext = useContext(LocaleContext);
    const { user, setUser } = useContext(AuthContext);
    kostyl = setUser;

    return (
        <React.Fragment>
            <Header/>
            <main className='container'>    
                <Form className="card w-50 post-card" method='post'>
                    <div className="form-col align-items-center form-group">
                        <div className="col-auto">
                            <label className="sr-only" htmlFor="inlineFormInput">{i18n(locContext, NAME)}</label>
                            <input name="name" type="text" className="form-control mb-2" id="nameInput" placeholder="" required/>
                        </div>
                        <div className="col-auto">
                            <label className="sr-only" htmlFor="inlineFormInputGroup">{i18n(locContext, LOGIN)}</label>
                            <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                                    </div>
                                <input name="login" type="text" className="form-control" id="loginInput" placeholder="" required/>
                            </div>
                            <small id="loginHelpBlock" className="form-text text-muted">
                                {i18n(locContext, CONTRAINMENTS)}
                            </small>
                        </div>
                        <div className="col-auto">
                            <label className="sr-only" htmlFor="inlineFormInput">{i18n(locContext, PASSWORD)}</label>
                            <input name="password" type="password" className="form-control mb-2" id="passwordInput" placeholder="" required/>
                            <small id="passwordHelpBlock" className="form-text text-muted">
                                {i18n(locContext, CONTRAINMENTS)}
                            </small>
                        </div>
                        <div className="col-auto hor">
                            <button type="submit" className="btn btn-primary mb-2">{i18n(locContext, LOGIN_BUTTON)}</button>
                        </div>
                        <Link to={"/login"}>{i18n(locContext, LOGIN_INTENT)}</Link>
                    </div>
                </Form>
            </main>
        </React.Fragment>
    );
};

export default SignupForm;