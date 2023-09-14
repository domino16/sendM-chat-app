package com.dominik.chatbackend.controller.advisor;

import com.dominik.chatbackend.dto.AuthError;
import com.dominik.chatbackend.exception.AuthException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<AuthError> handleAuthException(AuthException ex){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(AuthError.builder().message(ex.getMessage()).build());
    }

}