import React, { useContext } from "react";
import { AuthContext, isAuthorized } from "../service/user";
import { Navigate, redirect, useSearchParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import { Form } from 'react-router-dom';
import { createPost } from "../service/posts";

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
    const { user, setUser } = authContext;
    kostyl = user;

    if (isAuthorized(authContext)) {
        let answerTo = null;
        if (params.get("answerTo") !== null) {
            answerTo = 
            <div className="form-group">
                <label>Ответ на: </label>
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
                            <h4 htmlFor="postTitle">Новый пост!</h4>
                            <input name="title" type="text" className="form-control" id="postTitle" placeholder="Название поста" required/>
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="form-group">
                            <textarea name="text" className="form-control" cols="40" rows="5" id="postText" placeholder="Текст поста"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Создать пост</button>
                    </Form>
                </main>
            </React.Fragment>
        )
    } else {
        return <Navigate to="/login" replace={true} />
    }
};

export default NewPostForm;