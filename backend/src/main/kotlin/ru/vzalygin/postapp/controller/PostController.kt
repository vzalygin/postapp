package ru.vzalygin.postapp.controller

import org.springframework.security.access.annotation.Secured
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import ru.vzalygin.postapp.USER_ROLE
import ru.vzalygin.postapp.data.post.CreatePostIntent
import ru.vzalygin.postapp.data.post.EditPostIntent
import ru.vzalygin.postapp.data.post.Post
import ru.vzalygin.postapp.service.PostService
import java.util.UUID

@RestController("/api/post")
class PostController(
    postService: PostService
) {
    @GetMapping("/get/{id}")
    fun get(@PathVariable id: UUID): Result<Post> {
        TODO()
    }

    @PostMapping("/create")
    @Secured(USER_ROLE)
    fun create(@RequestBody post: CreatePostIntent): UUID {
        TODO()
    }

    @PutMapping("/edit")
    @Secured(USER_ROLE)
    fun edit(@RequestBody editedPost: EditPostIntent): UUID {
        TODO()
    }

    @DeleteMapping("/delete/{id}")
    @Secured(USER_ROLE)
    fun delete(@PathVariable id: UUID): Boolean {
        TODO()
    }

    @GetMapping("/ping")
    @Secured(USER_ROLE)
    fun ping(): String {
        return "success"
    }
}