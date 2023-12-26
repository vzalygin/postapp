package ru.vzalygin.postapp.data.post

import ru.vzalygin.postapp.entities.UserDAO
import java.util.*

data class Post(
    val id: UUID,
    val author: UserDAO,
    val creationDate: Date,
    val title: String,
    val content: String,
    val answerTo: UUID? = null,
    val answeredFrom: List<UUID> = listOf(),
    val isDeleted: Boolean,
)