package ru.vzalygin.postapp.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class TestController {
    @GetMapping("hello")
    fun hello() = "hello!"
}