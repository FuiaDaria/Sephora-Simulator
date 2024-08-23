package org.example.springskeleton.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "app")
public class Properties {
    private String jwtSecret;
    private int jwtExpirationMs;
    private String secretKey;
}
