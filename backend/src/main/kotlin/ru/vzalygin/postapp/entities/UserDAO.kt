package ru.vzalygin.postapp.entities

import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity
data class UserDAO(
    val name: String,
    @Id
    val login: String,
) {
    constructor() : this("", "")
}
