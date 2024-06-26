package ru.vzalygin.postapp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.PropertySource
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.invoke
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.User
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.provisioning.InMemoryUserDetailsManager
import org.springframework.security.provisioning.UserDetailsManager
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import javax.sql.DataSource

@SpringBootApplication
@PropertySource("classpath:/config/postapp-config.yaml")
@EnableWebSecurity
class Configuration {
    @Bean
    fun passwordEncoder(): PasswordEncoder =
            BCryptPasswordEncoder(4)

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = listOf("http://localhost:3000")
        configuration.allowedMethods = listOf("GET", "POST", "DELETE")
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }

    @Bean
    fun userDetailsManager(dataSource: DataSource, passwordEncoder: PasswordEncoder): UserDetailsManager {
        val manager = InMemoryUserDetailsManager()
        val user = User
            .withUsername("user")
            .password("password")
                .roles(USER_ROLE)
            .passwordEncoder(passwordEncoder::encode)
            .build()
        manager.createUser(user);
        return manager
    }

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        http {
            httpBasic { }
            csrf { disable() }
            cors { }
            headers { frameOptions { sameOrigin } }
            sessionManagement { sessionCreationPolicy=SessionCreationPolicy.STATELESS }
            authorizeHttpRequests {
                authorize("/", permitAll)
                authorize("/static/**", permitAll)
                authorize("/api/auth/signup", permitAll)
                authorize("/api/auth/validate", hasRole(USER_ROLE))
                authorize("/api/feed", permitAll)
                authorize("/api/user/*", permitAll)
                authorize("/api/post/get/*", permitAll)
                authorize("/api/post/create", hasRole(USER_ROLE))
                authorize("/api/post/delete/*", hasRole(USER_ROLE))
                authorize("/api/post/like/*", hasRole(USER_ROLE))
                authorize("/api/post/ping", hasRole(USER_ROLE))
            }
        }
        return http.build()
    }
}