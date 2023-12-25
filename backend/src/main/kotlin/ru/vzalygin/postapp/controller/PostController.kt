package ru.vzalygin.postapp.controller

import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
import ru.vzalygin.postapp.data.post.CreatePostIntent
import ru.vzalygin.postapp.data.post.Post
import ru.vzalygin.postapp.service.PostService
import java.util.*

@RestController
@RequestMapping("/api/post")
class PostController(
    postService: PostService
) {
    @GetMapping("/get/{id}")
    fun get(@PathVariable id: UUID): Result<Post> {
        TODO()
    }

    @PostMapping("/create")
    fun create(@RequestBody post: CreatePostIntent): UUID {
        return UUID.randomUUID()
    }

    @DeleteMapping("/delete/{id}")
    fun delete(@PathVariable id: UUID): Boolean {
        TODO()
    }

    @PostMapping("/like/{id}")
    fun likePost(@PathVariable id: UUID): Boolean {
        TODO()
    }

    @GetMapping("/ping")
    fun ping(authentication: Authentication): String {
        return authentication.name
    }
}