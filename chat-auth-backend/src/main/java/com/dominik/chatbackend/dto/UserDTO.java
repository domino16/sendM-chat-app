package com.dominik.chatbackend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDTO {
    private String email;
    private String firstName;
    private String lastName;
    private String avatarImg;
}
