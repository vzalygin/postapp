package ru.vzalygin.postapp.entities

import jakarta.persistence.*
import java.util.*

@Entity
data class LikeDAO(
    @OneToOne(cascade = [CascadeType.PERSIST])
    val post: PostDAO,
    @OneToOne(cascade = [CascadeType.PERSIST])
    val user: UserDAO,
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null
) {
    constructor() : this(PostDAO(), UserDAO(), null)
}