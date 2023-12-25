package ru.vzalygin.postapp.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import ru.vzalygin.postapp.data.post.Post
import ru.vzalygin.postapp.data.user.User

@RestController("/api")
class CommonController {
    @GetMapping("/feed")
    fun feed(): List<Post> {
        TODO()
    }

    @GetMapping("/user/{username}")
    fun user(@PathVariable username: String): User {
        TODO()
    }
}