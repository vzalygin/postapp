package ru.vzalygin.postapp.repository

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import ru.vzalygin.postapp.entities.PostDAO
import ru.vzalygin.postapp.entities.UserDAO
import java.util.*

@Repository
interface PostRepository : CrudRepository<PostDAO, UUID> {
    fun findAllByAnswerTo(answerTo: UUID): List<PostDAO>

    fun findAllByAuthor(author: UserDAO): List<PostDAO>
}