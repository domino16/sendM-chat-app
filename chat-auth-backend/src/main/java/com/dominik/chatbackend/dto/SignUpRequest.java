package com.dominik.chatbackend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class SignUpRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private MultipartFile avatar;
}
