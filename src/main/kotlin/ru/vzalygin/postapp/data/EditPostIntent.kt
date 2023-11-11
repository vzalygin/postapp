package ru.vzalygin.postapp.data

import java.util.UUID

data class EditPostIntent(
    val id: UUID,
    val title: String,
    val content: String,
)