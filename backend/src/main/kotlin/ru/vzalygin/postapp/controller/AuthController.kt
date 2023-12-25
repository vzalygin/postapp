package ru.vzalygin.postapp.controller

import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.password.AbstractPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.provisioning.UserDetailsManager
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import ru.vzalygin.postapp.USER_ROLE
import ru.vzalygin.postapp.data.user.UserCredentials

@RestController("/api/auth")
class AuthController(
    val authManager: AuthenticationManager,
    val userDetailsManager: UserDetailsManager,
    val passwordEncoder: PasswordEncoder
) {
    @PostMapping("/login")
    fun login(@RequestBody userCredentials: UserCredentials) {
        val authRequest = UsernamePasswordAuthenticationToken.unauthenticated(
            userCredentials.username, userCredentials.password
        )
        val authResponse = authManager.authenticate(authRequest)
    }

    @PostMapping("/signup")
    fun signup(@RequestBody userCredentials: UserCredentials) {
        println("JOPA")
        val user = User.builder()
            .roles(USER_ROLE)
            .username(userCredentials.username)
            .password(passwordEncoder.encode(userCredentials.password))
            .build()
        userDetailsManager.createUser(user)
    }
}