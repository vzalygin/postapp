package ru.vzalygin.postapp.data.post

import java.util.Date
import java.util.UUID

data class Post(
    val id: UUID,
    val author: UUID,
    val title: String,
    val content: String,
    val createdAt: Date,
    val editedAt: Date,
)