import React, { useContext } from 'react';
import Header from './Header';
import { Form, Link, redirect } from 'react-router-dom';
import { getUserProfile, AuthContext } from "./../service/user"

// Ensure that action func will be called only after NewPostForm component call
let kostyl = null;

export const action = async ({ request }) => {
    const formData = await request.formData()
    const login = formData.get("login");
    const password = formData.get("password");
    const profile = getUserProfile(login);
    kostyl(profile);
    return redirect("/feed");
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
                            <input password="password" type="password" className="form-control mb-2" id="passwordInput" placeholder="Пароль" required/>
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