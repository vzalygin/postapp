package ru.vzalygin.postapp.repository

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import ru.vzalygin.postapp.entities.UserDAO

@Repository
interface UserRepository : CrudRepository<UserDAO, String>