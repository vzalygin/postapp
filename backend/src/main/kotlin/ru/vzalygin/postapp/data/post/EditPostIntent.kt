package ru.vzalygin.postapp.data.post

import java.util.UUID

data class EditPostIntent(
    val id: UUID,
    val title: String,
    val content: String,
)