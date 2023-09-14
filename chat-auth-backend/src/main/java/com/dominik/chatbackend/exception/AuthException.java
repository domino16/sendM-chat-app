package com.dominik.chatbackend.exception;

public class AuthException extends RuntimeException{
    public AuthException(String message) {
        super(message);
    }
}
