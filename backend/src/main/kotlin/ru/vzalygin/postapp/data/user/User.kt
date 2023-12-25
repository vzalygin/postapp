package ru.vzalygin.postapp.data.user

import java.util.*

data class User(
    val id: UUID,
    val name: String,
    val login: String,
    val password: String,
)