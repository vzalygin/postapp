import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { user, getUserProfile, isAuthorized } from '../service/user';
import { getPostsByAuthorLogin } from '../service/posts';
import PostCard from './PostCard';

const UserProfile = () => {
    const { login } = useParams();
    const userProfile = getUserProfile(login);
    const userPosts = getPostsByAuthorLogin(login);

    const meText = (()=>{
        if(isAuthorized() && login == user.login) return "(me)";
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