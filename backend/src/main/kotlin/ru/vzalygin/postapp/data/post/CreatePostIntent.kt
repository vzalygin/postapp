package ru.vzalygin.postapp.data.post

data class CreatePostIntent(
    val title: String,
    val content: String,
    val answerTo: String? = null,
)