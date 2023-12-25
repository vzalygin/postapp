package ru.vzalygin.postapp.controller

import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import ru.vzalygin.postapp.data.post.CreatePostIntent
import ru.vzalygin.postapp.entities.PostDAO
import ru.vzalygin.postapp.service.PostService
import ru.vzalygin.postapp.service.UserService
import java.util.*

@RestController
@RequestMapping("/api/post")
class PostController(
    val userService: UserService,
    val postService: PostService
) {
    @GetMapping("/get/{id}")
    fun get(@PathVariable id: UUID): PostDAO {
        return postService.getPostByIdOrNull(id)!!
    }

    @PostMapping("/create")
    fun create(authentication: Authentication, @RequestBody post: CreatePostIntent): UUID {
        return postService.createPost(
            userService.getUserByLoginOrNull(
                authentication.name
            )!!,
            post
        )
    }

    @DeleteMapping("/delete/{id}")
    fun delete(@PathVariable id: UUID) {
        postService.deletePost(id)
    }

    @PostMapping("/like/{id}")
    fun likePost(authentication: Authentication, @PathVariable id: UUID) {
        postService.likePost(
            userService.getUserByLoginOrNull(
                authentication.name
            )!!,
            postService.getPostByIdOrNull(id)!!
        )
    }

    @GetMapping("/like/{id}")
    fun hasPostLike(authentication: Authentication, @PathVariable id: UUID): Boolean {
        val user = userService.getUserByLoginOrNull(authentication.name)
        val post = postService.getPostByIdOrNull(id)
        return if (user != null && post != null) {
            postService.isPostHasLike(user, post)
        } else {
            false
        }
    }

    @GetMapping("/ping")
    fun ping(authentication: Authentication): String {
        return authentication.name
    }
}