const Feed = () => {
    return (
        <React.Fragment>
            <Header/>
            <main class="feed">
                {posts.map(post => {
                    console.log(post)
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
        </React.Fragment>
    );
};