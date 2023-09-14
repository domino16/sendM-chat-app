package com.dominik.chatbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LogInRepsonse {
    private String token;
}