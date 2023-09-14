package com.dominik.chatbackend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EditProfileRequest {
    private String currentUserId;
    private String firstName;
    private String lastName;
    private String oldPassword;
    private String newPassword;
}