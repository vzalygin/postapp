import React, { useContext } from 'react';
import Header from './Header';
import { Form, Link, redirect } from 'react-router-dom';
import { getUserProfile, AuthContext, makeUser, validate } from "./../service/user"
import { with_base, with_auth } from '../service/network';
import { ACCOUNT_NOT_FOUND, CREATE_ACCOUNT, LOGIN, LOGIN_BUTTON, LocaleContext, PASSWORD, i18n } from '../service/loc';

// Ensure that action func will be called only after NewPostForm component call
let kostyl = null;
let locKostyl = null;

export const action = async ({ request }) => {
    const formData = await request.formData()
    const login = formData.get("login");
    const password = formData.get("password");
    const profile = makeUser(login, null, password)
    
    // console.log(profile)
    var myHeaders = new Headers();
    const token = btoa(`${profile.login}:${profile.password}`)
    myHeaders.append("Authorization", "Basic " + token);
    console.log(myHeaders)
    const response = await fetch(with_base("/api/auth/validate"), {
        method: 'GET',
        headers:myHeaders,
    });
    console.log(response)
    if (response.ok) {
        const name = await response.text()
        kostyl(makeUser(login, name, password))
        document.cookie = `token=${password}:${login}:${name}`;
        return redirect("/feed");
    } else {
        console.log(await response.text());
        window.alert(i18n(locKostyl, ACCOUNT_NOT_FOUND));
        return null;
    }
};

const LoginForm = () => {
    const locContext = useContext(LocaleContext);
    const { user, setUser } = useContext(AuthContext);
    kostyl = setUser;
    locKostyl = locContext

    return (
        <React.Fragment>
            <Header/>
            <main className='container'>    
                <Form className="card w-50 post-card" method='post'>
                    <div className="form-col align-items-center form-group">
                        <div className="col-auto">
                        <label className="sr-only" htmlFor="inlineFormInputGroup">{i18n(locContext, LOGIN)}</label>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupPrepend">@</span>
                            </div>
                            <input name="login" type="text" className="form-control" id="loginInput" placeholder="" required/>
                        </div>
                        <div className="col-auto">
                            <label className="sr-only" htmlFor="inlineFormInput">{i18n(locContext, PASSWORD)}</label>
                            <input name="password" type="password" className="form-control mb-2" id="passwordInput" placeholder="" required/>
                        </div>
                    </div>
                    <div className="col-auto hor">
                        <button type="submit" className="btn btn-primary mb-2">{i18n(locContext, LOGIN_BUTTON)}</button>
                    </div>
                    <Link to={"/signup"}>{i18n(locContext, CREATE_ACCOUNT)}</Link>
                    </div>
                </Form>
            </main>
        </React.Fragment>
    );
};

export default LoginForm;