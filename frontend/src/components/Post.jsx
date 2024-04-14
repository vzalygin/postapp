import React, { useState, useEffect, } from 'react';
import PostCard from './PostCard';
import { getPostById } from '../service/posts';
import { useParams } from 'react-router-dom';
import Header from './Header';

const Post = () => {
    const { id } = useParams();
    const [ post, setPost ] = useState(null)

    useEffect(() => {
        getPostById(id, (data) => {
            setPost(data)
        })
    }, []);

    let postBlock = null
    if (post === null) {
        postBlock = <h4>Загрузка</h4>
    } else {
        postBlock = <PostCard
                        id={post.id}
                        author={post.author}
                        creationDate={post.creationDate}
                        title={post.title}
                        content={post.content}
                        answerTo={post.answerTo}
                        answeredFrom={post.answeredFrom}
                        liked={post.liked}
                        isDeleted={post.isDeleted}
                    />
    }

    return (
        <React.Fragment>
            <Header/>
            <main className='container'>
                {postBlock}
            </main>            
        </React.Fragment>

    )
};

export default Post;