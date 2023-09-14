package com.dominik.chatbackend.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AuthError {
    private String message;
}