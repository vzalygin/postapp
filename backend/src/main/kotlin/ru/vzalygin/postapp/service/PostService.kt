package ru.vzalygin.postapp.service

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import ru.vzalygin.postapp.data.post.CreatePostIntent
import ru.vzalygin.postapp.data.post.Post
import ru.vzalygin.postapp.entities.LikeDAO
import ru.vzalygin.postapp.entities.PostDAO
import ru.vzalygin.postapp.entities.UserDAO
import ru.vzalygin.postapp.repository.LikeRepository
import ru.vzalygin.postapp.repository.PostRepository
import java.util.*

@Service
class PostService(
    val postRepository: PostRepository,
    val likeRepository: LikeRepository
) {
    fun getFeed(): List<Post> {
        return postRepository.findAll().map { fromDao(it) }
    }

    fun getUsersPosts(user: UserDAO): List<Post> {
        return postRepository.findAllByAuthor(user).map { fromDao(it) }
    }

    fun getPostByIdOrNull(id: UUID): PostDAO? {
        return postRepository.findByIdOrNull(id)
    }

    fun createPost(author: UserDAO, createPostIntent: CreatePostIntent): UUID {
        val id = UUID.randomUUID()
        val post = PostDAO(
            id,
            author,
            Date(),
            createPostIntent.title,
            createPostIntent.content,
            false,
            UUID.fromString(createPostIntent.answerTo)
        )
        postRepository.save(post)
        return id
    }

    fun deletePost(id: UUID) {
        val post = postRepository.findByIdOrNull(id)!!
        postRepository.deleteById(id)
        postRepository.save(
            PostDAO(
                id = post.id,
                author = post.author,
                creationDate = post.creationDate,
                title = post.title,
                content = post.content,
                isDeleted = true,
                answerTo = post.answerTo
            )
        )
    }

    fun isPostHasLike(user: UserDAO, post: PostDAO): Boolean =
        likeRepository.findByUserAndPost(user, post) != null

    fun likePost(user: UserDAO, post: PostDAO) {
        val like = likeRepository.findByUserAndPost(user, post)

        if (like != null) {
            likeRepository.deleteById(like.id!!)
        } else {
            likeRepository.save(
                LikeDAO(
                    post, user
                )
            )
        }
    }

    private fun fromDao(dao: PostDAO): Post =
        Post(
            dao.id,
            dao.author,
            dao.creationDate,
            dao.title,
            dao.content,
            dao.answerTo,
            postRepository.findAllByAnswerTo(dao.id).map { child -> child.id!! },
            dao.isDeleted,
        )
}