package ru.vzalygin.postapp.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.vzalygin.postapp.data.post.Post
import ru.vzalygin.postapp.data.user.User

@RestController
@RequestMapping("/api")
class CommonController {
    @GetMapping("/api/feed")
    fun feed(): List<Post> {
        TODO()
    }

    @GetMapping("/api/user/{username}")
    fun user(@PathVariable username: String): User {
        TODO()
    }
}