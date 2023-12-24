import React from 'react';
import PostCard from './PostCard';
import { getPostById } from '../service/posts';
import { useParams } from 'react-router-dom';

const Post = () => {
    const { id } = useParams();
    const post = getPostById(id);
    return (
        <main className='container'>
            <PostCard
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
        </main>
    )
};

export default Post;