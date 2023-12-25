import React, { Fragment, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Header from './Header';
import { AuthContext, getUserProfile, isAuthorized } from '../service/user';
import { getPostsByAuthorLogin } from '../service/posts';
import PostCard from './PostCard';

const UserProfile = () => {
    const authContext = useContext(AuthContext);
    const { user, _ } = authContext;

    const { login } = useParams();
    const userProfile = getUserProfile(login);
    if (userProfile === undefined) {
        return <Navigate to={"/feed"}/>
    }
    const userPosts = getPostsByAuthorLogin(login);

    const meText = (()=>{
        if(isAuthorized() && login === user.login) return "(me)";
    })();
    return (
        <Fragment>
            <Header/>
            <main className="container">
                <div className="card w-50 post-card">
                    <div className="card-body">
                        <div className="hor">
                            <h5 className="card-title">{userProfile.name} {meText}&emsp;&emsp;</h5>
                            <span className='font-weight-light'>@{userProfile.login}</span>
                        </div>
                    </div>
                </div>
                {userPosts.map(post => <PostCard key={post.id}
                    id={post.id}
                    author={post.author}
                    creationDate={post.creationDate}
                    title={post.title}
                    content={post.content}
                    answerTo={post.answerTo}
                    answeredFrom={post.answeredFrom}
                    liked={post.liked}
                    isDeleted={post.isDeleted}
                />)}
            </main>
        </Fragment>
    );
}

export default UserProfile;