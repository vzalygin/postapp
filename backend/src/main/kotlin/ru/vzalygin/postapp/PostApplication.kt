package ru.vzalygin.postapp

import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import ru.vzalygin.postapp.entities.UserDAO
import ru.vzalygin.postapp.repository.UserRepository


@SpringBootApplication
class PostApplication {
	@Bean
	fun demo(repository: UserRepository): CommandLineRunner {
		return CommandLineRunner { args: Array<String?>? ->
			// save a few customers
			repository.save(UserDAO("Jack Bauer", "bauer"))
		}
	}
}

fun main(args: Array<String>) {
	runApplication<PostApplication>(*args)
}
