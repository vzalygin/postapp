package ru.vzalygin.postapp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PostappApplication

fun main(args: Array<String>) {
	runApplication<PostappApplication>(*args)
}
