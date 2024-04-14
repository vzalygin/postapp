package ru.vzalygin.postapp.controller

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.vzalygin.postapp.data.post.Post
import ru.vzalygin.postapp.entities.UserDAO
import ru.vzalygin.postapp.service.PostService
import ru.vzalygin.postapp.service.UserService


@RestController
@RequestMapping("/api")
class CommonController(
    val userService: UserService,
    val postService: PostService
) {
    @GetMapping("/feed")
    fun feed(): List<Post> {
        return postService.getFeed()
    }

    @GetMapping("/user/{username}")
    fun user(@PathVariable username: String): Pair<UserDAO, List<Post>> {
        val user = userService.getUserByLoginOrNull(username)
        if (user != null) {
            return Pair(user, postService.getUsersPosts(user))
        } else {
            throw NotFoundException()
        }
    }
}