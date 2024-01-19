import { createContext } from "react"

export const LocaleContext = createContext({loc: "ru"});

export const LOCALE_BUTTON = "locale_button";
export const ME = "me";
export const LOGIN_PAGE = "login_page"
export const LOGOUT_PAGE = "logout_page"
export const WRITE_POST = "write_post"
export const LOGIN = "login"
export const PASSWORD = "password"
export const NAME = "name"
export const LOGIN_BUTTON = "login_button"
export const CREATE_ACCOUNT = "create_account"
export const LOGIN_INTENT = "login_intent"
export const DELETE_WARNING = "delete_warning"
export const ACCOUNT_NOT_FOUND = "account_not_found"
export const POST_WAS_REMOVED = "post_was_removed"
export const ANSWER_TO = "answer_to"
export const NEW_POST = "new_post"
export const CREATE_POST = "create_post"
export const TITLE = "title"
export const CONTENT = "content"
export const CONTRAINMENTS = "conts"

const texts = {
    "locale_button": {
        "ru": "Переключить на английский",
        "eng": "Switch to russian"
    },
    "me": {
        "ru": "(Я)",
        "eng": "(me)"
    },
    "login_page": {
        "ru": "Авторизоваться",
        "eng": "Authorize"
    },
    "logout_page": {
        "ru": "Выйти",
        "eng": "Logout"
    },
    "write_post": {
        "ru": "Написать пост",
        "eng": "Write a post"
    },
    "login": {
        "ru": "Логин",
        "eng": "Login"
    },
    "name": {
        "ru": "Имя",
        "eng": "Name"
    },
    "password": {
        "ru": "Пароль",
        "eng": "Password"
    },
    "login_button": {
        "ru": "Войти",
        "eng": "Enter"
    },
    "create_account": {
        "ru": "Нет аккаунта? Создайте его!",
        "eng": "Navigate to new account"
    },
    "login_intent": {
        "ru": "Уже есть аккаунт? Тогда просто войдите! :)",
        "eng": "Navigate to login page"
    },
    "delete_warning": {
        "ru": "Вы уверены, что хотите удалить пост?",
        "eng": "Are you sure want to delete the post?"
    },
    "account_not_found": {
        "ru": "Аккаунт не найден",
        "eng": "Account not found"
    },
    "post_was_removed": {
        "ru": "Пост был удален.",
        "eng": "The post was removed"
    },
    "answer_to": {
        "ru": "Ответ на",
        "eng": "Answer to"
    },
    "new_post": {
        "ru": "Новый пост!",
        "eng": "New post!"
    },
    "create_post": {
        "ru": "Создать пост",
        "eng": "Submit"
    },
    "title": {
        "ru": "Название",
        "eng": "Title"
    },
    "content": {
        "ru": "Содержание",
        "eng": "Content"
    },
    "conts": {
        "ru": "Только латинские маленькие буквы и цифры (не менее 3 символов)",
        "eng": "Only latin small letters and numbers (at least 3 characters)"
    },
};

export const i18n = (context, phrase) => {
    console.log(phrase)
    const { locale, _ } = context
    return texts[phrase][locale]
};