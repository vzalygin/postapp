import React from 'react';
import PostCard from "./PostCard";
import { posts } from "../service/posts";
import Header from './Header';

const Feed = () => {
    return (
        <React.Fragment>
            <Header/>
            <main className="container">
                {posts.map(post => {
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
                    />;
                })}
            </main>
        </React.Fragment>
    );
};

export default Feed;