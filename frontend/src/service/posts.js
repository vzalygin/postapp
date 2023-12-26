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
    const token = btoa(`${user.login}:${user.password}`)
    myHeaders.append("Authorization", "Basic " + token);
    
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
    const token = btoa(`${author.login}:${author.password}`)
    myHeaders.append("Authorization", "Basic " + token);
    
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