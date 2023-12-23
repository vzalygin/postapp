const PostCard = ({id, author, creationDate, title, content, answerTo, answeredFrom, liked, isDeleted}) => {
    const answerToComponent = (()=>{if(answerTo !== null)
        return <button class="btn btn-small font-weight-light post-link">&lt; {answerTo}</button>;
    })();

    const answeredFromComponent = answeredFrom.map(answer => {
        return <button class="btn btn-small font-weight-light post-link">&gt; {answer}</button>;
    });

    const likeButtonComponent = (()=>{
        if(liked===true){
            return <button type="button" class="btn liked-btn">♥</button>
        } else {
            return <button type="button" class="btn btn-light">♥</button>;
        }
    })();

    const deleteButtonComponent = (()=>{if(author.login === user.login) {
        return <button type="button" class="btn btn-outline-danger">🗑️</button>;
    }})();

    return (
        <div class="card w-50 post-card">
            <div class="card-body">
                <div class="container-fluid hor">
                    <h6 class="font-weight-light row-links">{creationDate}</h6>
                    <button class="btn btn-small font-weight-light post-link">{id}</button>
                    <button class="btn btn-link btn-sm">
                        @{author.name} {(() => {if(author.login === user.login){return"(me)";}else{return;}})()}
                    </button>
                </div>
                {answerToComponent}
                <div class="hor">
                    {answeredFromComponent}
                </div>
                <h5 class="card-title">{title}</h5>
                <p class="card-text">{content}</p>
                <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                    {likeButtonComponent}
                    <button type="button" class="btn btn-light">↪️</button>
                    {deleteButtonComponent}
                </div>
            </div>
        </div>
    )
};