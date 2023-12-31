import {
    user, makeUser, getUserProfile
} from "./user";
import { v4 as uuidv4 } from 'uuid';

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

export const posts = [
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


export const getPostById = (id) => {
    return posts.find(post => post.id === id)
}

export const setLikeOnPost = (id, value) => {
    getPostById(id).liked = value
};

export const setDeletedOnPost = (id) => {
    getPostById(id).isDeleted = true;
}

export const createPost = (author, title, content, answerTo) => {
    const id = uuidv4() 
    posts.push(makePost(
        id, author, new Date().toISOString(), title, content, answerTo, [], false, false
    ));
    const answered = posts.find(post => post.id === answerTo);
    if (answered !== undefined) {
        answered.answeredFrom.push(id)
    }
};

export const getPostsByAuthorLogin = (login) => {
    return posts.filter(post => post.author.login === login);
}