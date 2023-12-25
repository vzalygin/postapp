package ru.vzalygin.postapp.data.user

import java.util.UUID

data class User(
    val id: UUID,
    val name: String,
    val password: String,
)