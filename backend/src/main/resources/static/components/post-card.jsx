const PostCard = ({id, author, creationDate, title, content, answerTo, answeredFrom, liked, isDeleted}) => {
    const metaBlock =(
        <div class="container-fluid hor">
            <h6 class="font-weight-light row-links">{creationDate}</h6>
            <button class="btn btn-small font-weight-light post-link">{id}</button>
            <button class="btn btn-link btn-sm">
                @{author.name} {(() => {if(author.login === user.login){return"(me)";}else{return;}})()}
            </button>
        </div>
    );
    
    const answerToBlock = (()=>{if(answerTo !== null)
        return <button class="btn btn-small font-weight-light post-link">&lt; {answerTo}</button>;
    })();

    const answeredFromBlock = 
        <div>
            {answeredFrom.map(answer => {
                return <button class="btn btn-small font-weight-light post-link">&gt; {answer}</button>;
            })}
        </div>;

    const likeButtonComponent = (()=>{
        if(liked===true){
            return <button type="button" class="btn btn-liked">♥</button>
        } else {
            return <button type="button" class="btn btn-light">♥</button>;
        }
    })();

    const deleteButtonComponent = (()=>{if(author.login === user.login) {
        return <button type="button" class="btn btn-outline-danger">🗑️</button>;
    }})();

    const contentBlock = (()=>{if(isDeleted !== true) {
            return <React.Fragment>
                <h5 class="card-title">{title}</h5>
                <p class="card-text">{content}</p>
                <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                    {likeButtonComponent}
                    <button type="button" class="btn btn-light">↪️</button>
                    {deleteButtonComponent}
                </div>
            </React.Fragment>
        } else {
            return <h5 class="card-title">Пост был удален.</h5>
    }})();

    return (
        <div class="card w-50 post-card">
            <div class="card-body">
                {metaBlock}
                {answerToBlock}
                {answeredFromBlock}
                {contentBlock}
            </div>
        </div>
    )
};