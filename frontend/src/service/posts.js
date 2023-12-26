import { with_auth, with_auth2, with_base } from "./network";
import {
    user, makeUser, getUserProfile
} from "./user";

const makePost = (id, author, creationDate, title, content, answerTo=null, answeredFrom=[], liked=false, isDeleted=false) => {
    return {
        id: id,
        author: author,
        creationDate: creationDate,
        title: title,
        content: content,
        answerTo: answerTo,
        answeredFrom: answeredFrom,
        liked: liked,
        isDeleted: isDeleted
    }
};

const posts = [
    makePost(
        "9165c789-bb94-414a-9666-2bf15f31bece", 
        getUserProfile("vzalygin"), 
        "2023-12-12", 
        "Lorem Ipsum", 
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur felis a dapibus consectetur. Proin ultricies, urna non pulvinar sagittis, turpis risus dictum lorem, ac scelerisque tortor erat a eros. Donec sit amet ligula justo. Integer nec lectus in justo luctus faucibus ut vel enim. Nunc ligula augue, facilisis vitae nisl a, sagittis hendrerit nisl. Pellentesque sed ante non sem scelerisque elementum. Nulla semper velit a libero feugiat feugiat. Morbi ullamcorper velit eros, scelerisque sagittis massa maximus ac. Ut dictum nibh ut lacus vulputate tempus. Nullam augue tortor, viverra quis molestie a, finibus a nibh.`, 
        null,
        ["e2cdad6d-ccba-464d-bbcc-88dd4c5d4293", "e2cdad1d-ccba-464d-bbcc-88dd4c5d4293", "e2cdad3d-ccba-464d-bbcc-88dd4c5d4293"],
        false, 
        false
    ),
    makePost(
        "e2cdad6d-ccba-464d-bbcc-88dd4c5d4293", 
        makeUser("johndoe", "John Doe"), 
        "2024-12-13", 
        "Answer to \"Lorem Ipsum\"", 
        `Donec ullamcorper porta ipsum, eu condimentum lectus. Mauris at mi et nunc gravida pulvinar eu ac turpis. Praesent quis viverra sem. Nulla vel velit vestibulum, consectetur dolor sit amet, accumsan metus. Aenean efficitur lacus a lacus condimentum, nec pellentesque purus fermentum. Morbi aliquam accumsan urna, vel hendrerit neque volutpat ac. In hac habitasse platea dictumst. Fusce elementum enim at nisl mattis luctus. `, 
        "9165c789-bb94-414a-9666-2bf15f31bece",
        [],
        true, 
        false
    ),
    makePost(
        "e2cdad1d-ccba-464d-bbcc-88dd4c5d4293", 
        makeUser("johndoe", "John Doe"), 
        "2024-12-13", 
        "Answer to \"Lorem Ipsum\"", 
        `Donec ullamcorper porta ipsum, eu condimentum lectus. Mauris at mi et nunc gravida pulvinar eu ac turpis. Praesent quis viverra sem. Nulla vel velit vestibulum, consectetur dolor sit amet, accumsan metus. Aenean efficitur lacus a lacus condimentum, nec pellentesque purus fermentum. Morbi aliquam accumsan urna, vel hendrerit neque volutpat ac. In hac habitasse platea dictumst. Fusce elementum enim at nisl mattis luctus. `, 
        "9165c789-bb94-414a-9666-2bf15f31bece",
        [],
        false, 
        true
    ),
    makePost(
        "e2cdad3d-ccba-464d-bbcc-88dd4c5d4293", 
        makeUser("johndoe", "John Doe"), 
        "2024-12-13", 
        "Answer to \"Lorem Ipsum\"", 
        `Donec ullamcorper porta ipsum, eu condimentum lectus. Mauris at mi et nunc gravida pulvinar eu ac turpis. Praesent quis viverra sem. Nulla vel velit vestibulum, consectetur dolor sit amet, accumsan metus. Aenean efficitur lacus a lacus condimentum, nec pellentesque purus fermentum. Morbi aliquam accumsan urna, vel hendrerit neque volutpat ac. In hac habitasse platea dictumst. Fusce elementum enim at nisl mattis luctus. `, 
        "9165c789-bb94-414a-9666-2bf15f31bece",
        [],
        true, 
        false
    )
];

export const getPostsWithLikes = (user, setCallback) => {
    fetch(with_base("/api/feed"), {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        setCallback(data);
    })
} 


export const getPostById = (id, setCallback) => {
    fetch(with_base(`/api/post/get/${id}`), {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        setCallback(data);
    })
}

export const setLikeOnPost = (user, id) => {
    
};

export const setDeletedOnPost = (user, id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic " + btoa(`${user.login}:${user.password}`));
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("http://localhost:8081/api/post/delete/"+id, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

export const createPost = (author, title, content, answerTo) => {
    const postIntent = {title, content, answerTo};
    console.log(postIntent);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(btoa(`${author.login}:${author.password}`))
    myHeaders.append("Authorization", "Basic " + btoa(`${author.login}:${author.password}`));
    
    var raw = JSON.stringify({
      "title": title,
      "content": content,
      "answerTo": answerTo,
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:8081/api/post/create", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
};