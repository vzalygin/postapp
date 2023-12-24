import React from 'react';
import { user } from '../service/user';
import { Link } from 'react-router-dom';

const PostCard = ({id, author, creationDate, title, content, answerTo, answeredFrom, liked, isDeleted}) => {
    const metaBlock =(
        <div className="container-fluid hor">
            <h6 className="font-weight-light row-links">{creationDate}</h6>
            <Link to={`/post/${id}`} className="btn btn-small font-weight-light post-link">{id}</Link>
            <Link to={`/user/${author.login}`} className="btn btn-link btn-sm">
                @{author.name} {(() => {if(author.login === user.login){return"(me)";}else{return;}})()}
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
        if(liked===true){
            return <button type="button" className="btn btn-liked">♥</button>
        } else {
            return <button type="button" className="btn btn-light">♥</button>;
        }
    })();

    const deleteButtonComponent = (()=>{if(author.login === user.login) {
        return <button type="button" className="btn btn-outline-danger">🗑️</button>;
    }})();

    const contentBlock = (()=>{if(isDeleted !== true) {
            return <React.Fragment>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
                <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                    {likeButtonComponent}
                    <button type="button" className="btn btn-light">↪️</button>
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