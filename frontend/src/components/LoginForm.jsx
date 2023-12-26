import React, { useContext } from 'react';
import Header from './Header';
import { Form, Link, redirect } from 'react-router-dom';
import { getUserProfile, AuthContext, makeUser, validate } from "./../service/user"
import { with_base, with_auth } from '../service/network';

// Ensure that action func will be called only after NewPostForm component call
let kostyl = null;

export const action = async ({ request }) => {
    const formData = await request.formData()
    const login = formData.get("login");
    const password = formData.get("password");
    const profile = makeUser(login, null, password)
    
    console.log(profile)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic " + btoa(`${profile.login}:${profile.password}`));
    console.log(myHeaders)
    const response = await fetch(with_base("/api/auth/validate"), {
        method: 'GET',
        headers:myHeaders,
    })
    console.log(response)
    if (response.ok) {
        kostyl(makeUser(login, await response.text(), password))
        return redirect("/feed");
    } else {
        console.log(await response.text());
        window.alert("Пользователь не найден!");
        return null;
    }
};

const LoginForm = () => {
    const { user, setUser } = useContext(AuthContext);
    kostyl = setUser;

    return (
        <React.Fragment>
            <Header/>
            <main className='container'>    
                <Form className="card w-50 post-card" method='post'>
                    <div className="form-col align-items-center form-group">
                        <div className="col-auto">
                        <label className="sr-only" htmlFor="inlineFormInputGroup">Логин</label>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroupPrepend">@</span>
                            </div>
                            <input name="login" type="text" className="form-control" id="loginInput" placeholder="Логин" required/>
                        </div>
                        <div className="col-auto">
                            <label className="sr-only" htmlFor="inlineFormInput">Пароль</label>
                            <input name="password" type="password" className="form-control mb-2" id="passwordInput" placeholder="Пароль" required/>
                        </div>
                    </div>
                    <div className="col-auto hor">
                        <button type="submit" className="btn btn-primary mb-2">Войти</button>
                    </div>
                    <Link to={"/signup"}>Нет аккаунта? Создайте его!</Link>
                    </div>
                </Form>
            </main>
        </React.Fragment>
    );
};

export default LoginForm;