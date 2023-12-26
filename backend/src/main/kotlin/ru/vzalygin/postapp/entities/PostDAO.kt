package ru.vzalygin.postapp.entities

import jakarta.persistence.*
import java.util.*

//id, author, creationDate, title, content, answerTo=null, answeredFrom=[], liked=false, isDeleted=false

@Entity
data class PostDAO(
    @Id
    val id: UUID,
    @ManyToOne(cascade = [CascadeType.PERSIST])
    @PrimaryKeyJoinColumn
    val author: UserDAO,
    @Column(nullable = false)
    val creationDate: Date,
    @Column(nullable = false)
    val title: String,
    @Column(nullable = false)
    val content: String,
    @Column(nullable = false)
    val isDeleted: Boolean = false,
    val answerTo: UUID? = null,
) {
    constructor() : this(UUID.randomUUID(), UserDAO(), Date(0), "", "", false, null)
}