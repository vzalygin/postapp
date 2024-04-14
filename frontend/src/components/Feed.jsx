import React, { Fragment, useContext, useEffect, useState } from 'react';
import PostCard from "./PostCard";
import { getPostsWithLikes } from "../service/posts";
import Header from './Header';
import { AuthContext } from '../service/user';

const Feed = () => {
    const { user, _ } = useContext(AuthContext)
    const [ {posts, status}, setPosts ] = useState({posts: [], status: "pending"})

    useEffect(() => {
        getPostsWithLikes(user, (data) => {
            setPosts({posts: data, status: "ready"})
        })
    }, []);

    let postsBlock = null;
    if (status === "ready") {
        postsBlock = <Fragment>{
            posts.map(post => {
            return <PostCard key={post.id}
                id={post.id}
                author={post.author}
                creationDate={post.creationDate}
                title={post.title}
                content={post.content}
                answerTo={post.answerTo}
                answeredFrom={post.answeredFrom}
                liked={post.liked}
                isDeleted={post.isDeleted}
            />})}
            </Fragment>;
    } else {
        postsBlock = <h4>Loading... Please wait</h4>;
    }

    return (
        <React.Fragment>
            <Header/>
            <main className="container">
                {postsBlock}
            </main>
        </React.Fragment>
    );
};

export default Feed;