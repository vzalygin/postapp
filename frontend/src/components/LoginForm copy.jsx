import React from 'react';
import Header from './Header';
import { Form, Link } from 'react-router-dom';

const LoginForm = () => {
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
                                <span class="input-group-text" id="inputGroupPrepend">@</span>
                            </div>
                            <input type="text" className="form-control" id="loginInput" placeholder="Логин" required/>
                        </div>
                        <div className="col-auto">
                            <label className="sr-only" htmlFor="inlineFormInput">Пароль</label>
                            <input type="text" className="form-control mb-2" id="passwordInput" placeholder="Пароль" required/>
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