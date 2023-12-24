package ru.vzalygin.postapp.api.controllers

import org.springframework.security.access.annotation.Secured
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import ru.vzalygin.postapp.data.EditPostIntent
import ru.vzalygin.postapp.data.Post
import ru.vzalygin.postapp.services.PostService
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
    @Secured("ROLE_USER")
    fun create(@RequestBody post: Post): UUID {
        TODO()
    }

    @PutMapping("/edit")
    @Secured("ROLE_USER")
    fun edit(@RequestBody editedPost: EditPostIntent): UUID {
        TODO()
    }

    @DeleteMapping("/delete/{id}")
    @Secured("ROLE_USER")
    fun delete(@PathVariable id: UUID): Boolean {
        TODO()
    }
}