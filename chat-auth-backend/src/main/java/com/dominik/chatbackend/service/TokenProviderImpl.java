package com.dominik.chatbackend.service;

import com.dominik.chatbackend.model.User;
import com.dominik.chatbackend.property.JwtProperty;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.security.core.GrantedAuthority;

import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Component
public class TokenProviderImpl implements TokenProvider {

    private final JwtProperty jwtProperty;

    @Override
    public String generateToken(Authentication authentication, String email) {
        var now = System.currentTimeMillis();
        return Jwts.builder()
                .setSubject(email)
                .claim("authorities", authentication
                        .getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList())
                )
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + jwtProperty.getExpiration() * 1000L))
                .signWith(Keys.hmacShaKeyFor(jwtProperty.getSecret().getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    @Override
    public String generateToken(User user) {
        var now = System.currentTimeMillis();
        return Jwts.builder()
                .claim("email", user.getEmail())
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
                .claim("avatarImg", "https://auth-api.sendm.site/users/files/" + user.getEmail() + "?v=" + System.currentTimeMillis())
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + jwtProperty.getExpiration() * 1000L))
                .signWith(Keys.hmacShaKeyFor(jwtProperty.getSecret().getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    @Override
    public boolean isExpired(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(jwtProperty.getSecret().getBytes())
                    .setAllowedClockSkewSeconds(jwtProperty.getExpiration())
                    .build()
                    .parse(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            log.error("isExpired() - {}", e.getMessage());
            return true;
        }
        return false;
    }

}