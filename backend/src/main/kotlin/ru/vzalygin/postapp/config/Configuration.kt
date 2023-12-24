package ru.vzalygin.postapp.config

import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.PropertySource

@Configuration
@PropertySource("classpath:/config/postapp-config.yaml")
class Configuration