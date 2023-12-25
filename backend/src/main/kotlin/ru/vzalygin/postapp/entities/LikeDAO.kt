package ru.vzalygin.postapp.entities

import jakarta.persistence.*
import java.util.*

@Entity
data class LikeDAO(
    @OneToOne(cascade = [CascadeType.ALL])
    @PrimaryKeyJoinColumn
    val post: PostDAO,
    @OneToOne(cascade = [CascadeType.ALL])
    @PrimaryKeyJoinColumn
    val user: UserDAO,
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null
) {
    constructor() : this(PostDAO(), UserDAO(), null)
}
