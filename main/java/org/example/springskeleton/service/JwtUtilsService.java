package org.example.springskeleton.service;

import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.example.springskeleton.config.Properties;
import org.example.springskeleton.entity.user.UserDetailsImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;

@RequiredArgsConstructor
@Service
public class JwtUtilsService {
  private static final Logger logger = LoggerFactory.getLogger(JwtUtilsService.class);

  private final Properties jwtProperties;

  public String generateJwtToken(Authentication authentication) {
    UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

    return Jwts.builder()
            .setSubject(userPrincipal.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date((new Date()).getTime() + jwtProperties.getJwtExpirationMs()))
            .signWith(getSignKey(), SignatureAlgorithm.HS512)
            .compact();
  }

  public boolean validateJwtToken(String authToken) {
    try {
      getUsernameFromJwtToken(authToken);
      return true;
    } catch (MalformedJwtException e) {
      logger.error("Invalid JWT token: {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      logger.error("JWT token is expired: {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      logger.error("JWT token is unsupported: {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      logger.error("JWT claims string is empty: {}", e.getMessage());
    }

    return false;
  }

  public String getUsernameFromJwtToken(String jwt) {
    return Jwts
            .parser()
            .setSigningKey(getSignKey())
            .build()
            .parseClaimsJws(jwt)
            .getBody()
            .getSubject();
  }

  private SecretKey getSignKey() {
    byte[] keyBytes = Decoders.BASE64.decode(jwtProperties.getJwtSecret());
    return Keys.hmacShaKeyFor(keyBytes);
  }
}
