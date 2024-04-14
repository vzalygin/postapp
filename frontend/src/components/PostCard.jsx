import React, { useContext, useState } from 'react';
import { AuthContext, isAuthorized } from '../service/user';
import { Link } from 'react-router-dom';
import { setLikeOnPost, setDeletedOnPost } from '../service/posts';
import { DELETE_WARNING, LocaleContext, ME, POST_WAS_REMOVED, i18n } from '../service/loc';

const PostCard = ({id, author, creationDate, title, content, answerTo, answeredFrom, liked, isDeleted}) => {
    const authContext = useContext(AuthContext);
    const locContext = useContext(LocaleContext);
    const { user, _ } = authContext;

    const [state, setState] = useState({like: liked, isDeleted: isDeleted });
    const setLike = () => {
        const value = { like: !(state.like), isDeleted: state.isDeleted};
        setLikeOnPost(id, value.like);
        setState(value)
    };
    const setDeleted = () => {
        if (window.confirm(i18n(locContext, DELETE_WARNING))) {
            const value = { like: state.like, isDeleted: true };
            setDeletedOnPost(user, id);
            setState(value);
        }
    }

    const metaBlock =(
        <div className="container-fluid hor">
            <small className="font-weight-light row-links">{creationDate.substring(0, 10+9)}</small>
            <Link to={`/postred?id=${id}`} className="btn btn-small font-weight-light post-link">{id}</Link>
            <Link to={`/${author.login}`} className="btn btn-link btn-sm">
                @{author.name} {(() => {if(isAuthorized(authContext) && author.login === user.login){return i18n(locContext, ME);}else{return;}})()}
            </Link>
        </div>
    );
    
    const answerToBlock = (()=>{if(answerTo !== null)
        return <Link to={`/postred?id=${answerTo}`} target="_blank" rel="noopener noreferrer" className="btn btn-small font-weight-light post-link" >&lt;= {answerTo}</Link>;
    })();

    const answeredFromBlock = 
        <div>
            {answeredFrom.map(answer => {
                return <Link to={`/post/${answer}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm font-weight-light post-link">=&gt; {answer}</Link>;
            })}
        </div>;

    const likeButtonComponent = (()=>{
        if(state.like===true){
            return <button className="btn btn-liked" onClick={setLike} >♥</button>
        } else {
            return <button className="btn btn-light" onClick={setLike}>♥</button>;
        }
    })();

    const deleteButtonComponent = (()=>{if(isAuthorized(authContext) && author.login === user.login) {
        return <button type="button" className="btn btn-outline-danger" onClick={setDeleted}>🗑️</button>;
    }})();

    const contentBlock = (()=>{if(state.isDeleted === false) {
            return <React.Fragment>
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{content}</p>
                        <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                            {/* {likeButtonComponent} */}
                            <Link to={`/post/new?answerTo=${id}`} type="button" className="btn btn-light">↪️</Link>
                            {deleteButtonComponent}
                        </div>
                    </React.Fragment>
        } else {
            return <h5 className="card-title">{i18n(locContext, POST_WAS_REMOVED)}</h5>
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