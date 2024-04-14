package ru.vzalygin.postapp.service

import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import ru.vzalygin.postapp.entities.UserDAO
import ru.vzalygin.postapp.repository.UserRepository

@Service
class UserService(
    val userRepository: UserRepository
) {
    fun getUserByLoginOrNull(login: String): UserDAO? =
        userRepository.findByIdOrNull(login)
}