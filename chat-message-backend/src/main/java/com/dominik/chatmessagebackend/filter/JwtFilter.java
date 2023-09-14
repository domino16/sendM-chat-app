package com.dominik.chatmessagebackend.filter;

import com.dominik.chatmessagebackend.property.JwtProperty;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtProperty jwtProperty;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (!Objects.equals(request.getMethod(), HttpMethod.OPTIONS.name()) && !request.getServletPath().contains("ws")) {
            var authHeader = request.getHeader("Authorization");
            if (Objects.nonNull(authHeader)) {
                if (this.isExpired(authHeader)) {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "jwt token is expired!");
                }
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "jwt token is expired!");
            }
        }
        filterChain.doFilter(request, response);
    }

    private boolean isExpired(String authHeader) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(jwtProperty.getSecret().getBytes())
                    .setAllowedClockSkewSeconds(jwtProperty.getExpiration())
                    .build()
                    .parse(authHeader.split(" ")[1])
                    .getBody();
        } catch (ExpiredJwtException e) {
            return true;
        }
        return false;
    }

}