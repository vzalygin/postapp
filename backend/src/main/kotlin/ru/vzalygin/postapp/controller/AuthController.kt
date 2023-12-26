package ru.vzalygin.postapp.controller

import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.core.Authentication
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.provisioning.UserDetailsManager
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.vzalygin.postapp.USER_ROLE
import ru.vzalygin.postapp.data.user.UserCredentials
import ru.vzalygin.postapp.entities.UserDAO
import ru.vzalygin.postapp.repository.UserRepository
import org.springframework.security.core.userdetails.User as UserAuth

@RestController
@RequestMapping("/api/auth")
class AuthController(
    val userDetailsManager: UserDetailsManager,
    val passwordEncoder: PasswordEncoder,
    val userRepository: UserRepository
) {
    @PostMapping("/signup")
    fun signup(@RequestBody userCredentials: UserCredentials) {
        userRepository.save(
            UserDAO(userCredentials.name, userCredentials.login)
        )
        userDetailsManager.createUser(
            UserAuth.withUsername(userCredentials.login)
                .roles(USER_ROLE)
                .password(userCredentials.password)
                .passwordEncoder(passwordEncoder::encode)
                .build()
        )
        // println(userRepository.findAll())
        // println(userRepository.findByIdOrNull(userCredentials.login))
    }

    @GetMapping("/validate")
    fun validate(authentication: Authentication): String? {
        return userRepository.findByIdOrNull(authentication.name)?.name
    }
}