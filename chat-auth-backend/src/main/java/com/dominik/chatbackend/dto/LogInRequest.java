package com.dominik.chatbackend.dto;
import lombok.Data;


@Data
public class LogInRequest {
    private final String email;
    private final String password;
}