package com.dominik.chatbackend.service;


import com.dominik.chatbackend.model.User;
import org.springframework.security.core.Authentication;

public interface TokenProvider {
    String generateToken(Authentication authentication, String email);
    String generateToken(User user);
    boolean isExpired(String token);
}

