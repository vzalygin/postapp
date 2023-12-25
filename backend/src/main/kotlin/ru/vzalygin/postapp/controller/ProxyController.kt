package ru.vzalygin.postapp.controller

import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.exchange
import org.springframework.web.client.getForObject
import java.net.URI


@RestController
class ProxyController {
    @GetMapping("/")
    fun index(): String {
        return restTemplate.getForObject(URI.create(base), String::class.java)!!
    }

    @GetMapping("/static/{type}/{name}")
    fun static(@PathVariable type: String, @PathVariable name: String): String {
        val headers = HttpHeaders().apply {
            set("Content-type", when (type) {
                "css" -> "text/css"
                "js" -> "text/javascript"
                else -> "text/plain"
            })
        }
        val entity = HttpEntity<String>(headers)
        return restTemplate.exchange(URI.create("$base/static/$type/$name"), HttpMethod.GET, entity, String::class.java).body!!
    }

    @RequestMapping(value = ["/static/js/{name}"], method = [RequestMethod.GET], produces=["text/javascript; charset=utf-8"])
    fun js(@PathVariable name: String): String {
        val headers = HttpHeaders().apply {
            set("Content-type", "text/javascript")
        }
        val entity = HttpEntity<String>(headers)
        return restTemplate.exchange(URI.create("$base/static/js/$name"), HttpMethod.GET, entity, String::class.java).body!!
    }

    companion object {
        val base = "http://localhost:8000"
        val restTemplate = RestTemplate()
    }
}