import React, { useContext } from "react";
import { AuthContext, isAuthorized } from "../service/user";
import { Navigate, redirect, useSearchParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import { Form } from 'react-router-dom';
import { createPost } from "../service/posts";
import { ANSWER_TO, CONTENT, CREATE_POST, LocaleContext, NEW_POST, TITLE, i18n } from "../service/loc";

// Ensure that action func will be called only after NewPostForm component call
let kostyl = null;

export const action = async ({ request }) => {
    const formData = await request.formData()
    const title = formData.get("title");
    const content = formData.get("text");
    const answerTo = formData.get("answerTo");
    console.log(formData);
    createPost(kostyl, title, content, answerTo)
    return redirect("/feed");
};

const NewPostForm = () => {
    const [params, _] = useSearchParams();
    const authContext = useContext(AuthContext);
    const locContext = useContext(LocaleContext);
    const { user, setUser } = authContext;
    kostyl = user;

    if (isAuthorized(authContext)) {
        let answerTo = null;
        if (params.get("answerTo") !== null) {
            answerTo = 
            <div className="form-group">
                <label>{i18n(locContext, ANSWER_TO)}</label>
                <input name="answerTo" type="text" className="form-control" id="answerToId" placeholder="id" value={params.get("answerTo")} readonly="readonly"/>
            </div>
        }

        return (
            <React.Fragment>
                <Header/>
                <main className="container">
                    <Form className="card w-50 post-card" method="post">
                        {answerTo}
                        <div className="form-group">
                            <h4 htmlFor="postTitle">{i18n(locContext, NEW_POST)}</h4>
                            <label className="sr-only" htmlFor="inlineFormInputGroup">{i18n(locContext, TITLE)}</label>
                            <input name="title" type="text" className="form-control" id="postTitle" placeholder="" required/>
                        </div>
                        <div className="form-group">
                        <label className="sr-only" htmlFor="inlineFormInputGroup">{i18n(locContext, CONTENT)}</label>
                            <textarea name="text" className="form-control" cols="40" rows="5" id="postText" placeholder=""></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">{i18n(locContext, CREATE_POST)}</button>
                    </Form>
                </main>
            </React.Fragment>
        )
    } else {
        return <Navigate to="/login" replace={true} />
    }
};

export default NewPostForm;