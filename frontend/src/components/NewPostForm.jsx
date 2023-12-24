import React, { useContext } from "react";
import { UserContext, isAuthorized } from "../service/user";
import { Navigate, redirect, useSearchParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import { Form } from 'react-router-dom';
import { createPost } from "../service/posts";

export const action = async ({ request }) => {
    const formData = await request.formData()
    const title = formData.get("title");
    const content = formData.get("text");
    const answerTo = formData.get("answerTo");
    console.log(formData)
    createPost(useContext(UserContext), title, content, answerTo)
    return redirect("/feed");
};

const NewPostForm = () => {
    const [state, _] = useSearchParams()
    if (isAuthorized()) {
        let answerTo = null;
        if (state.get("answerTo") !== null) {
            answerTo = 
            <div className="form-group">
                <label>Ответ на: </label>
                <input name="answerTo" type="text" className="form-control" id="answerToId" placeholder="id" value={state.get("answerTo")} readonly="readonly"/>
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
                            <input name="title1" type="text" className="form-control" id="postTitle" placeholder="Название поста" required/>
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