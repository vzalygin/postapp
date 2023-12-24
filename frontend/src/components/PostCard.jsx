import React, { useState } from 'react';
import { user, isAuthorized } from '../service/user';
import { Link } from 'react-router-dom';
import { setLikeOnPost, setDeletedOnPost } from '../service/posts';

const PostCard = ({id, author, creationDate, title, content, answerTo, answeredFrom, liked, isDeleted}) => {
    const [state, setState] = useState({like: liked, isDeleted: isDeleted });
    const setLike = () => {
        const value = { like: !(state.like), isDeleted: state.isDeleted};
        setLikeOnPost(id, value.like);
        setState(value)
    };
    const setDeleted = () => {
        if (window.confirm("Вы уверены, что хотите удалить пост?")) {
            const value = { like: state.like, isDeleted: true };
            setDeletedOnPost(id);
            setState(value);
        }
    }

    const metaBlock =(
        <div className="container-fluid hor">
            <h6 className="font-weight-light row-links">{creationDate}</h6>
            <Link to={`/post/${id}`} className="btn btn-small font-weight-light post-link">{id}</Link>
            <Link to={`/${author.login}`} className="btn btn-link btn-sm">
                @{author.name} {(() => {if(isAuthorized() && author.login === user.login){return"(me)";}else{return;}})()}
            </Link>
        </div>
    );
    
    const answerToBlock = (()=>{if(answerTo !== null)
        return <Link to={`/post/${answerTo}`} className="btn btn-small font-weight-light post-link" >&lt; {answerTo}</Link>;
    })();

    const answeredFromBlock = 
        <div>
            {answeredFrom.map(answer => {
                return <Link to={`/post/${answer}`} className="btn btn-sm font-weight-light post-link">&gt; {answer}</Link>;
            })}
        </div>;

    const likeButtonComponent = (()=>{
        if(state.like===true){
            return <button className="btn btn-liked" onClick={setLike} >♥</button>
        } else {
            return <button className="btn btn-light" onClick={setLike}>♥</button>;
        }
    })();

    const deleteButtonComponent = (()=>{if(isAuthorized() && author.login === user.login) {
        return <button type="button" className="btn btn-outline-danger" onClick={setDeleted}>🗑️</button>;
    }})();

    const contentBlock = (()=>{if(state.isDeleted === false) {
            return <React.Fragment>
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{content}</p>
                        <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                            {likeButtonComponent}
                            <Link to={`/post/new?answerTo=${id}`} type="button" className="btn btn-light">↪️</Link>
                            {deleteButtonComponent}
                        </div>
                    </React.Fragment>
        } else {
            return <h5 className="card-title">Пост был удален.</h5>
    }})();

    return (
        <div className="card w-50 post-card">
            <div className="card-body">
                {metaBlock}
                {answerToBlock}
                {answeredFromBlock}
                {contentBlock}
            </div>
        </div>
    )
};

export default PostCard;