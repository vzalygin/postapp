import React, { Fragment, useContext, useState, useEffect} from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Header from './Header';
import { AuthContext, getUserProfile, isAuthorized } from '../service/user';
import PostCard from './PostCard';

const UserProfile = () => {
    const authContext = useContext(AuthContext);
    const { user, _ } = authContext;

    const { login } = useParams();
    const [ profile, setProfle ] = useState(null);
    useEffect(() => {
        getUserProfile(login, (data) => {
            setProfle(data);
        })
    }, []);

    const meText = (()=>{
        if(isAuthorized(authContext) && login === user.login) return "(me)";
    })();
    
    let profileBlock = null;
    if (profile === null) {
        profileBlock = <h4>Загрузка</h4>
    } else {
        const userProfile = profile.first
        const userPosts = profile.second
        profileBlock = <Fragment>
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
        </Fragment>
    }

    return (
        <Fragment>
            <Header/>
            <main className="container">
                {profileBlock}
            </main>
        </Fragment>
    );
}

export default UserProfile;