import React from 'react';
import PostCard from "./PostCard";
import { posts } from "../service/posts";

const Feed = () => {
    return (
        <main className="container">
            {posts.map(post => {
                return <PostCard
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
    );
};

export default Feed;