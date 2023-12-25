package ru.vzalygin.postapp.repository

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import ru.vzalygin.postapp.entities.LikeDAO
import ru.vzalygin.postapp.entities.PostDAO
import ru.vzalygin.postapp.entities.UserDAO
import java.util.*

@Repository
interface LikeRepository : CrudRepository<LikeDAO, UUID> {
    fun findByUserAndPost(user: UserDAO, post: PostDAO): LikeDAO?
}