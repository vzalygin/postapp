const Header = () => {
    const postButton = (() => {
        if (isAuthorized()) {
            return <button class="btn btn-primary my-2 my-lg-0" href="/post" role="button">Написать пост</button>
        } else {
            return <button class="btn btn-primary my-2 my-lg-0" href="/post" role="button" disabled>Написать пост</button>
        }
    })()

    const profileDropdown = (() => {
        if (isAuthorized()) {
            return (
                <React.Fragment>
                    <button class="btn btn-link">{user.name}</button>
                    <button class="btn btn-outline-danger">Выйти</button>
                </React.Fragment>
            )
        } else {
            return <button class="btn btn-primary" href="/login" role="button">Авторизоваться</button>
        }
    })()

    return (
        <nav class="navbar fixed-top navbar-self navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand">Posting app</a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    {profileDropdown}
                </ul>
            </div>
            {postButton} 
        </nav>
    );
};