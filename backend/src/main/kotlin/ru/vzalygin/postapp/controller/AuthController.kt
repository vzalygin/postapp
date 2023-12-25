package ru.vzalygin.postapp.controller

import org.springframework.security.core.userdetails.User
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.provisioning.UserDetailsManager
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.vzalygin.postapp.USER_ROLE
import ru.vzalygin.postapp.data.user.UserCredentials

@RestController
@RequestMapping("/api/auth")
class AuthController(
    val userDetailsManager: UserDetailsManager,
    val passwordEncoder: PasswordEncoder
) {
    @PostMapping("/signup")
    fun signup(@RequestBody userCredentials: UserCredentials) {
        println("JOPA")
        val user = User.builder()
            .roles(USER_ROLE)
                .username(userCredentials.login)
            .password(passwordEncoder.encode(userCredentials.password))
            .build()
        userDetailsManager.createUser(user)
    }
}